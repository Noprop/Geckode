"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import * as Blockly from "blockly/core";
import { registerBlockly } from "@/blockly/index";
import getToolbox from "@/blockly/toolbox";
import { variableCategoryCallback } from '@/blockly/callbacks';
import { Geckode } from '@/blockly/theme';
import { useEditorStore } from '@/stores/editorStore';
import VariableModal from './VariableModal';
import { useParams } from 'next/navigation';
import projectsApi from '@/lib/api/handlers/projects';
import starterWorkspace from '@/blockly/workspaces/starter';
import starterWorkspaceNewProject from '@/blockly/workspaces/starterNewProject';
import { useSpriteStore } from '@/stores/spriteStore';

registerBlockly();

const BlocklyEditor = () => {
  const { projectID } = useParams();
  const projectId = projectID ? Number(projectID) : null;

  const blocklyInjectionRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const spriteId = useEditorStore((state) => state.spriteId);

  const [showVariableModal, setShowVariableModal] = useState<boolean>(false);

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
    // inject Blockly into the div
    if (blocklyInjectionRef.current && !workspaceRef.current) {
      // This avoids the weird bumping between blocks that caused desync
      Blockly.BlockSvg.prototype.bumpNeighbours = function() {};

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
          controls: false,
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

      workspaceRef.current = Blockly.inject(blocklyInjectionRef.current as HTMLDivElement, blocklyOptions);

      // Customize zoom controls to use custom +/- icons
      const customizeZoomControl = (zoomGroup: SVGGElement, iconPath: string) => {
        // Remove all existing children (images and clip-paths)
        while (zoomGroup.firstChild) {
          zoomGroup.removeChild(zoomGroup.firstChild);
        }

        // Create a new image element with our custom SVG
        const customImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        customImage.setAttribute('href', iconPath);
        customImage.setAttribute('width', '32');
        customImage.setAttribute('height', '32');
        customImage.setAttribute('x', '0');
        customImage.setAttribute('y', '0');
        zoomGroup.appendChild(customImage);
      };

      const customizeZoomControls = (container: Element) => {
        const zoomIn = container.querySelector('.blocklyZoomIn') as SVGGElement | null;
        const zoomOut = container.querySelector('.blocklyZoomOut') as SVGGElement | null;
        const zoomReset = container.querySelector('.blocklyZoomReset') as SVGGElement | null;

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
      const blocklyContainer = blocklyInjectionRef.current;
      const existingZoomIn = blocklyContainer.querySelector('.blocklyZoomIn');

      if (existingZoomIn) {
        customizeZoomControls(blocklyContainer);
      } else {
        // Observe for zoom controls being added to the DOM
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
              if (node instanceof Element) {
                const hasZoomControls = node.classList?.contains('blocklyZoom') || node.querySelector?.('.blocklyZoom');
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

      workspaceRef.current.registerButtonCallback('createVariableButton', () => {
        setShowVariableModal(true);
        const flyout = workspaceRef.current?.getFlyout();
        if (flyout) flyout.autoClose = false;
      });

      workspaceRef.current.registerToolboxCategoryCallback('CUSTOM_VARIABLES', variableCategoryCallback);

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

        if (convertableEvents.includes(event.type as typeof Blockly.Events.BLOCK_CREATE))
          useEditorStore.getState().scheduleConvert();
      });

      useEditorStore.getState().setBlocklyWorkspace(workspaceRef.current!);

      // Initial update of undo/redo state
      useEditorStore.getState().updateUndoRedoState();

      if (!projectId) {
        const loadPersistedOrDefault = () => {
          let spriteId = useSpriteStore.getState().spriteInstances[0]?.id;

          // no sprites - create a default front-facing sprite
          if (!spriteId) {
            spriteId = `id_${Date.now()}_${Math.round(Math.random() * 1e4)}`;
            useSpriteStore.setState({
              spriteInstances: [{
                id: spriteId,
                instanceId: spriteId,
                textureName: 'hero-walk-front',
                name: 'herowalkfront1',
                x: 200,
                y: 150,
              }],
            });
          }

          const persisted = useEditorStore.getState().spriteWorkspaces.get(spriteId);
          Blockly.serialization.workspaces.load(
            persisted ?? starterWorkspace,
            workspaceRef.current!
          );
          useEditorStore.getState().setSpriteId(spriteId);
          useEditorStore.getState().scheduleConvert();
        };

        // call immediately if hydrated, otherwise wait
        if (useEditorStore.persist.hasHydrated()) {
          loadPersistedOrDefault();
        } else {
          useEditorStore.persist.onFinishHydration(loadPersistedOrDefault);
        }
        return;
      }

      const fetchWorkspace = async () => {
        projectsApi(projectId)
          .get()
          .then((project) => {
            try {
              Blockly.serialization.workspaces.load(
                Object.keys(project.blocks).length ? project.blocks : starterWorkspaceNewProject,
                workspaceRef.current!
              );
            } catch {
              console.error('Failed to load workspace!');
            }

            useEditorStore.setState({
              projectName: project.name,
              phaserState: project.game_state,
              spriteId: project.sprites[0]?.id ?? '',
            });
          });
      };

      fetchWorkspace();
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
  }, []);

  return (
    <>
      <div ref={blocklyInjectionRef} id="blocklyDiv" className="h-full w-full min-h-80 scrollbar-hide" />
      <VariableModal showVariableModal={showVariableModal} setShowVariableModal={setShowVariableModal} />
    </>
  );
};

export default BlocklyEditor;
