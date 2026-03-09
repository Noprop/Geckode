"use client";

import { useEffect, useRef } from "react";
import { useWorkspaceSync } from "@/hooks/yjs/useWorkspaceSync";
import { useGeckodeStore } from "@/stores/geckodeStore";
import { buildPhaserRuntimeCodeFromOutputs } from "@/phaser/runtimeCode";
import { GAME_SCENE_KEY } from "@/phaser/sceneKeys";

export const SHARE_DOC_PREFIX = "share-";

interface ShareGameLoaderProps {
  /** Document name already registered via registerShareDoc (e.g. "share-{token}") */
  documentName: string;
  onError: (message: string) => void;
}

/**
 * Syncs workspaces from the pre-registered Yjs doc (reusing editor logic), generates code from blocks,
 * then starts Phaser. Same minimal payload as editor toggleEditor: sprites, textures, code.
 * GameScene reads tilemaps, tiles, etc. from the store (already populated by sync).
 */
export function ShareGameLoader({ documentName, onError }: ShareGameLoaderProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const startedRef = useRef(false);

  useWorkspaceSync(documentName);

  const spriteInstances = useGeckodeStore((s) => s.spriteInstances);
  const textures = useGeckodeStore((s) => s.textures);
  const markSpriteAsUpdated = useGeckodeStore((s) => s.markSpriteAsUpdated);
  const generateCode = useGeckodeStore((s) => s.generateCode);

  useEffect(() => {
    if (startedRef.current || spriteInstances.length === 0) return;

    let cancelled = false;

    const startGame = async () => {
      try {
        spriteInstances.forEach((s) => markSpriteAsUpdated(s.id));
        generateCode();

        const outputs = spriteInstances.map((s) => useGeckodeStore.getState().spriteOutputs[s.id]);
        const code = buildPhaserRuntimeCodeFromOutputs(outputs);

        if (cancelled) {
          return;
        }

        const { default: StartPlayGame } = await import("@/phaser/playConfig");
        if (cancelled) {
          return;
        }

        const game = StartPlayGame("phaser-container");
        if (cancelled) {
          game.destroy(true);
          return;
        }

        gameRef.current = game;
        game.scene.start(GAME_SCENE_KEY, {
          spriteInstances,
          textures,
          code,
        });
        startedRef.current = true;
      } catch (e) {
        console.error(e);
        onError("Failed to start game.");
      }
    };

    void startGame();

    return () => {
      cancelled = true;
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      startedRef.current = false;
    };
  }, [spriteInstances, markSpriteAsUpdated, generateCode, textures, onError]);

  return null;
}
