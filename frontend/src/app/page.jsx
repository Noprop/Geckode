"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from 'react';
import BlocklyEditor from '../Blockly/BlocklyEditor';
const PhaserGame = dynamic(() => import('./PhaserGame'), { ssr: false });
export default function Home() {
    const phaserRef = useRef(null);
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
    const [canMoveSprite, setCanMoveSprite] = useState(true);
    const changeScene = () => {
        var _a, _b, _c;
        (_c = (_b = (_a = phaserRef.current) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.changeScene) === null || _c === void 0 ? void 0 : _c.call(_b);
    };
    const moveSprite = () => {
        var _a;
        const scene = (_a = phaserRef.current) === null || _a === void 0 ? void 0 : _a.scene;
        if ((scene === null || scene === void 0 ? void 0 : scene.key) === 'MainMenu') {
            try {
                scene.runScript(`
          console.log('wow');
          console.log(scene.player.x);
          scene.player.setX(0);
          console.log(scene.player.x);
          scene.test = 'wow2';
          console.log(scene.test);
          // scene.player.setVelocity(25);
          await api.wait(1000);
          for (let i = 0; i < 600; i++) {
            await api.wait(5);
            scene.player.setX(i);
            // console.log('i: ', i);
          }
          // await api.wait(300);
          // api.addStar();
          // api.moveBy(25, -10);
          // return any value if you want:
          return { done: true };
        `);
            }
            catch (e) {
                console.error(e);
            }
            // scene.moveLogo?.(({ x, y }: { x: number; y: number }) =>
            //   setSpritePosition({ x, y })
            // );
        }
    };
    const addSprite = () => { var _a, _b, _c; return (_c = (_b = (_a = phaserRef.current) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.addStar) === null || _c === void 0 ? void 0 : _c.call(_b); };
    const currentScene = (scene) => {
        setCanMoveSprite(scene.scene.key !== 'MainMenu');
    };
    return (<div id="app" className="mb-12">
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene}/>

      {/* Phaser Controls */}
      <div className="mt-4 flex items-center gap-2">
        <button className="flex items-center justify-center rounded-lg border border-slate-300 px-2 py-1 text-xs cursor-pointer" onClick={changeScene}>
          Change Scene
        </button>

        <button disabled={canMoveSprite} className="flex items-center justify-center rounded-lg border border-slate-300 px-2 py-1 text-xs cursor-pointer disabled:cursor-not-allowed disabled:opacity-50" onClick={moveSprite}>
          Toggle Movement
        </button>

        <div className="rounded-lg border border-slate-300 p-2 text-xs">
          <div className="font-medium">Sprite Position</div>
          <pre className="mt-1">{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>

        <button className="flex items-center justify-center rounded-lg border border-slate-300 px-2 py-1 text-xs cursor-pointer" onClick={addSprite}>
          Add Sprite
        </button>
      </div>

      {/* Blockly */}
      <div className="mt-5 px-6 rounded-md">
        <BlocklyEditor />
      </div>
    </div>);
}
