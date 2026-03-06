import { useCallback, useEffect, useRef } from "react";
import { useYjs } from "./useYjs";
import { applyBlocklyEvent } from "@/lib/blockly/events";
import { applyClientBlockProperties } from "@/lib/blockly/blocks";
import * as Blockly from "blockly/core";
import { toPublicUser } from "@/lib/types/api/users";
import { useUser } from "@/contexts/UserContext";
import { useGeckodeStore } from "@/stores/geckodeStore";
import { useLayoutStore } from "@/stores/layoutStore";
import { getClientColourHex } from "@/lib/yjs/clients";

export const useAwareness = (
  documentName: string,
) => {
  const { blocklyWorkspace } = useGeckodeStore();
  const { doc, awareness, onSynced } = useYjs(documentName);
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

    awareness.setLocalStateField('user', documentName.length === 0 || !user ? undefined : toPublicUser(user));

    const handleUpdate = ({ added, updated, removed }: { added: number[]; updated: number[]; removed: number[] }) => {
      useLayoutStore.setState({
        clients: Array.from(awareness.getStates().entries()).map(([id, state]) => ({
          id: Number(id),
          user: state.user,
        })).filter(({ id }) => id !== doc.clientID),
      });

      if (updated.length) {
        updated.forEach((clientId) => {
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
          const clientColourHex = getClientColourHex(
            useLayoutStore.getState().clients.findIndex((client) => client.id === Number(clientId))
          );

          if (currentBlockSelectionState) {
            applyClientBlockProperties(
              blocklyWorkspace,
              {
                clientId: Number(clientId),
                user: clientAwareness?.user,
                colourHex: clientColourHex,
              },
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

    onSynced(() => {
      // Load initial awareness states
      const states = awareness.getStates();
      const initialClients = Array.from(states.entries())
        .filter(([id]) => id !== doc.clientID)
        .map(([id, state]) => ({
          id: id,
          user: state.user,
        }));

      if (initialClients.length > 0) {
        useLayoutStore.setState({ clients: initialClients });
      }
    });

    awareness.on("update", handleUpdate);
    blocklyWorkspace.addChangeListener(eventsListener);

    return () => {
      awareness.off("update", handleUpdate);
      blocklyWorkspace.removeChangeListener(eventsListener);
    };
  }, [awareness, blocklyWorkspace, doc, user, dragPollingIntervalRef, onSynced]);

  useEffect(() => {
    return () => stopBlockDragPolling();
  }, [stopBlockDragPolling]);

  return { stopBlockDragPolling };
};