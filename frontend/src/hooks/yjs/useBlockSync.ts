import * as Blockly from "blockly/core";
import { useEffect, useRef } from "react";
import { useYjs } from "./useYjs";
import { Block } from "@/lib/types/yjs/blocks";
import { getBlocksFromSerializedBlock, serializeBlock } from "@/lib/blockly/serialization";
import { useAwareness } from "./useAwareness";
import { connectBlocks, moveBlockByCoordinates } from "@/lib/blockly/blocks";
import { useGeckodeStore } from '@/stores/geckodeStore';
import * as Y from 'yjs';

const createBlockEventsListener = (
  workspace: Blockly.Workspace,
  blocksMap: Y.Map<Block>,
  stopBlockDragPolling: () => void,
  doc: Y.Doc,
) => (event: Blockly.Events.Abstract) => {
  if (!workspace) return;

  if (
    ![
      Blockly.Events.BLOCK_CREATE,
      Blockly.Events.BLOCK_DELETE,
      Blockly.Events.BLOCK_MOVE,
      Blockly.Events.BLOCK_CHANGE,
    ].some((type) => type === event.type)
  ) {
    return;
  }

  console.log('event', event.toJson());

  if (event.type === Blockly.Events.BLOCK_DELETE) {
    stopBlockDragPolling();
    const deleteEvent = event as Blockly.Events.BlockDelete;
    if (deleteEvent.wasShadow) return;

    console.log('remove blocks from yjs', deleteEvent.ids);
    doc.transact(() => {
      (deleteEvent.ids ?? []).forEach((id) => {
        blocksMap.delete(id);
      });
    }, doc.clientID);

    return;
  }

  if (event.type === Blockly.Events.BLOCK_MOVE) {
    const moveEvent = event as Blockly.Events.BlockMove;

    const prevData = blocksMap.get(moveEvent.blockId ?? '');
    if (!prevData || prevData?.isShadow) return;

    doc.transact(() => {
      blocksMap.set(moveEvent.blockId!, {
        ...prevData,
        parentId: moveEvent.newParentId,
        inputName: moveEvent.newInputName,
        x: moveEvent.newCoordinate?.x,
        y: moveEvent.newCoordinate?.y,
      });
    }, doc.clientID);

    return;
  }

  const blockEvent = event as Blockly.Events.BlockCreate | Blockly.Events.BlockChange;

  const blocks = getBlocksFromSerializedBlock(
    serializeBlock(blockEvent.blockId ?? '', workspace),
    workspace,
    blockEvent.type === Blockly.Events.BLOCK_CREATE
  );
  console.log('blocks created/updated', blocks);

  doc.transact(() => {
    Object.keys(blocks).forEach((id) => {
      blocksMap.set(id, blocks[id]);
    });
  }, doc.clientID);
};

/**
 * Applies editability (deletable, movable, editable) to all blocks in a workspace.
 * When canEdit is false, locks all blocks. When true, restores from blocksMap (Yjs source of truth).
 * Events are disabled during the update so lock/unlock does not sync back to Yjs.
 */
export const applyBlocksEditability = (
  workspace: Blockly.Workspace | null,
  blocksMap: Y.Map<Block> | undefined,
  canEdit: boolean,
) => {
  if (!workspace) return;

  const blocks = workspace.getAllBlocks(false);
  Blockly.Events.disable();

  try {
    for (const block of blocks) {
      if (canEdit && blocksMap) {
        const data = blocksMap.get(block.id);
        block.setDeletable(data?.deletable ?? true);
        block.setMovable(data?.movable ?? true);
        block.setEditable(data?.editable ?? true);
      } else {
        block.setDeletable(false);
        block.setMovable(false);
        block.setEditable(false);
      }
    }
  } finally {
    Blockly.Events.enable();
  }
};

