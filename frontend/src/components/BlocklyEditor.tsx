'use client';

import { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly/core';
import { registerBlockly } from '@/blockly/index';
import getToolbox from '@/blockly/toolbox';
import { variableCategoryCallback } from '@/blockly/callbacks';
import { Geckode } from '@/blockly/theme';
import { useGeckodeStore } from '@/stores/geckodeStore';
import VariableModal from './VariableModal';
import { useParams } from 'next/navigation';

registerBlockly();

function setupCustomZoomControls(container: HTMLDivElement) {
  const customizeZoomControl = (zoomGroup: SVGGElement, iconPath: string) => {
    while (zoomGroup.firstChild) {
      zoomGroup.removeChild(zoomGroup.firstChild);
    }
    const customImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    customImage.setAttribute('href', iconPath);
    customImage.setAttribute('width', '32');
    customImage.setAttribute('height', '32');
    customImage.setAttribute('x', '0');
    customImage.setAttribute('y', '0');
    zoomGroup.appendChild(customImage);
  };

  const customizeZoomControls = (el: Element) => {
    const zoomIn = el.querySelector('.blocklyZoomIn') as SVGGElement | null;
    const zoomOut = el.querySelector('.blocklyZoomOut') as SVGGElement | null;
    const zoomReset = el.querySelector('.blocklyZoomReset') as SVGGElement | null;

    if (zoomIn) customizeZoomControl(zoomIn, '/zoom-plus.svg');
    if (zoomOut) customizeZoomControl(zoomOut, '/zoom-minus.svg');
    if (zoomReset) zoomReset.style.display = 'none';
  };

  const existingZoomIn = container.querySelector('.blocklyZoomIn');
  if (existingZoomIn) {
    customizeZoomControls(container);
    return;
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof Element) {
          const hasZoom = node.classList?.contains('blocklyZoom') || node.querySelector?.('.blocklyZoom');
          if (hasZoom) {
            customizeZoomControls(container);
            observer.disconnect();
            return;
          }
        }
      }
    }
  });

  observer.observe(container, { childList: true, subtree: true });

  setTimeout(() => {
    observer.disconnect();
    if (container.querySelector('.blocklyZoomIn')) {
      customizeZoomControls(container);
    }
  }, 500);
}

const BlocklyEditor = () => {
  const { setProjectId } = useGeckodeStore();
  const { projectID } = useParams();
  const projectId = projectID ? Number(projectID) : null;

  const blocklyInjectionRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const prevSpriteIdRef = useRef<string | null>(null);

  // Reactive selectors – values that affect rendering / effects
  const selectedSpriteId = useGeckodeStore((s) => s.selectedSpriteId);

  const setBlocklyWorkspaceRef = useGeckodeStore((s) => s.setBlocklyWorkspaceRef);
  const updateUndoRedoState = useGeckodeStore((s) => s.updateUndoRedoState);

  const [showVariableModal, setShowVariableModal] = useState(false);

  // ── Update toolbox when selected sprite changes ──
  useEffect(() => {
    if (!workspaceRef.current) return;

    const storeState = useGeckodeStore.getState();
    const newWorkspace = storeState.spriteWorkspaces[selectedSpriteId ?? ''];

    if (!newWorkspace) {
      prevSpriteIdRef.current = null;
      workspaceRef.current.clear();
    } else {
      const newToolbox = getToolbox();
      workspaceRef.current?.updateToolbox(newToolbox as Blockly.utils.toolbox.ToolboxDefinition);

      Blockly.Events.disable();

      const prevWorkspaceJson = Blockly.serialization.workspaces.save(workspaceRef.current);

      // Save the current workspace to the corresponding sprite
      if (prevSpriteIdRef.current && prevSpriteIdRef.current in storeState.spriteWorkspaces) {
        Blockly.serialization.workspaces.load(prevWorkspaceJson, storeState.spriteWorkspaces[prevSpriteIdRef.current]);
      }

      // Load the newly selected sprite's workspace into the main workspace
      Blockly.serialization.workspaces.load(
        {
          blocks: Blockly.serialization.workspaces.save(newWorkspace).blocks,
          variables: prevWorkspaceJson.variables,
        },
        workspaceRef.current,
      );

      Blockly.Events.enable();

      prevSpriteIdRef.current = selectedSpriteId;
    }

    workspaceRef.current.clearUndo();
    useGeckodeStore.setState({
      canRedo: false,
      canUndo: false,
    });
  }, [workspaceRef, selectedSpriteId]);

  // ── Blockly initialisation ──
  useEffect(() => {
    if (!blocklyInjectionRef.current || workspaceRef.current) return;

    // Avoid the weird bumping between blocks that caused desync
    Blockly.BlockSvg.prototype.bumpNeighbours = function () {};

    const blocklyOptions: Blockly.BlocklyOptions = {
      toolbox: getToolbox() as Blockly.utils.toolbox.ToolboxDefinition,
      sounds: false,
      renderer: 'zelos',
      readOnly: false,
      trashcan: false,
      media: '/',
      move: { scrollbars: true, drag: true, wheel: true },
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
      grid: { spacing: 50, length: 0.5, colour: '#ccc', snap: false },
    };

    workspaceRef.current = Blockly.inject(blocklyInjectionRef.current, blocklyOptions);

    setupCustomZoomControls(blocklyInjectionRef.current);

    // Variable modal callback
    workspaceRef.current.registerButtonCallback('createVariableButton', () => {
      setShowVariableModal(true);
      const flyout = workspaceRef.current?.getFlyout();
      if (flyout) flyout.autoClose = false;
    });

    workspaceRef.current.registerToolboxCategoryCallback('CUSTOM_VARIABLES', variableCategoryCallback);

    // ── Change listener  ──
    workspaceRef.current.addChangeListener((event) => {
      if (event.isUiEvent) return;

      const storeState = useGeckodeStore.getState();
      storeState.updateUndoRedoState();

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

      // Keep track of which sprites have been updated
      if (convertableEvents.includes(event.type as typeof Blockly.Events.BLOCK_CREATE) && storeState.selectedSpriteId) {
        storeState.markSpriteAsUpdated(storeState.selectedSpriteId);
      }

      // When a variable is deleted, delete it from all sprite workspaces
      if (event.type === Blockly.Events.VAR_DELETE) {
        Object.values(storeState.spriteWorkspaces).forEach((workspace) => {
          const variableMap = workspace.getVariableMap();
          const variable = variableMap.getVariableById((event as Blockly.Events.VarDelete).varId ?? '');
          if (variable) workspace.getVariableMap().deleteVariable(variable);
        });
      }
    });

    // Register workspace & initial undo/redo (actions are stable refs)
    setBlocklyWorkspaceRef(workspaceRef.current);
    updateUndoRedoState();

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
      <div ref={blocklyInjectionRef} id='blocklyDiv' className='h-full w-full min-h-80 scrollbar-hide' />
      <VariableModal showVariableModal={showVariableModal} setShowVariableModal={setShowVariableModal} />
    </>
  );
};

export default BlocklyEditor;
