"use client";

import { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly/core";
import { registerBlockly } from "@/blockly/index";
import getToolbox from "@/blockly/toolbox";
import { variableCategoryCallback } from "@/blockly/callbacks";
import { Geckode } from "@/blockly/theme";
import { useGeckodeStore } from "@/stores/geckodeStore";
import VariableModal from "./VariableModal";
import { useParams } from "next/navigation";
import projectsApi from "@/lib/api/handlers/projects";
import starterWorkspace from "@/blockly/workspaces/starter";
import starterWorkspaceNewProject from "@/blockly/workspaces/starterNewProject";

registerBlockly();

function setupCustomZoomControls(container: HTMLDivElement) {
  const customizeZoomControl = (
    zoomGroup: SVGGElement,
    iconPath: string,
  ) => {
    while (zoomGroup.firstChild) {
      zoomGroup.removeChild(zoomGroup.firstChild);
    }
    const customImage = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "image",
    );
    customImage.setAttribute("href", iconPath);
    customImage.setAttribute("width", "32");
    customImage.setAttribute("height", "32");
    customImage.setAttribute("x", "0");
    customImage.setAttribute("y", "0");
    zoomGroup.appendChild(customImage);
  };

  const customizeZoomControls = (el: Element) => {
    const zoomIn = el.querySelector(".blocklyZoomIn") as SVGGElement | null;
    const zoomOut = el.querySelector(".blocklyZoomOut") as SVGGElement | null;
    const zoomReset = el.querySelector(
      ".blocklyZoomReset",
    ) as SVGGElement | null;

    if (zoomIn) customizeZoomControl(zoomIn, "/zoom-plus.svg");
    if (zoomOut) customizeZoomControl(zoomOut, "/zoom-minus.svg");
    if (zoomReset) zoomReset.style.display = "none";
  };

  const existingZoomIn = container.querySelector(".blocklyZoomIn");
  if (existingZoomIn) {
    customizeZoomControls(container);
    return;
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof Element) {
          const hasZoom =
            node.classList?.contains("blocklyZoom") ||
            node.querySelector?.(".blocklyZoom");
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
    if (container.querySelector(".blocklyZoomIn")) {
      customizeZoomControls(container);
    }
  }, 500);
}

