import { Block, SerializedBlock } from "../types/yjs/blocks";
import * as Blockly from "blockly/core";

export const serializeBlock = (
  blockId: string,
  workspace: Blockly.Workspace,
): SerializedBlock => {
  const block = workspace.getBlockById(blockId);
  console.log('original block object', block);

  if (!block) throw Error;

  console.log('original block json', Blockly.serialization.blocks.save(
    block,
    {
      addCoordinates: true,
      addInputBlocks: true,
      addNextBlocks: true,
      doFullSerialization: false
    }
  ));

  const inputs = Object.fromEntries(block.inputList.map((input) => {
    const shadowBlock = input.connection?.getShadowState(true);
    const targetBlock = input.connection?.targetBlock();

    return [
      input.name,
      {
        ...(shadowBlock && {
          shadow: shadowBlock,
        }),
        ...(targetBlock && !targetBlock.isShadow() && {
          block: targetBlock.id,
        }),
      }
    ];
  }).filter(input => Object.keys(input[1]).length));

  const nextShadowBlock = block.nextConnection?.getShadowState(true);
  const nextTargetBlock = block.nextConnection?.targetBlock();

  const next = {
    ...(nextShadowBlock && {
      shadow: nextShadowBlock,
    }),
    ...(nextTargetBlock && !nextTargetBlock.isShadow() && {
      block: nextTargetBlock.id,
    }),
  };

  const parentBlock = block.getParent();
  const inputName = parentBlock?.inputList.filter((input) => (
    input.connection?.targetBlock() === block
  ))?.[0]?.name;

  const methodMapping: Partial<Record<keyof Block, keyof Blockly.Block>> = {
    "extraState": "saveExtraState",
    "isShadow": "isShadow",
    "collapsed": "isCollapsed",
    "deletable": "isDeletable",
    "movable": "isMovable",
    "editable": "isEditable",
    "enabled": "isEnabled",
    "inline": "inputsInline",
    "data": "data",
    "comment": "getCommentText",
  };

  return {
    ...Blockly.serialization.blocks.save(
      block, {
        addCoordinates: true,
        addInputBlocks: false,
        addNextBlocks: false,
      }
    ),
    ...(Object.keys(inputs).length && {inputs: inputs}),
    ...(Object.keys(next).length && {next: next}),
    ...(block.isShadow() && {
      isShadow: true,
    }),
    ...(parentBlock?.id && {
      parentId: parentBlock?.id,
    }),
    ...(inputName && {
      inputName,
    }),
    ...Object.fromEntries(Object.entries(methodMapping).map(
      ([field, method]) => ([
        field,
        (typeof block[method]) === 'function'
          ? (block[method] as Function)()
          : block[method],
      ])
    ).filter(([_, value]) => value)),
  } as SerializedBlock;
};

export const addShadowBlockToBlockList = (
  blocks: Record<string, Block>,
  block: Blockly.serialization.blocks.State,
  parentId: string,
  inputName: string,
): void => {
  console.log('shadow block here', block);
  if (!block.id) return;

  blocks[block.id] = {
    type: block.type,
    parentId: parentId,
    inputName: inputName,
    isShadow: true,
    ...Object.fromEntries(Object.entries(block).filter(
      ([field, _]) =>
        !["inputs", "icons", "disabledReasons", "icons", "next"].includes(field)
    )),
  };

  Object.entries(block.inputs ?? {}).forEach(([inputName, value]) => {
    if (value?.shadow) {
      addShadowBlockToBlockList(
        blocks,
        value.shadow,
        block.id ?? '',
        inputName,
      );
    }
  });
}

export const getBlocksFromSerializedBlock = (
  block: SerializedBlock,
  workspace: Blockly.Workspace,
  serializeInputs: boolean = true,
): Record<string, Block> => {
  let blocks = {
    [block.id]: {
      ...Object.fromEntries(
        (["type", "fields", "x", "y", "parentId", "isShadow",
          "inputName", "extraState", "collapsed", "deletable",
          "movable", "editable", "enabled", "inline", "data",
          "comment",
        ])
          .map((field) => (
            [field, block[field as keyof SerializedBlock]])
          )
      ),
      ...(block?.inputs && {
        inputs: new Set(Object.keys(block.inputs))
      }),
    }
  } as Record<string, Block>;

  if (!serializeInputs) return blocks;

  Object.entries(block?.inputs ?? {}).forEach(([inputName, value]) => {
    if (value?.block) {
      blocks = {
        ...blocks,
        ...getBlocksFromSerializedBlock(
          {...serializeBlock(value.block, workspace), inputName},
          workspace,
        ),
      };
    }

    if (value?.shadow) {
      addShadowBlockToBlockList(
        blocks,
        value.shadow,
        block.id,
        inputName,
      );
    }
  });

  return blocks;
}