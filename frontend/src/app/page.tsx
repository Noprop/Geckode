"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from 'react';
import BlocklyEditor from '../Blockly/BlocklyEditor';
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

const PhaserGame = dynamic(() => import('./PhaserGame'), { ssr: false });

export default function Home() {
  const phaserRef = useRef<{ game?: any; scene?: any } | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  const changeScene = () => {
    phaserRef.current?.scene?.changeScene?.();
  };

  const moveSprite = () => {
    const scene = phaserRef.current?.scene;
    if (scene?.key === 'MainMenu') {
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
    setCanMoveSprite(scene.scene.key !== 'MainMenu');
  };

  return (
    <div id="app" className="mb-12">
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />

      {/* Phaser Controls */}
      <div className="mt-4 flex items-center gap-2">
        <button
          className="flex items-center justify-center rounded-lg border border-slate-300 px-2 py-1 text-xs cursor-pointer"
          onClick={changeScene}
        >
          Change Scene
        </button>

        <button
          disabled={canMoveSprite}
          className="flex items-center justify-center rounded-lg border border-slate-300 px-2 py-1 text-xs cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          onClick={moveSprite}
        >
          Toggle Movement
        </button>

        <div className="rounded-lg border border-slate-300 p-2 text-xs">
          <div className="font-medium">Sprite Position</div>
          <pre className="mt-1">{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>

        <button
          className="flex items-center justify-center rounded-lg border border-slate-300 px-2 py-1 text-xs cursor-pointer"
          onClick={addSprite}
        >
          Add Sprite
        </button>
      </div>

      {/* Blockly */}
      <div className="mt-5 px-6 rounded-md">
        <BlocklyEditor scene={phaserRef.current?.scene}/>
      </div>
    </div>
  );
}
