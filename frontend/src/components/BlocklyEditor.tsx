"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import * as Blockly from "blockly/core";
import { registerBlockly } from "@/blockly/index";
import toolbox from "@/blockly/toolbox";
import {
  variableCategoryCallback,
} from "@/blockly/callbacks";
import { Geckode } from "@/blockly/theme";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { InputBox, InputBoxRef } from "./ui/InputBox";
import { useSnackbar } from "@/hooks/useSnackbar";

registerBlockly();

export interface BlocklyEditorHandle {
  getWorkspace: () => Blockly.Workspace | null;
}

type BlocklyEditorProps = {
  onWorkspaceReady?: (workspace: Blockly.WorkspaceSvg) => void;
};

const BlocklyEditor = forwardRef<BlocklyEditorHandle, BlocklyEditorProps>(
  ({ onWorkspaceReady }, ref) => {
    const showSnackbar = useSnackbar();
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const variableInputRef = useRef<InputBoxRef | null>(null);

    const [showVariableModal, setShowVariableModal] = useState<boolean>(false);
    const [selectedToolboxItem, setSelectedToolboxItem] = useState<Blockly.IToolboxItem | null>(null);

    useEffect(() => {
      if (blocklyDivRef.current && !workspaceRef.current) {
        const blocklyOptions: Blockly.BlocklyOptions = {
          toolbox: toolbox as Blockly.utils.toolbox.ToolboxDefinition,
          sounds: false,
          renderer: 'zelos',
          readOnly: false,
          trashcan: true,
          media: 'media/',
          move: {
            scrollbars: true,
            drag: true,
            wheel: true,
          },
          theme: Geckode,
          zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3.0,
            minScale: 0.5,
            scaleSpeed: 1.35,
            pinch: true,
          },
        };

        workspaceRef.current = Blockly.inject(
          blocklyDivRef.current as HTMLDivElement,
          blocklyOptions
        );

        onWorkspaceReady?.(workspaceRef.current);

        workspaceRef.current.registerButtonCallback(
          "createVariableButton",
          (button: Blockly.FlyoutButton) => {
            const ws = button.getTargetWorkspace();
            const toolbox = ws.getToolbox();
            setSelectedToolboxItem(toolbox?.getSelectedItem() || null);
            toolbox?.setSelectedItem(null);
            setShowVariableModal(true);
          }
        );

        workspaceRef.current.registerToolboxCategoryCallback(
          "CUSTOM_VARIABLES",
          variableCategoryCallback
        );
      }

      return () => {
        try {
          workspaceRef.current?.dispose();
        } catch (error) {
          console.warn("Failed to dispose Blockly workspace", error);
        } finally {
          workspaceRef.current = null;
        }
      };
    }, []);

    if (workspaceRef.current) Blockly.svgResize(workspaceRef.current);

    useImperativeHandle(ref, () => ({
      getWorkspace: () => workspaceRef.current,
    }));

    return <>
      <div
        ref={blocklyDivRef}
        id="blocklyDiv"
        className="h-full w-full min-h-80"
      />

      {showVariableModal ? (
        <Modal
          onClose={() => setShowVariableModal(false)}
          title="Create variable"
          icon="circle-info"
          actions={
            <>
              <Button
                onClick={() => {
                  if (!workspaceRef.current || !variableInputRef.current) {
                    showSnackbar("Something went wrong", "error");
                    return;
                  }
                  if (!variableInputRef.current.inputValue) {
                    showSnackbar("Please input a variable name.");
                    return;
                  }
                  if (workspaceRef.current.getVariableMap().getAllVariables().some(variable =>
                    variable.getName() == variableInputRef.current!.inputValue
                  )) {
                    showSnackbar("A variable with that name already exists. Please enter another name.");
                    return;
                  }
                  workspaceRef.current.getVariableMap().createVariable(variableInputRef.current.inputValue);
                  workspaceRef.current.getToolbox()?.setSelectedItem(selectedToolboxItem);
                  setShowVariableModal(false);
                  showSnackbar(`Variable "${variableInputRef.current.inputValue}" successfully created!`, 'success');
                }}
                className="btn-confirm ml-3"
              >
                Create
              </Button>
              <Button
                onClick={() => setShowVariableModal(false)}
                className="btn-neutral"
              >
                Cancel
              </Button>
            </>
          }
        >
          Please enter a name for your variable:
          <div className="flex flex-col">
            <InputBox
              ref={variableInputRef}
              placeholder="Variable name"
              className="bg-white text-black my-3 border-0"
            />
          </div>
        </Modal>
      ) : null}
    </>;
  }
);

export default BlocklyEditor;
