"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "@/phaser/phaserConfig";
import { EventBus } from '@/phaser/EventBus';
import type EditorScene from '@/phaser/scenes/EditorScene';
import { useEditorStore } from '@/stores/editorStore';
import GameScene from '@/phaser/scenes/GameScene';

// the React hooks in this component are written in order of their actual execution.
const PhaserGame = () => {
  const isConverting = useEditorStore((state) => state.isConverting);
  const phaserRef = useRef<Phaser.Game | null>(null);

  // Update store when Phaser scene becomes ready
  useEffect(() => {
    const handler = (scene: EditorScene | GameScene) => {
      useEditorStore.getState().setPhaserScene(scene);
      // Send current pause state to newly ready scene (listener is already set up)
      const isEditorScene = useEditorStore.getState().isEditorScene;
      EventBus.emit('editor-scene-changed', isEditorScene);
    };

    EventBus.on('current-scene-ready', handler);
    return () => {
      EventBus.off('current-scene-ready', handler);
    };
  }, []);

  useLayoutEffect(() => {
    // start the Phaser game before React renders the first frame
    if (!phaserRef.current) {
      phaserRef.current = StartGame('game-container');
      useEditorStore.getState().setPhaserGame(phaserRef.current);
    }
    const handler = (scene: EditorScene | GameScene) => useEditorStore.getState().setPhaserScene(scene);

    EventBus.on('current-scene-ready', handler);
    return () => void EventBus.off('current-scene-ready', handler);
  }, []);

  useEffect(() => {
    const container = document.getElementById('game-container') as HTMLDivElement;
    const keyboard = phaserRef.current?.input?.keyboard;
    if (!container || !keyboard) throw new Error('Game container or keyboard not found');

    const handleDocumentPointerDown = (event: PointerEvent) => {
      if (!container.contains(event.target as Node) && keyboard.enabled) keyboard.enabled = false;
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

    return () => void document.removeEventListener('pointerdown', handleDocumentPointerDown);
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
