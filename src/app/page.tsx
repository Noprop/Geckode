"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const PhaserGame = dynamic(() => import("./PhaserGame"), { ssr: false });

export default function Home() {
  const phaserRef = useRef<{ game?: any; scene?: any } | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  const changeScene = () => phaserRef.current?.scene?.changeScene?.();

  const moveSprite = () => {
    const scene = phaserRef.current?.scene;
    if (scene?.scene?.key === "MainMenu") {
      scene.moveLogo?.(({ x, y }: { x: number; y: number }) => setSpritePosition({ x, y }));
    }
  };

  const addSprite = () => phaserRef.current?.scene?.addStar?.();

  const currentScene = (scene: { scene: { key: string } }) =>
    setCanMoveSprite(scene.scene.key !== "MainMenu");

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
      <div>
        <div><button className="button" onClick={changeScene}>Change Scene</button></div>
        <div><button disabled={canMoveSprite} className="button" onClick={moveSprite}>Toggle Movement</button></div>
        <div className="spritePosition">Sprite Position:
          <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>
        <div><button className="button" onClick={addSprite}>Add New Sprite</button></div>
      </div>
    </div>
  );
}
