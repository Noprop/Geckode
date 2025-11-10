"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as Blockly from "blockly/core";
import { registerBlockly } from "@/_Blockly/index";
import toolbox from "@/Blockly/toolbox";
import starterWorkspace from "@/_Blockly/starterWorkspace";
import {
  variableCreateButtonCallback,
  variableCategoryCallback,
} from "@/Blockly/callbacks";

registerBlockly();

export interface BlocklyEditorHandle {
  getWorkspace: () => Blockly.Workspace | null;
}

const BlocklyEditor = forwardRef<BlocklyEditorHandle, Record<string, any>>(
  (props: any, ref) => {
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

        workspaceRef.current.registerButtonCallback(
          "createVariableButton",
          variableCreateButtonCallback
        );

        workspaceRef.current.registerToolboxCategoryCallback(
          "CUSTOM_VARIABLES",
          variableCategoryCallback
        );

        const hasExistingBlocks =
          workspaceRef.current.getAllBlocks(false).length > 0;
        if (!hasExistingBlocks) {
          Blockly.serialization.workspaces.load(
            starterWorkspace,
            workspaceRef.current
          );
        }
      }

      return () => {
        workspaceRef.current?.dispose();
      };
    }, []);

    useImperativeHandle(ref, () => ({
      getWorkspace: () => workspaceRef.current,
    }));

    return (
      <>
        <div className="flex-col w-full">
          <div ref={blocklyDivRef} id="blocklyDiv" className="w-full h-full" />
        </div>
      </>
    );
  }
);

export default BlocklyEditor;