export const blocksMapChangesHandler = (
  spriteId: string,
  workspace: Blockly.Workspace,
  blocksMap: Y.Map<Block>,
  keys: Map<string, {
    action: "add" | "update" | "delete";
    oldValue: any;
  }>,
) => {
  Blockly.Events.disable(); // Disable blockly events for remote changes

  const shadowIdMapping: Record<string, string[]> = {};

  keys.forEach((change, key) => {
    if (change.action === 'add') {
      console.log('block addition incoming sync', key);
      const data = blocksMap.get(key);
      if (!data) return;
      console.log('yEvent add', key, data);

      // Keep track of shadow blocks to be dealt with afterwards
      if (data?.parentId && data?.isShadow) {
        if (data.parentId in shadowIdMapping) {
          shadowIdMapping[data.parentId].push(key);
        } else {
          shadowIdMapping[data.parentId] = [key];
        }
        return;
      }

      const block = Blockly.serialization.blocks.append(
        {
          id: key,
          ...(Object.fromEntries(
            Object.entries(data).filter(([field, _]) =>
              !['isShadow', 'parentId', 'inputName'].includes(field)
            )
          ) as Blockly.serialization.blocks.State),
        },
        workspace,
        {
          recordUndo: false,
        }
      );

      block.setDisabledReason(!(data.enabled ?? true), '');

      if (!useGeckodeStore.getState().canEditProject) {
        block.setDeletable(false);
        block.setMovable(false);
        block.setEditable(false);
      } else {
        block.setDeletable(data?.deletable ?? true);
        block.setMovable(data?.movable ?? true);
        block.setEditable(data?.editable ?? true);
      }
    } else if (change.action === 'update') {
      const data = blocksMap.get(key);
      if (!data) return;

      let block;

      if (data?.isShadow) {
        let currData: Block | undefined = data;
        let prevInputName: string = data.inputName ?? '';
        let prevKey = key;
        const path: string[] = [];

        while (currData?.isShadow) {
          path.unshift(prevInputName);
          prevKey = currData.parentId ?? '';
          currData = blocksMap.get(currData.parentId ?? '');
          prevInputName = currData?.inputName ?? '';
        }

        block = workspace.getBlockById(prevKey);
        console.log('non-shadow block obtained', block);
        if (!block) return;

        // Very convoluted way of getting the shadow block
        // Blockly doesn't allow workspace.getBlockById for shadow blocks
        for (const inputName of path) {
          if (!block) return;
          block = block.getInputTargetBlock(inputName);
        }
        console.log('final block obtained', block);
      } else {
        block = workspace.getBlockById(key);
      }

      if (!block) return;

      Object.entries(data.fields ?? {}).forEach(([name, value]) => {
        block.setFieldValue(value, name);
      });

      moveBlockByCoordinates(block, data);

      const methodMapping: Partial<Record<keyof Block, keyof Blockly.Block>> = {
        extraState: 'loadExtraState',
        isShadow: 'setShadow',
        collapsed: 'setCollapsed',
        deletable: 'setDeletable',
        movable: 'setMovable',
        editable: 'setEditable',
        enabled: 'setDisabledReason',
        inline: 'inputsInline',
        data: 'data',
        comment: 'setCommentText',
      };

      // Keep track of connections to reconnect them (something disconnects here)
      const connectionBlocks = Object.fromEntries(
        block.inputList.map((input) => [input.name, input.connection?.targetBlock()])
      );

      Object.entries(methodMapping).forEach(([field, method]) => {
        if (typeof block[method] === 'function') {
          if (method === 'setDisabledReason') {
            (block[method] as Function)(!(data[field as keyof Block] ?? true));
          } else {
            (block[method] as Function)(
              data[field as keyof Block] ??
                (method === 'loadExtraState' ? {} : method === 'setCommentText' ? null : false)
            );
          }
        } else {
          (block[method] as any) = data[field as keyof Block];
        }
      });

      // Reconnect the blocks as they were
      Object.entries(connectionBlocks).forEach(([inputName, childBlock]) => {
        if (childBlock) connectBlocks(childBlock, block, inputName);
      });

      if (!useGeckodeStore.getState().canEditProject) {
        block.setDeletable(false);
        block.setMovable(false);
        block.setEditable(false);
      }
    } else if (change.action === 'delete') {
      console.log('attempting to remove block by id', key);
      workspace.getBlockById(key)?.dispose();
    }
  });

  // Connect blocks (has to be done after all the blocks are created)
  keys.forEach((change, key) => {
    if (change.action === 'delete') return;

    const data = blocksMap.get(key);
    if (!data) return;

    if (!data?.parentId) {
      const block = workspace.getBlockById(key);
      if (!block) return;

      const connection = block.outputConnection || block.previousConnection;
      const targetBlock = connection?.targetBlock();

      if (connection?.isConnected()) {
        connection?.disconnect(); // Disconnect since no more parent
      }

      moveBlockByCoordinates(block, data);

      if (targetBlock) {
        // Move the block where it needs to be after being disconnected
        const targetData = blocksMap.get(targetBlock.id);
        if (targetData) moveBlockByCoordinates(targetBlock, targetData);
      }
      return;
    }

    const parentData = blocksMap.get(data.parentId);
    if (!parentData) return;

    console.log('block ids', key, data.parentId);

    const childBlock = workspace.getBlockById(key);
    const parentBlock = workspace.getBlockById(data.parentId);
    if (!childBlock || !parentBlock) return;

    // Connect the child to its respective parent
    connectBlocks(childBlock, parentBlock, data.inputName);
  });

  // Add the shadow states to the blocks
  keys.forEach((change, key) => {
    if (change.action === 'add') {
      const data = blocksMap.get(key);
      if (!data || data?.isShadow || !(key in shadowIdMapping)) return;
      console.log('before add shadow', key, shadowIdMapping[key]);

      const getShadowState = (id: string): Blockly.serialization.blocks.State => {
        const data = blocksMap.get(id);
        if (!data) throw Error(`Shadow block parent not found for id: ${id}`);

        const shadowState: Blockly.serialization.blocks.State = {
          id: id,
          ...(Object.fromEntries(
            Object.entries(data).filter(([field, _]) => !['isShadow', 'parentId', 'inputName'].includes(field))
          ) as Blockly.serialization.blocks.State),
        };

        for (const childId of shadowIdMapping[id] ?? []) {
          const innerShadowState = {
            shadow: getShadowState(childId),
          };
          const childData = blocksMap.get(childId);
          if (!childData) throw Error(`Shadow block child not found for id: ${childId}`);

          if (childData?.inputName) {
            shadowState.inputs = {
              ...(shadowState.inputs ?? {}),
              ...{
                [childData.inputName]: {
                  ...(shadowState.inputs?.[childData.inputName] ?? {}),
                  ...innerShadowState,
                },
              },
            };
          } else {
            shadowState.next = innerShadowState;
          }
        }
        return shadowState;
      };

      for (const id of shadowIdMapping[key] ?? []) {
        const inputName = blocksMap.get(id)?.inputName;
        const shadowState = getShadowState(id);
        const block = workspace.getBlockById(key);

        console.log('setting shadow state of block', block, inputName, shadowState);
        block?.getInput(inputName ?? '')?.connection?.setShadowState(shadowState);
      }
    } else if (change.action === 'update') {
      console.log('update for block', key);
      const data = blocksMap.get(key);
      if (!data?.parentId) return;

      const parentData = blocksMap.get(data.parentId);
      if (parentData?.isShadow) return;

      const block = workspace.getBlockById(data.parentId);
      if (!block) return;

      const connection = data?.inputName ? block.getInput(data.inputName)?.connection : block.nextConnection;
      console.log('connection before shadow state set', connection);
      if (!connection || connection.targetBlock()) return;

      const shadowState = connection.getShadowState();
      if (!shadowState) return;

      console.log('set shadow state', connection, shadowState);
      connection.setShadowState(shadowState);
    }
  });

  Blockly.Events.enable();

  useGeckodeStore.getState().markSpriteAsUpdated(spriteId);
};

