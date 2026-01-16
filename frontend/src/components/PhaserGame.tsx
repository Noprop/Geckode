"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "@/phaser/phaserConfig";
import { EventBus } from "@/phaser/EventBus";
import { EDITOR_SCENE_KEY } from '@/phaser/scenes/EditorScene';
import type EditorScene from '@/phaser/scenes/EditorScene';
import type { Game } from 'phaser';
import { useEditorStore } from '@/stores/editorStore';
import GameScene, { GAME_SCENE_KEY } from "@/phaser/scenes/GameScene";

// the React hooks in this component are written in order of their actual execution.
const PhaserGame = () => {
  const isConverting = useEditorStore((state) => state.isConverting);
  const internalGameRef = useRef<Game | null>(null);

  useLayoutEffect(() => {
    if (!internalGameRef.current)
      internalGameRef.current = StartGame('game-container');
  }, []);

  useEffect(() => {
    // this scene event listener will live until this Phaser react component has been torn down
    const handler = (scene: Phaser.Scene | EditorScene) => {
      if (!('key' in scene) || !(scene.key == EDITOR_SCENE_KEY || scene.key == GAME_SCENE_KEY)) return;
      useEditorStore.getState().setPhaserRef({
        game: internalGameRef.current as Game,
        scene: scene as unknown as EditorScene | GameScene,
      });
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

export default PhaserGame;
