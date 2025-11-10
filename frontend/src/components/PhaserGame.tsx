"use client";

import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
} from "react";
import StartGame from "@/phaser/main";
import { EventBus } from "@/phaser/EventBus";

type SceneApi = any; // tighten to your scene type if you have it
type ExposedRef = { game?: any; scene?: SceneApi };
type Props = { currentActiveScene?: (scene: SceneApi) => void };

const PhaserGame = forwardRef<ExposedRef, Props>(function PhaserGame(
  { currentActiveScene },
  ref
) {
  const gameRef = useRef<any>(null);

  useImperativeHandle(
    ref,
    () => ({ game: gameRef.current, scene: undefined }),
    []
  );

  useLayoutEffect(() => {
    if (!gameRef.current) {
      gameRef.current = StartGame("game-container");
    }
    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    const handler = (currentScene: SceneApi) => {
      currentActiveScene?.(currentScene);
      (ref as any).current.scene = currentScene;
    };
    EventBus.on("current-scene-ready", handler);
    return () => {
      EventBus.removeListener("current-scene-ready", handler);
    };
  }, [currentActiveScene, ref]);

  return <div id="game-container" className="h-96" />;
});

export default PhaserGame;
