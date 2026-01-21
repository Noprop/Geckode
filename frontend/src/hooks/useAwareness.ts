import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useYjs } from "./useYjs";
import { Client } from "@/lib/types/yjs/awareness";
import { applyBlocklyEvent } from "@/lib/blockly/events";
import { applyClientBlockProperties } from "@/lib/blockly/blocks";
import * as Blockly from "blockly/core";
import { toPublicUser } from "@/lib/types/api/users";
import { useAuth } from "@/contexts/AuthContext";
import { BlocklyEditorRef } from "@/components/BlocklyEditor";

export const useAwareness = (
  documentName: string,
  blocklyRef: RefObject<BlocklyEditorRef | null>,
) => {
  const { doc, awareness } = useYjs(documentName);
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const dragPollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopBlockDragPolling = useCallback(() => {
    if (dragPollingIntervalRef.current) {
      clearInterval(dragPollingIntervalRef.current);
      dragPollingIntervalRef.current = null;
      awareness.setLocalStateField('blockDrag', null);
    }
  }, [awareness]);

  useEffect(() => {
    if (!blocklyRef.current) return;

    const workspace = blocklyRef.current.getWorkspace()!;

    awareness.setLocalStateField('user', toPublicUser(user!));

    const handleUpdate = ({ added, updated, removed }: Record<string, Array<any>>) => {
      if (added.length || removed.length) {
        setClients(clients => [
          ...clients.filter(({ id }) => !removed.includes(id)),
          ...added.map(id => ({
            id: id,
            user: awareness.getStates().get(id)?.user,
          }))
        ]);
      }

      if (updated.length) {
        updated.forEach(clientId => {
          if (clientId === doc.clientID) return;

          const currentBlockDragState = awareness.getStates().get(clientId)?.blockDrag;

          if (currentBlockDragState) {
            applyBlocklyEvent(
              Object.assign(
                {},
                currentBlockDragState,
                {
                  type: 'move',
                  reason: ['drag'],
                }
              ),
              workspace
            );
          }

          const currentBlockSelectionState = awareness.getStates().get(clientId)?.blockSelection;

          if (currentBlockSelectionState) {
            applyClientBlockProperties(
              workspace,
              currentBlockSelectionState.oldBlockId,
              currentBlockSelectionState.blockId,
            );
          }
        });
      }
    };

    const eventsListener = (event: Blockly.Events.Abstract) => {
      let oldCoordinate: Blockly.utils.Coordinate | null = null;

      if (event.type === Blockly.Events.BLOCK_DRAG) {
        const block = workspace.getBlockById((event as any).blockId);
        if (!block) return;

        if ((event as any).isStart) {
          oldCoordinate = block.getRelativeToSurfaceXY();

          dragPollingIntervalRef.current = setInterval(() => {
            const pos = block.getRelativeToSurfaceXY();

            awareness.setLocalStateField('blockDrag', {
              blockId: (event as any).blockId,
              group: (event as any).group,
              newCoordinate: `${pos.x}, ${pos.y}`,
              oldCoordinate: `${oldCoordinate!.x}, ${oldCoordinate!.y}`,
            });

            oldCoordinate = block.getRelativeToSurfaceXY();
          }, 25);
        } else {
          stopBlockDragPolling();
        }
      }

      if (event.type === Blockly.Events.SELECTED) {
        awareness.setLocalStateField('blockSelection', {
          blockId: (event as any).newElementId,
          oldBlockId: (event as any).oldElementId,
        });
      }
    }

    awareness.on("update", handleUpdate);
    workspace.addChangeListener(eventsListener);

    return () => {
      awareness.off("update", handleUpdate);
      workspace.removeChangeListener(eventsListener);
    }
  }, [awareness, blocklyRef, dragPollingIntervalRef]);

  useEffect(() => {
    return () => stopBlockDragPolling();
  }, [stopBlockDragPolling]);

  return { clients, stopBlockDragPolling };
};