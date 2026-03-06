"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "@/phaser/phaserConfig";
import { EventBus } from '@/phaser/EventBus';
import type EditorScene from '@/phaser/scenes/EditorScene';
import { useGeckodeStore } from '@/stores/geckodeStore';
import GameScene from '@/phaser/scenes/GameScene';
import { EDITOR_SCENE_KEY } from '@/phaser/sceneKeys';
import * as Blockly from 'blockly/core';

const PhaserGame = () => {
  const isConverting = useGeckodeStore((state) => state.isConverting);
  const canEditProject = useGeckodeStore((state) => state.canEditProject);
  const phaserRef = useRef<Phaser.Game | null>(null);

  useLayoutEffect(() => {
    // start the Phaser game before React renders the first frame
    if (!phaserRef.current) {
      phaserRef.current = StartGame('game-container');
      useGeckodeStore.getState().setPhaserGame(phaserRef.current);
    }
    const handler = (scene: EditorScene | GameScene) => useGeckodeStore.getState().setPhaserScene(scene);

    EventBus.on('current-scene-ready', handler);
    return () => void EventBus.off('current-scene-ready', handler);
  }, []);

  useEffect(() => {
    const handler = (scene: EditorScene | GameScene) => {
      useGeckodeStore.getState().setPhaserScene(scene);
      // Send current pause state to newly ready scene (listener is already set up)
      const isEditorScene = useGeckodeStore.getState().isEditorScene;
      EventBus.emit('editor-scene-changed', isEditorScene);
      if (scene.key === EDITOR_SCENE_KEY) {
        (scene as EditorScene).setSpritesDraggable(useGeckodeStore.getState().canEditProject);
      }
    };

    EventBus.on('current-scene-ready', handler);
    return () => {
      EventBus.off('current-scene-ready', handler);
    };
  }, []);

  useEffect(() => {
    const scene = useGeckodeStore.getState().phaserScene;
    if (scene?.key === EDITOR_SCENE_KEY) {
      // Refresh the editor scene so sprites + cursors are fully reinitialized
      // with the current canEditProject state (avoids stale cursor state).
      scene.scene.restart();
    }
  }, [canEditProject]);

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
    <div
      className="relative flex justify-center rounded-md"
      style={{ width: "480px", marginLeft: "10px", marginRight: "10px", marginTop: "10px" }}
      onPointerDown={() => {
        if (typeof Blockly.hideChaff === 'function') Blockly.hideChaff();
        (document.getElementById('game-container') as HTMLElement).focus();
      }}
    >
      <div
        id="game-container"
        tabIndex={0}
        className="rounded-sm overflow-hidden outline-none ring-0 focus:ring-2 focus:ring-primary-green transition-all duration-75"
        style={{
          width: '480px',
          height: '360px',
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
