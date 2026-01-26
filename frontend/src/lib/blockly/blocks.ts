import * as Blockly from "blockly/core";

export const applyClientBlockProperties = (workspace: Blockly.Workspace, oldBlockId?: string, blockId?: string) => {
  if (oldBlockId) {
    const block = workspace.getBlockById(oldBlockId) as Blockly.BlockSvg;
    if (!block) return;
    block.setMovable(true);

    const path = block.pathObject.svgPath || block.getSvgRoot();
    path.classList.remove("stroke-red-500", "stroke-4");
  }
  if (blockId) {
    const block = workspace.getBlockById(blockId) as Blockly.BlockSvg;
    if (!block) return;
    block.setMovable(false);

    const path = block.pathObject.svgPath || block.getSvgRoot();
    path.classList.add("stroke-red-500", "stroke-4");
  }
};

export const connectBlocks = (
  childBlock: Blockly.Block,
  parentBlock: Blockly.Block,
  inputName: string | undefined,
) => {
  console.log('attempting to get input', inputName, parentBlock.getInput(inputName ?? '')?.connection);
  const inputConnection = (
    inputName
      ? parentBlock.getInput(inputName)?.connection
      : parentBlock.nextConnection
  );
  const childConnection = childBlock.outputConnection || childBlock.previousConnection;
  console.log('connections being connected', inputConnection, childConnection);

  if (inputConnection && childConnection
    && inputConnection.targetConnection !== childConnection
  ) {
    inputConnection.connect(childConnection);
  }
};

export const moveBlockByCoordinates = (block: Blockly.Block, coordinates: { x?: number; y?: number; }) => {
  if (!block.getParent() && coordinates?.x !== undefined && coordinates?.y !== undefined) {
    const currCoordinates = block.getRelativeToSurfaceXY();
    block.moveBy(
      coordinates.x - currCoordinates.x,
      coordinates.y - currCoordinates.y,
    );
  }
};