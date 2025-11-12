"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import BlocklyEditor, { BlocklyEditorHandle } from "@/components/BlocklyEditor";
import { javascriptGenerator } from "blockly/javascript";
import { serialization, type Workspace } from "blockly/core";
import { useParams } from "next/navigation";
import projectsApi from "@/lib/api/projects";

const PhaserGame = dynamic(() => import("@/components/PhaserGame"), {
  ssr: false,
});

export default function ProjectView() {
  const blocklyRef = useRef<BlocklyEditorHandle>(null);
  const phaserRef = useRef<{ game?: any; scene?: any } | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  const { projectID } = useParams();

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
    const workspace: Workspace = blocklyRef.current?.getWorkspace()!;
    projectsApi.list(projectID);
  }, []);

  const addSprite = () => phaserRef.current?.scene?.addStar?.();

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
      blocklyRef.current.getWorkspace() as Workspace
    );
    phaserRef.current.scene?.runScript(code);
  };

  const saveWorkspace = () => {
    const workspace: Workspace = blocklyRef.current?.getWorkspace()!;
    const workspaceState: { [key: string]: any } =
      serialization.workspaces.save(workspace);

    projectsApi.update(parseInt(projectID!.toString()), {
      blocks: workspaceState,
    });
  };

  return (
    <div id="app" className="flex flex-1  gap-x-10">
      <div className="m-4 min-w-1/3">
        {/* believe it or not both the min and max w classes are necessary: E: I removed it and it seems fine? */}
        <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        <div className="mt-4 flex items-center gap-2">
          <button className="btn btn-deny" onClick={changeScene}>
            Change Scene
          </button>

          <button
            disabled={canMoveSprite}
            className="btn btn-alt"
            onClick={moveSprite}
          >
            Toggle Movement
          </button>

          <button className="btn btn-confirm" onClick={addSprite}>
            Add Sprite
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
            className="btn btn-alt2"
            aria-label="Save Project"
            title="Save Project"
            onClick={saveWorkspace}
          >
            Save Project
          </button>
        </div>
        <div className="w-max mt-6 rounded-lg border border-slate-800 dark:border-slate-300 p-2 text-xs">
          <div className="font-medium">Sprite Position</div>
          <pre className="mt-1">{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>
      </div>

      <div className="mb-4 mt-4 flex px-6 w-full">
        <BlocklyEditor ref={blocklyRef} />
      </div>
    </div>
  );
}
