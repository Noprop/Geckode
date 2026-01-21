import * as Blockly from "blockly/core";

export type Block = Omit<
  Blockly.serialization.blocks.State,
  "id" | "inputs" | "next"
> & Partial<{
  isShadow: boolean;
  parentId: string;
  inputName: string;
}>;

export interface SerializedBlock extends Omit<Block, "isShadow" | "parentId"> {
  id: string;
  inputs?: Record<string, Partial<{
    block: string;
    shadow: Blockly.serialization.blocks.State;
  }>>;
  next?: Record<string, Partial<{
    block: string;
    shadow: Blockly.serialization.blocks.State;
  }>>;
}