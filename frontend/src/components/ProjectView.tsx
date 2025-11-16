"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect, useCallback, DragEvent } from "react";
import BlocklyEditor, { BlocklyEditorHandle } from "@/components/BlocklyEditor";
import { javascriptGenerator } from "blockly/javascript";
import * as Blockly from "blockly/core";
import projectsApi from "@/lib/api/projects";
import { Project } from "@/lib/types/api/projects";
import { createPhaserState, PhaserExport } from "@/phaser/PhaserStateManager";
import { Game } from "phaser";
import MainMenu from "@/phaser/scenes/MainMenu";
import SpriteEditor, {
  SpriteInstance,
  SpriteDragPayload,
} from "@/components/SpriteEditor";

export type PhaserRef = {
  readonly game: Game;
  readonly scene: MainMenu;
} | null;

const PhaserGame = dynamic(() => import("@/components/PhaserGame"), {
  ssr: false,
});

interface ProjectViewProps {
  projectID?: number;
}

const ProjectView: React.FC<ProjectViewProps> = ({ projectID }) => {
  const blocklyRef = useRef<BlocklyEditorHandle>(null);
  const phaserRef = useRef<{ game?: any; scene?: any } | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [canMoveSprite, setCanMoveSprite] = useState(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [phaserState, setPhaserState] = useState<PhaserExport | null>(null);
  const [spriteInstances, setSpriteInstances] = useState<SpriteInstance[]>([]);
  const workspaceListenerRef = useRef<{
    workspace: Blockly.WorkspaceSvg;
    listener: (event: Blockly.Events.Abstract) => void;
  } | null>(null);

  const changeScene = () => {
    phaserRef.current?.scene?.changeScene?.();
  };

  const moveSprite = () => {
    const scene = phaserRef.current?.scene;
    if (scene?.key === "MainMenu") {
      try {
        scene.runScript(`
          
          scene.create = () => {
            scene.player = scene.physics.add.sprite(50, 300, 'star');
            scene.player.setCollideWorldBounds(true);

            scene.cursors = scene.input.keyboard.createCursorKeys();
          }

          scene.update = () => {
            scene.player.setVelocityX(0)
            scene.player.setVelocityY(0)
            const speed = 200
            if (scene.cursors.right.isDown) {
              console.log("hello45")
              scene.player.body.velocity.x += speed
            }
            if (scene.cursors.left.isDown) {
              scene.player.body.velocity.x -= speed
            }
            if (scene.cursors.up.isDown) {
              scene.player.body.velocity.y -= speed
            }
            if (scene.cursors.down.isDown) {
              scene.player.body.velocity.y += speed
            }
          }
          
          scene.scene.restart();
          return { done: true };
        `);
      } catch (e) {
        console.error(e);
      }

      // scene.moveLogo?.(({ x, y }: { x: number; y: number }) =>
      //   setSpritePosition({ x, y })
      // );
    }
  };

  useEffect(() => {
    if (!projectID) return;

    const fetchWorkspace = async () => {
      const workspace: Blockly.Workspace = blocklyRef.current?.getWorkspace()!;
      projectsApi
        .get(parseInt(projectID?.toString()!))
        .then((project: Project) => {
          if (project.blocks) {
            try {
              Blockly.serialization.workspaces.load(project.blocks, workspace);
            } catch {
              setErrMsg("Failed to load workspace!");
            }
          }

          if (project.game_state)
            setPhaserState(project.game_state as PhaserExport);

          if (project.sprites) setSpriteInstances(project.sprites);
        });
    };

    fetchWorkspace();
  }, []);

  const addSprite = () => {
    phaserRef.current?.scene?.addStar?.();
  };

  const currentScene = (scene: { scene: { key: string } }) => {
    setCanMoveSprite(scene.scene.key !== "MainMenu");
  };

  const generateCode = () => {
    if (
      !phaserRef.current ||
      !blocklyRef.current ||
      !blocklyRef.current.getWorkspace()
    )
      return;
    const code = javascriptGenerator.workspaceToCode(
      blocklyRef.current.getWorkspace() as Blockly.Workspace
    );
    phaserRef.current.scene?.runScript(code);
  };

  // grab states of workspace and game scene, upload to backend, display msg
  const saveProject = () => {
    if (!projectID) return;

    const workspace: Blockly.Workspace = blocklyRef.current?.getWorkspace()!;
    const workspaceState: { [key: string]: any } =
      Blockly.serialization.workspaces.save(workspace);

    const phaserState = createPhaserState(phaserRef?.current!);

    projectsApi.update(parseInt(projectID!.toString()), {
      blocks: workspaceState,
      game_state: phaserState,
      sprites: spriteInstances,
    });

    setSuccessMsg("Project Saved Successfully!");
    setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);
  };

  const workspaceDeleteHandler = useCallback(
    (event: Blockly.Events.Abstract) => {
      if (event.type !== Blockly.Events.BLOCK_DELETE) return;
      const deleteEvent = event as Blockly.Events.BlockDelete;
      if (deleteEvent.oldJson?.type !== "createSprite") return;
      setSpriteInstances((prev) => {
        const sprite = prev.find(
          (instance) => instance.blockId === deleteEvent.blockId
        );
        if (!sprite) return prev;
        phaserRef.current?.scene?.removeEditorSprite?.(sprite.id);
        return prev.filter(
          (instance) => instance.blockId !== deleteEvent.blockId
        );
      });
    },
    []
  );

  const handleWorkspaceReady = useCallback(
    (workspace: Blockly.WorkspaceSvg) => {
      if (workspaceListenerRef.current) {
        workspaceListenerRef.current.workspace.removeChangeListener(
          workspaceListenerRef.current.listener
        );
      }
      workspace.addChangeListener(workspaceDeleteHandler);
      workspaceListenerRef.current = {
        workspace,
        listener: workspaceDeleteHandler,
      };
    },
    [workspaceDeleteHandler]
  );

  useEffect(() => {
    return () => {
      if (workspaceListenerRef.current) {
        workspaceListenerRef.current.workspace.removeChangeListener(
          workspaceListenerRef.current.listener
        );
      }
    };
  }, []);

  const attachBlockToOnStart = (
    workspace: Blockly.WorkspaceSvg,
    block: Blockly.BlockSvg
  ) => {
    const [onStartBlock] = workspace.getBlocksByType("onStart", false);
    if (!onStartBlock) return;
    const input = onStartBlock.getInput("INNER");
    const connection = input?.connection;
    if (!connection || !block.previousConnection) return;

    if (!connection.targetConnection) {
      connection.connect(block.previousConnection);
      return;
    }

    let current = connection.targetBlock();
    while (current && current.getNextBlock()) {
      current = current.getNextBlock();
    }
    current?.nextConnection?.connect(block.previousConnection);
  };

  const handleSpriteDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const payloadString = event.dataTransfer.getData("application/json");
    if (!payloadString || !blocklyRef.current || !phaserRef.current) return;

    let payload: SpriteDragPayload;
    try {
      payload = JSON.parse(payloadString) as SpriteDragPayload;
    } catch {
      console.warn("Invalid payload for sprite creation.");
      return;
    }
    if (payload.kind !== "sprite-blueprint") return;

    const game = phaserRef.current.game;
    const scene = phaserRef.current.scene;
    const workspace =
      blocklyRef.current.getWorkspace() as Blockly.WorkspaceSvg | null;
    if (!game || !scene || !workspace || !game.canvas) return;

    const canvasRect = game.canvas.getBoundingClientRect();
    const relativeX = event.clientX - canvasRect.left;
    const relativeY = event.clientY - canvasRect.top;

    if (
      relativeX < 0 ||
      relativeY < 0 ||
      relativeX > canvasRect.width ||
      relativeY > canvasRect.height
    ) {
      return;
    }

    console.log(canvasRect.width, game.scale.width);
    console.log(canvasRect.height, game.scale.height);

    const worldX = Math.round(
      (relativeX / canvasRect.width) * game.scale.width
    );
    const worldY = Math.round(
      (relativeY / canvasRect.height) * game.scale.height
    );

    console.log(relativeX, worldX);
    console.log(relativeY, worldY);

    const safeBase = payload.texture.replace(/[^\w]/g, "") || "sprite";
    const duplicateCount = spriteInstances.filter(
      (instance) => instance.texture === payload.texture
    ).length;
    const variableName = `${safeBase}${duplicateCount + 1}`;
    const spriteId = `sprite-${Date.now()}-${Math.round(Math.random() * 1e4)}`;

    scene.addSpriteFromEditor(payload.texture, worldX, worldY, spriteId);

    const newBlock = workspace.newBlock("createSprite") as Blockly.BlockSvg;
    newBlock.setFieldValue(variableName, "NAME");
    newBlock.setFieldValue(payload.texture, "TEXTURE");
    newBlock.setFieldValue(String(worldX), "X");
    newBlock.setFieldValue(String(worldY), "Y");
    newBlock.initSvg();
    newBlock.render();
    attachBlockToOnStart(workspace, newBlock);

    setSpriteInstances((prev) => [
      ...prev,
      {
        id: spriteId,
        label: payload.label,
        texture: payload.texture,
        variableName,
        x: worldX,
        y: worldY,
        blockId: newBlock.id,
      },
    ]);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleRemoveSprite = (spriteId: string) => {
    const workspace =
      blocklyRef.current?.getWorkspace() as Blockly.WorkspaceSvg | null;
    const sprite = spriteInstances.find((instance) => instance.id === spriteId);
    if (!workspace || !sprite?.blockId) return;
    const block = workspace.getBlockById(sprite.blockId);
    block?.dispose(true);
  };

  return (
    <>
      {successMsg && <div className="success-msg">{successMsg}</div>}
      {errMsg && <div className="error-msg">{errMsg}</div>}
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 min-h-0 min-w-0">
          <BlocklyEditor
            ref={blocklyRef}
            onWorkspaceReady={handleWorkspaceReady}
          />
        </div>

        <div className="flex flex-col h-[calc(100vh-4rem)] p-3">
          <div
            className="rounded-xl border border-dashed border-slate-400 dark:border-slate-600
                    p-2  bg-light-secondary dark:bg-dark-secondary"
            onDragOver={handleDragOver}
            onDrop={handleSpriteDrop}
          >
            <PhaserGame ref={phaserRef} phaserState={phaserState} />
          </div>

          <div className="flex gap-x-3">
            <div className="mt-4 flex items-center gap-2">
              <button className="btn btn-deny" onClick={changeScene}>
                Change Scene
              </button>

              <button
                onClick={generateCode}
                className="btn btn-neutral"
                aria-label="Convert Now"
                title="Convert Now"
              >
                Convert Now
              </button>

              <button
                onClick={saveProject}
                className="btn btn-alt2"
                aria-label="Save"
                title="Save"
              >
                Save
              </button>
            </div>
            <div
              className="w-max mt-4 rounded-lg border border-slate-800
                   dark:border-slate-300 px-2 py-1 align-middle text-xs"
            >
              <pre className="mt-1">{`Sprite Position: { x: ${spritePosition.x}, y: ${spritePosition.y} }`}</pre>
            </div>
          </div>
          <SpriteEditor
            sprites={spriteInstances}
            onRemoveSprite={handleRemoveSprite}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectView;
