"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as Blockly from 'blockly/core';
import { registerBlockly } from '@/blockly/index';
import toolbox from '@/blockly/toolbox';
import { variableCreateButtonCallback, variableCategoryCallback } from '@/blockly/callbacks';

registerBlockly();

export interface BlocklyEditorHandle {
  getWorkspace: () => Blockly.Workspace | null;
}

const BlocklyEditor = forwardRef<BlocklyEditorHandle, Record<string, any>>((props: any, ref) => {
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
        blocklyOptions,
      );

      workspaceRef.current.registerButtonCallback(
        'createVariableButton',
        variableCreateButtonCallback,
      );

      workspaceRef.current.registerToolboxCategoryCallback(
        'CUSTOM_VARIABLES',
        variableCategoryCallback,
      );
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
});

export default BlocklyEditor;
