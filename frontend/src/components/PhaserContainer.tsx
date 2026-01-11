"use client";

import { useEffect, useLayoutEffect, useRef, useImperativeHandle } from "react";
import StartGame from "@/phaser/phaserConfig";
import { EventBus } from "@/phaser/EventBus";
import { MAIN_MENU_SCENE_KEY } from '@/phaser/scenes/EditorScene';
import type MainMenu from '@/phaser/scenes/EditorScene';
import type { Game } from "phaser";
import { loadPhaserState, PhaserExport } from "@/phaser/PhaserStateManager";
import { useEditorStore } from "@/stores/editorStore";

type Props = {
  ref: any;
};

// the React hooks in this component are written in order of their actual execution.
const PhaserContainer = ({ ref }: Props) => {
  const isConverting = useEditorStore((state) => state.isConverting);
  const internalGameRef = useRef<Game | null>(null);

  useLayoutEffect(() => {
    if (!internalGameRef.current)
      internalGameRef.current = StartGame('game-container');
  }, []);

  useImperativeHandle(
    ref,
    () => {
      console.log('useImperativeHandle(), ', internalGameRef.current);
      return {
        game: internalGameRef.current,
        scene: null,
      };
    },
    []
  );

  useEffect(() => {
    // this scene event listener will live until this Phaser react component has been torn down
    const handler = (scene: Phaser.Scene | MainMenu) => {
      if (!('key' in scene) || !(scene.key == MAIN_MENU_SCENE_KEY)) return;
      ref.current.scene = scene;
    };
    EventBus.on('current-scene-ready', handler);

    const container = document.getElementById(
      'game-container'
    ) as HTMLDivElement;
    const keyboard = internalGameRef.current?.input?.keyboard;
    if (!container || !keyboard)
      throw new Error('Game container or keyboard not found');

    const handleDocumentPointerDown = (event: PointerEvent) => {
      if (!container.contains(event.target as Node) && keyboard.enabled)
        keyboard.enabled = false;
    };

    container.addEventListener('focus', () => {
      if (!keyboard.enabled) keyboard.enabled = true;
    });
    container.addEventListener('pointerdown', () => {
      if (!keyboard.enabled) keyboard.enabled = true;
    });
    container.addEventListener('blur', () => {
      if (keyboard.enabled) keyboard.enabled = false;
    });
    document.addEventListener('pointerdown', handleDocumentPointerDown);

    return () => {
      EventBus.off('current-scene-ready', handler);
      document.removeEventListener('pointerdown', handleDocumentPointerDown);
    };
  }, []);

  // useEffect(() => {
  //   const handler = () => {
  //     // const phaserState = useEditorStore.getState().phaserState;

  //     // if (phaserState && Object.keys(phaserState).length > 0)
  //     //   loadPhaserState((ref as any).current, phaserState);
  //     // else (ref as any).current.scene.createSprite('hero', 200, 300, 'hero');
  //   };
  //   EventBus.on('current-scene-ready', handler);
  //   return () => {
  //     EventBus.off('current-scene-ready', handler);
  //   };
  // }, [ref]);

  return (
    <div className="relative">
      <div
        id="game-container"
        tabIndex={0}
        className="rounded-md outline-none border-2 border-transparent focus:border-primary-green transition-all duration-200"
        style={{
          width: '484px',
          height: '360px',
          overflow: 'hidden',
        }}
      />
      {isConverting && (
        <div
          className="absolute inset-0 rounded-md flex items-center justify-center bg-black/40 pointer-events-none"
          style={{ transition: 'opacity 100ms ease-in-out' }}
        >
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default PhaserContainer;
