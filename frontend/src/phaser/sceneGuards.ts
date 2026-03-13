import type EditorScene from "./scenes/EditorScene";
import type GameScene from "./scenes/GameScene";
import { EDITOR_SCENE_KEY, GAME_SCENE_KEY } from "./sceneKeys";

export type AnyScene = EditorScene | GameScene | null | undefined;

export function isEditorScene(scene: AnyScene): scene is EditorScene {
  return !!scene && scene.scene?.key === EDITOR_SCENE_KEY;
}

export function isGameScene(scene: AnyScene): scene is GameScene {
  return !!scene && scene.scene?.key === GAME_SCENE_KEY;
}

