"use client";

import { useEffect, useLayoutEffect, useRef, useImperativeHandle } from 'react';
import StartGame from '@/phaser/main';
import { EventBus } from '@/phaser/EventBus';
import { MAIN_MENU_SCENE_KEY } from '@/phaser/scenes/MainMenu';
import type MainMenu from '@/phaser/scenes/MainMenu';

type PhaserInstance = ReturnType<typeof StartGame>;

// the React hooks in this component are written in order of their actual execution.
const PhaserGame = ({ ref }: any) => {
  const gameRef = useRef<PhaserInstance | null>(null);

  useLayoutEffect(() => {
    if (!gameRef.current) gameRef.current = StartGame('game-container');
  }, []);

  useImperativeHandle(
    ref,
    () => {
      console.log('useImperativeHandle(), ', gameRef);
      return {
        game: gameRef.current,
        scene: null,
      };
    },
    []
  );

  useEffect(() => {
    // this scene event listener will live until this
    // Phaser react component has been torn down
    const handler = (scene: Phaser.Scene | MainMenu) => {
      if (!('key' in scene) || !(scene.key == MAIN_MENU_SCENE_KEY)) return;
      ref.scene = scene;
      ref.current.scene = scene;
    };
    EventBus.on('current-scene-ready', handler);

    return () => {
      EventBus.off('current-scene-ready', handler);
    };
  }, []);

  return <div id="game-container" className="h-96" />;
};

export default PhaserGame;
