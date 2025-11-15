"use client";

import { useEffect, useLayoutEffect, useRef, useImperativeHandle } from "react";
import StartGame from "@/phaser/phaserConfig";
import { EventBus } from "@/phaser/EventBus";
import { MAIN_MENU_SCENE_KEY } from "@/phaser/scenes/MainMenu";
import type MainMenu from "@/phaser/scenes/MainMenu";
import type { Game } from "phaser";
import { loadPhaserState, PhaserExport } from "@/phaser/PhaserStateManager";

type Props = {
  ref: any;
  phaserState: PhaserExport | null;
};

// the React hooks in this component are written in order of their actual execution.
const PhaserGame = ({ ref, phaserState }: Props) => {
  const gameRef = useRef<Game | null>(null);

  useLayoutEffect(() => {
    if (!gameRef.current) gameRef.current = StartGame("game-container");
  }, []);

  useImperativeHandle(
    ref,
    () => {
      console.log("useImperativeHandle(), ", gameRef);
      return {
        game: gameRef.current,
        scene: null,
      };
    },
    []
  );

  useEffect(() => {
    // this scene event listener will live until this Phaser react component has been torn down
    const handler = (scene: Phaser.Scene | MainMenu) => {
      if (!("key" in scene) || !(scene.key == MAIN_MENU_SCENE_KEY)) return;
      ref.current.scene = scene;
    };
    EventBus.on("current-scene-ready", handler);

    return () => {
      EventBus.off("current-scene-ready", handler);
    };
  }, []);

  useEffect(() => {
    const handler = (currentScene: any) => {
      if (phaserState && Object.keys(phaserState).length > 0)
        loadPhaserState((ref as any).current, phaserState);
      else (ref as any).current.scene.createPlayer();
    };
    EventBus.on("current-scene-ready", handler);
    return () => {
      EventBus.removeListener("current-scene-ready", handler);
    };
  }, [ref]);

  return <div id="game-container" className="h-96" />;
};

export default PhaserGame;
