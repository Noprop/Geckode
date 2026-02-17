import { useCallback, useEffect, useRef } from "react";
import { useYjs } from "./useYjs";
import { applyBlocklyEvent } from "@/lib/blockly/events";
import { applyClientBlockProperties } from "@/lib/blockly/blocks";
import * as Blockly from "blockly/core";
import { toPublicUser } from "@/lib/types/api/users";
import { useUser } from "@/contexts/UserContext";
import { useGeckodeStore } from "@/stores/geckodeStore";
import { useLayoutStore } from "@/stores/layoutStore";
import { getClientColourHex, getClientColourTailwind } from "@/lib/yjs/clients";

export const useAwareness = (
  documentName: string,
) => {
  const { blocklyWorkspace } = useGeckodeStore();
  const { doc, awareness } = useYjs(documentName);
  const user = useUser();
  const dragPollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopBlockDragPolling = useCallback(() => {
    if (dragPollingIntervalRef.current) {
      clearInterval(dragPollingIntervalRef.current);
      dragPollingIntervalRef.current = null;
      awareness.setLocalStateField('blockDrag', null);
    }
  }, [awareness]);

  useEffect(() => {
    if (!blocklyWorkspace) return;

    awareness.setLocalStateField('user', documentName.length === 0 ? undefined : toPublicUser(user!));

    const handleUpdate = ({ added, updated, removed }: Record<string, Array<any>>) => {
      if (added.length || removed.length) {
        useLayoutStore.setState((s) => ({
          clients: [
            ...s.clients.filter(({ id }) => !removed.includes(id)),
            ...added.map(id => ({
              id: id,
              user: awareness.getStates().get(id)?.user,
            })),
          ],
        }));
      }

      if (updated.length) {
        updated.forEach(clientId => {
          if (clientId === doc.clientID) return;

          const clientAwareness = awareness.getStates().get(clientId);
          const spriteId = clientAwareness?.selectedSpriteId;
          const currentBlockDragState = clientAwareness?.blockDrag;

          if (spriteId === useGeckodeStore.getState().selectedSpriteId && currentBlockDragState) {
            applyBlocklyEvent(
              Object.assign(
                {},
                currentBlockDragState,
                {
                  type: 'move',
                  reason: ['drag'],
                }
              ),
              blocklyWorkspace,
            );
          }

          const currentBlockSelectionState = awareness.getStates().get(clientId)?.blockSelection;
          const clientColour = getClientColourTailwind(
            useLayoutStore.getState().clients.findIndex((client) => client.id === Number(clientId))
          );

          if (currentBlockSelectionState) {
            applyClientBlockProperties(
              blocklyWorkspace,
              clientColour,
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
        const block = blocklyWorkspace.getBlockById((event as any).blockId);
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
    blocklyWorkspace.addChangeListener(eventsListener);

    return () => {
      awareness.off("update", handleUpdate);
      blocklyWorkspace.removeChangeListener(eventsListener);
    }
  }, [awareness, blocklyWorkspace, dragPollingIntervalRef]);

  useEffect(() => {
    return () => stopBlockDragPolling();
  }, [stopBlockDragPolling]);

  return { stopBlockDragPolling };
};