"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import BlocklyEditor from "../Blockly/BlocklyEditor";
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

const PhaserGame = dynamic(() => import("./PhaserGame"), { ssr: false });

export default function Home() {
  const phaserRef = useRef<{ game?: any; scene?: any } | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [canMoveSprite, setCanMoveSprite] = useState(true);

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
  const addSprite = () => phaserRef.current?.scene?.addStar?.();
  const currentScene = (scene: { scene: { key: string } }) => {
    setCanMoveSprite(scene.scene.key !== "MainMenu");
  };

  return (
    <div id="app" className="h-screen flex flex-col">
      <div className="bg-primary-green h-[45px] flex p-2 pl-6 text-2xl align-top text-shadow-sm text-white">
        Geckode
      </div>
      <div className="h-full grid grid-cols-5 gap-x-10">
        <div className="m-4 col-span-2">

          <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />

          <div className="mt-4 flex items-center gap-2">
            <div className="rounded-lg border border-slate-800 dark:border-slate-300 p-2 text-xs">
              <div className="font-medium">Sprite Position</div>
              <pre className="mt-1">{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
            </div>

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
          </div>
        </div>

        {/* Blockly */}
        <div className="mb-12 mt-4 t-5 px-6 col-span-3 ">
          <BlocklyEditor scene={phaserRef.current?.scene} />
        </div>
      </div>
    </div>
  );
}
