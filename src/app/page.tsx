"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import BlocklyEditor from '@/Blockly/BlocklyEditor';

const PhaserGame = dynamic(() => import("./PhaserGame"), { ssr: false });

export default function Home() {
  const phaserRef = useRef<{ game?: any; scene?: any } | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  const changeScene = () => phaserRef.current?.scene?.changeScene?.();

  const moveSprite = () => {
    const scene = phaserRef.current?.scene;
    if (scene?.scene?.key === 'MainMenu') {
      scene.moveLogo?.(({ x, y }: { x: number; y: number }) =>
        setSpritePosition({ x, y })
      );
    }
  };

  const addSprite = () => phaserRef.current?.scene?.addStar?.();

  const currentScene = (scene: { scene: { key: string } }) =>
    setCanMoveSprite(scene.scene.key !== 'MainMenu');

  return (
    <div id="app" className="mb-12">
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />

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
        <BlocklyEditor />
      </div>
    </div>
  );
}