const BlocklyEditor = () => {
  const { projectID } = useParams();
  const projectId = projectID ? Number(projectID) : null;

  const blocklyInjectionRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  // Reactive selectors – values that affect rendering / effects
  const currentSpriteId = useGeckodeStore((s) => s.getCurrentSpriteId());

  const setBlocklyWorkspace = useGeckodeStore((s) => s.setBlocklyWorkspace);
  const updateUndoRedoState = useGeckodeStore((s) => s.updateUndoRedoState);

  const [showVariableModal, setShowVariableModal] = useState(false);

  // ── Update toolbox when selected sprite changes ──
  useEffect(() => {
    if (!workspaceRef.current) return;
    const workspace = workspaceRef.current;
    const newToolbox = getToolbox();

    workspace.updateToolbox(newToolbox as Blockly.utils.toolbox.ToolboxDefinition);
  }, [currentSpriteId]);

  // ── Blockly initialisation ──
  useEffect(() => {
    if (!blocklyInjectionRef.current || workspaceRef.current) return;

    // Avoid the weird bumping between blocks that caused desync
    Blockly.BlockSvg.prototype.bumpNeighbours = function () { };

    const blocklyOptions: Blockly.BlocklyOptions = {
      toolbox: getToolbox() as Blockly.utils.toolbox.ToolboxDefinition,
      sounds: false,
      renderer: "zelos",
      readOnly: false,
      trashcan: false,
      media: "/",
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
      grid: { spacing: 50, length: 0.5, colour: "#ccc", snap: false },
    };

    workspaceRef.current = Blockly.inject(
      blocklyInjectionRef.current,
      blocklyOptions,
    );

    setupCustomZoomControls(blocklyInjectionRef.current);

    // Variable modal callback
    workspaceRef.current.registerButtonCallback(
      "createVariableButton",
      () => {
        setShowVariableModal(true);
        const flyout = workspaceRef.current?.getFlyout();
        if (flyout) flyout.autoClose = false;
      },
    );

    workspaceRef.current.registerToolboxCategoryCallback(
      "CUSTOM_VARIABLES",
      variableCategoryCallback,
    );

    // ── Change listener  ──
    workspaceRef.current.addChangeListener((event) => {
      if (event.isUiEvent) return;
      useGeckodeStore.getState().updateUndoRedoState();

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
        useGeckodeStore.getState().scheduleConvert();
    });

    // Register workspace & initial undo/redo (actions are stable refs)
    setBlocklyWorkspace(workspaceRef.current);
    updateUndoRedoState();

    // ── Workspace loading ──
    if (!projectId) {
      loadLocalWorkspace(workspaceRef.current);
    } else {
      loadRemoteWorkspace(projectId, workspaceRef.current);
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

  return (
    <>
      <div
        ref={blocklyInjectionRef}
        id="blocklyDiv"
        className="h-full w-full min-h-80 scrollbar-hide"
      />
      <VariableModal
        showVariableModal={showVariableModal}
        setShowVariableModal={setShowVariableModal}
      />
    </>
  );
};

// ── Workspace-loading helpers ──

function loadLocalWorkspace(workspace: Blockly.WorkspaceSvg) {
  const doLoad = () => {
    const { spriteInstances, spriteWorkspaces, setSelectedSpriteIdx, scheduleConvert } = useGeckodeStore.getState();

    let spriteId = spriteInstances[0]?.id;

    // No sprites -> create a default front-facing sprite
    if (!spriteId) {
      spriteId = `id_${Date.now()}_${Math.round(Math.random() * 1e4)}`;
      useGeckodeStore.setState({
        spriteInstances: [
          {
            id: spriteId,
            textureName: "hero-walk-front",
            name: "herowalkfront1",
            x: 50,
            y: 50,
            visible: true,
            scaleX: 1,
            scaleY: 1,
            direction: 0,
            snapToGrid: true,
          },
        ],
      });
    }

    const persisted = spriteWorkspaces.get(spriteId);
    const hasContent = persisted && Object.keys(persisted).length > 0;
    const workspaceToLoad = hasContent ? persisted : starterWorkspace;

    // Load the workspace and save it to the map so setSelectedSpriteIdx finds it
    Blockly.serialization.workspaces.load(workspaceToLoad, workspace);
    spriteWorkspaces.set(spriteId, workspaceToLoad as Blockly.serialization.workspaceComments.State);

    // Select the first sprite
    setSelectedSpriteIdx(0);
    scheduleConvert();
  };

  if (useGeckodeStore.persist.hasHydrated()) {
    doLoad();
  } else {
    useGeckodeStore.persist.onFinishHydration(doLoad);
  }
}

function loadRemoteWorkspace(
  projectId: number,
  workspace: Blockly.WorkspaceSvg,
) {
  projectsApi(projectId)
    .get()
    .then((project) => {
      try {
        Blockly.serialization.workspaces.load(
          Object.keys(project.blocks).length
            ? project.blocks
            : starterWorkspaceNewProject,
          workspace,
        );
      } catch {
        console.error("Failed to load workspace!");
      }

      const { spriteInstances, setSelectedSpriteIdx } =
        useGeckodeStore.getState();

      useGeckodeStore.setState({
        projectName: project.name,
        phaserState: project.game_state,
      });

      // Select the sprite matching the first project sprite
      const idx = spriteInstances.findIndex(
        (s) => s.id === project.sprites[0]?.id,
      );
      if (idx !== -1) setSelectedSpriteIdx(idx);
    });
}

export default BlocklyEditor;
