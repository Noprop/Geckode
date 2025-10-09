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

      {/* Controls */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button
          className="inline-flex w-auto items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50"
          onClick={changeScene}
        >
          Change Scene
        </button>

        <button
          disabled={canMoveSprite}
          className="inline-flex w-auto items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={moveSprite}
        >
          Toggle Movement
        </button>

        <div className="rounded-xl border border-slate-200 p-3 text-sm">
          <div className="font-medium">Sprite Position</div>
          <pre className="mt-1 text-xs">{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>

        <button
          className="inline-flex w-auto items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50"
          onClick={addSprite}
        >
          Add New Sprite
        </button>
      </div>

      {/* Blockly */}
      <div className="mt-5">
        <BlocklyEditor />
      </div>
    </div>
  );
}