export const useBlockSync = (documentName: string) => {
  const blocklyWorkspace = useGeckodeStore((s) => s.blocklyWorkspace);
  const selectedSpriteId = useGeckodeStore((s) => s.selectedSpriteId);
  const spriteWorkspaces = useGeckodeStore((s) => s.spriteWorkspaces);
  const spriteInstances = useGeckodeStore((s) => s.spriteInstances);
  const canEditProject = useGeckodeStore((s) => s.canEditProject);
  const prevCanEditProject = useRef<boolean | null>(true);
  const { doc, awareness } = useYjs(documentName);
  const { stopBlockDragPolling } = useAwareness(documentName);
  const workspaces = doc.getArray<Y.Map<any>>('workspaces');

  useEffect(() => {
    awareness.setLocalStateField('selectedSpriteId', selectedSpriteId);
  }, [awareness, selectedSpriteId]);

  // When canEditProject changes, lock or restore block editability in all workspaces.
  // Restore uses Yjs blocksMap as source of truth so blocks that were non-movable etc. stay that way.
  useEffect(() => {
    if (!blocklyWorkspace || !workspaces.length || prevCanEditProject.current === canEditProject) return;

    console.log('canEditProject changed', prevCanEditProject.current, canEditProject);

    const selectedIndex = spriteInstances.findIndex((instance) => instance.id === selectedSpriteId);
    const selectedBlocksMap = selectedIndex >= 0
      ? (workspaces.get(selectedIndex)?.get('blocks') as Y.Map<Block> | undefined)
      : undefined;

    // Apply to the visible workspace (selected sprite's blocks are shown in blocklyWorkspace)
    applyBlocksEditability(blocklyWorkspace, selectedBlocksMap, canEditProject);

    // Apply to every sprite's workspace so state is correct when switching sprites
    spriteInstances.forEach((instance, index) => {
      const ws = spriteWorkspaces[instance.id];
      const blocksMap = workspaces.get(index)?.get('blocks') as Y.Map<Block> | undefined;
      applyBlocksEditability(ws ?? null, blocksMap, canEditProject);
    });

    const toolbox = blocklyWorkspace.getToolbox();
    toolbox?.setVisible(canEditProject);
    toolbox?.getFlyout()?.setVisible(canEditProject);
    Blockly.svgResize(blocklyWorkspace);

    prevCanEditProject.current = canEditProject;
  }, [prevCanEditProject, canEditProject, blocklyWorkspace, spriteWorkspaces, spriteInstances, selectedSpriteId, workspaces]);

  useEffect(() => {
    if (!blocklyWorkspace) return;

    const currentBlocksMap = workspaces.get(
      spriteInstances.findIndex((instance) => instance.id === selectedSpriteId)
    )?.get('blocks');

    const blocklyEventsListener = currentBlocksMap ? createBlockEventsListener(
      blocklyWorkspace,
      currentBlocksMap,
      stopBlockDragPolling,
      doc,
    ) : () => {};

    blocklyWorkspace.addChangeListener(blocklyEventsListener);

    return () => {
      blocklyWorkspace.removeChangeListener(blocklyEventsListener);
    }
  }, [blocklyWorkspace, spriteInstances, selectedSpriteId, spriteWorkspaces]);
};