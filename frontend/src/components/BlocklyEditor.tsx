"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import * as Blockly from "blockly/core";
import { registerBlockly } from "@/blockly/index";
import getToolbox from "@/blockly/toolbox";
import {
  variableCategoryCallback,
} from "@/blockly/callbacks";
import { Geckode } from "@/blockly/theme";
import { Modal } from "./ui/modals/Modal";
import { Button } from "./ui/Button";
import { InputBox, InputBoxRef } from "./ui/inputs/InputBox";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useEditorStore } from '@/stores/editorStore';
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { getSpriteDropdownOptions } from "@/blockly/spriteRegistry"

registerBlockly();

export interface BlocklyEditorHandle {
  getWorkspace: () => Blockly.Workspace | null;
}

type BlocklyEditorProps = {
  onWorkspaceReady?: (workspace: Blockly.WorkspaceSvg) => void;
};

const BlocklyEditor = forwardRef<BlocklyEditorHandle, BlocklyEditorProps>(
  ({ onWorkspaceReady }, ref) => {
    console.log('BlocklyEditor()');
    const showSnackbar = useSnackbar();
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const variableInputRef = useRef<InputBoxRef | null>(null);
    const spriteId = useEditorStore((state) => state.spriteId);

    const [showVariableModal, setShowVariableModal] = useState<boolean>(false);
    const [selectedToolboxItem, setSelectedToolboxItem] =
      useState<Blockly.IToolboxItem | null>(null);

      useEffect(() => {
        if (!workspaceRef.current) return;
        
        const workspace = workspaceRef.current;
        const toolbox = workspace.getToolbox();
        if (!toolbox) return;
        
        // Update the toolbox with fresh spriteId
        const newToolbox = getToolbox();
        workspace.updateToolbox(newToolbox as Blockly.utils.toolbox.ToolboxDefinition);
      }, [spriteId]);
    
    useEffect(() => {
      if (blocklyDivRef.current && !workspaceRef.current) {
        const blocklyOptions: Blockly.BlocklyOptions = {
          toolbox: getToolbox() as Blockly.utils.toolbox.ToolboxDefinition,
          sounds: false,
          renderer: 'zelos',
          readOnly: false,
          trashcan: false,
          media: '/',
          move: {
            scrollbars: true,
            drag: true,
            wheel: true,
          },
          theme: Geckode,
          zoom: {
            controls: true,
            wheel: true,
            startScale: 0.75,
            maxScale: 2.0,
            minScale: 0.4,
            scaleSpeed: 1.35,
            pinch: true,
          },
          grid: {
            spacing: 50,
            length: 0.5,
            colour: '#ccc',
            snap: false,
          },
        };

        workspaceRef.current = Blockly.inject(
          blocklyDivRef.current as HTMLDivElement,
          blocklyOptions
        );

        // Customize zoom controls to use custom +/- icons
        const customizeZoomControl = (
          zoomGroup: SVGGElement,
          iconPath: string
        ) => {
          // Remove all existing children (images and clip-paths)
          while (zoomGroup.firstChild) {
            zoomGroup.removeChild(zoomGroup.firstChild);
          }

          // Create a new image element with our custom SVG
          const customImage = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'image'
          );
          customImage.setAttribute('href', iconPath);
          customImage.setAttribute('width', '32');
          customImage.setAttribute('height', '32');
          customImage.setAttribute('x', '0');
          customImage.setAttribute('y', '0');
          zoomGroup.appendChild(customImage);
        };

        const customizeZoomControls = (container: Element) => {
          const zoomIn = container.querySelector(
            '.blocklyZoomIn'
          ) as SVGGElement | null;
          const zoomOut = container.querySelector(
            '.blocklyZoomOut'
          ) as SVGGElement | null;
          const zoomReset = container.querySelector(
            '.blocklyZoomReset'
          ) as SVGGElement | null;

          if (zoomIn) {
            customizeZoomControl(zoomIn, '/zoom-plus.svg');
          }
          if (zoomOut) {
            customizeZoomControl(zoomOut, '/zoom-minus.svg');
          }
          // Hide the reset button - only show +/-
          if (zoomReset) {
            zoomReset.style.display = 'none';
          }
        };

        // Look for existing zoom controls or observe for their creation
        const blocklyContainer = blocklyDivRef.current;
        const existingZoomIn = blocklyContainer.querySelector('.blocklyZoomIn');

        if (existingZoomIn) {
          customizeZoomControls(blocklyContainer);
        } else {
          // Observe for zoom controls being added to the DOM
          const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
              for (const node of mutation.addedNodes) {
                if (node instanceof Element) {
                  const hasZoomControls =
                    node.classList?.contains('blocklyZoom') ||
                    node.querySelector?.('.blocklyZoom');
                  if (hasZoomControls) {
                    customizeZoomControls(blocklyContainer);
                    observer.disconnect();
                    return;
                  }
                }
              }
            }
          });

          observer.observe(blocklyContainer, {
            childList: true,
            subtree: true,
          });

          // Fallback timeout
          setTimeout(() => {
            observer.disconnect();
            const zoomIn = blocklyContainer.querySelector('.blocklyZoomIn');
            if (zoomIn) {
              customizeZoomControls(blocklyContainer);
            }
          }, 500);
        }

        onWorkspaceReady?.(workspaceRef.current);

        workspaceRef.current.registerButtonCallback(
          'createVariableButton',
          (button: Blockly.FlyoutButton) => {
            const ws = button.getTargetWorkspace();
            const toolbox = ws.getToolbox();
            setSelectedToolboxItem(toolbox?.getSelectedItem() || null);
            toolbox?.setSelectedItem(null);
            setShowVariableModal(true);
          }
        );

        workspaceRef.current.registerToolboxCategoryCallback(
          'CUSTOM_VARIABLES',
          variableCategoryCallback
        );

        // Listen for workspace changes to update undo/redo state and trigger auto-convert
        workspaceRef.current.addChangeListener((event) => {

          // Update on any event that could affect undo/redo stacks
          if (event.isUiEvent) return; // Skip UI-only events
          // Get fresh reference from store to avoid stale closure
          useEditorStore.getState().updateUndoRedoState();

          // Trigger auto-convert for code-affecting changes
          // Skip events that don't record undo (e.g., during workspace load)
          if (!event.recordUndo) return;

          const convertableEvents = [
            Blockly.Events.BLOCK_CREATE,
            Blockly.Events.BLOCK_DELETE,
            Blockly.Events.BLOCK_MOVE,
            Blockly.Events.BLOCK_CHANGE,
            Blockly.Events.VAR_CREATE,
            Blockly.Events.VAR_DELETE,
            Blockly.Events.VAR_RENAME,
          ];

          console.log('event', event);
          console.log(
            'convertableEvents',
            convertableEvents.includes(
              event.type as typeof Blockly.Events.BLOCK_CREATE
            )
          );
          if (convertableEvents.includes(event.type as typeof Blockly.Events.BLOCK_CREATE)) {
            useEditorStore.getState().scheduleConvert();
          }
        });

        // Initial update of undo/redo state
        useEditorStore.getState().updateUndoRedoState();
      }

      return () => {
        try {
          workspaceRef.current?.dispose();
        } catch (error) {
          console.warn('Failed to dispose Blockly workspace', error);
        } finally {
          workspaceRef.current = null;
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (workspaceRef.current) Blockly.svgResize(workspaceRef.current);

    useImperativeHandle(
      ref,
      () => ({
        getWorkspace: () => workspaceRef.current,
      }),
      []
    );

    return (
      <>
        <div
          ref={blocklyDivRef}
          id="blocklyDiv"
          className="h-full w-full min-h-80 scrollbar-hide"
        />

        {showVariableModal ? (
          <Modal
            onClose={() => setShowVariableModal(false)}
            title="Create variable"
            icon={InfoCircledIcon}
            actions={
              <>
                <Button
                  onClick={() => {
                    if (!workspaceRef.current || !variableInputRef.current) {
                      showSnackbar('Something went wrong', 'error');
                      return;
                    }
                    if (!variableInputRef.current.inputValue) {
                      showSnackbar('Please input a variable name.');
                      return;
                    }
                    if (
                      workspaceRef.current
                        .getVariableMap()
                        .getAllVariables()
                        .some(
                          (variable) =>
                            variable.getName() ==
                            variableInputRef.current!.inputValue
                        )
                    ) {
                      showSnackbar(
                        'A variable with that name already exists. Please enter another name.'
                      );
                      return;
                    }
                    workspaceRef.current
                      .getVariableMap()
                      .createVariable(variableInputRef.current.inputValue);
                    workspaceRef.current
                      .getToolbox()
                      ?.setSelectedItem(selectedToolboxItem);
                    setShowVariableModal(false);
                    showSnackbar(
                      `Variable "${variableInputRef.current.inputValue}" successfully created!`,
                      'success'
                    );
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
      </>
    );
  }
);

export default BlocklyEditor;
