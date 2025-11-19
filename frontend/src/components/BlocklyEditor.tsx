"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as Blockly from "blockly/core";
import { registerBlockly } from "@/blockly/index";
import toolbox from "@/blockly/toolbox";
import {
  variableCreateButtonCallback,
  variableCategoryCallback,
} from "@/blockly/callbacks";

registerBlockly();

export interface BlocklyEditorHandle {
  getWorkspace: () => Blockly.Workspace | null;
}

type BlocklyEditorProps = {
  onWorkspaceReady?: (workspace: Blockly.WorkspaceSvg) => void;
};

const BlocklyEditor = forwardRef<BlocklyEditorHandle, BlocklyEditorProps>(
  ({ onWorkspaceReady }, ref) => {
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

    useEffect(() => {
      if (blocklyDivRef.current && !workspaceRef.current) {
        const blocklyOptions: Blockly.BlocklyOptions = {
          toolbox: toolbox as Blockly.utils.toolbox.ToolboxDefinition,
          sounds: false,
          renderer: "zelos",
          readOnly: false,
          trashcan: true,
          media: "media/",
          move: {
            scrollbars: true,
            drag: true,
            wheel: true,
          },
        };

        workspaceRef.current = Blockly.inject(
          blocklyDivRef.current as HTMLDivElement,
          blocklyOptions
        );

        onWorkspaceReady?.(workspaceRef.current);

        workspaceRef.current.registerButtonCallback(
          "createVariableButton",
          variableCreateButtonCallback
        );

        workspaceRef.current.registerToolboxCategoryCallback(
          "CUSTOM_VARIABLES",
          variableCategoryCallback
        );
      }

      return () => {
        workspaceRef.current?.dispose();
      };
    }, []);

    if (workspaceRef.current) Blockly.svgResize(workspaceRef.current);

    useImperativeHandle(ref, () => ({
      getWorkspace: () => workspaceRef.current,
    }));

    return (
      <div
        ref={blocklyDivRef}
        id="blocklyDiv"
        className="h-full w-full min-h-[20rem]"
      />
    );
  }
);

export default BlocklyEditor;
