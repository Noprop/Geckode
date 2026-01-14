import Phaser from 'phaser';
import { EventBus } from '@/phaser/EventBus';
import type { SpriteInstance } from '@/blockly/spriteRegistry';

export const GAME_SCENE_KEY = 'GameScene' as const;
import EDITOR_SCENE_KEY from '@/phaser/scenes/EditorScene';

type SandboxContext = {
  scene: GameScene;
  phaser: typeof Phaser;
  console: Console; // you can swap this with a logger collector if you want
};

// Utility to create an async function at runtime.
const AsyncFunction = Object.getPrototypeOf(async function () {})
  .constructor as new (...args: string[]) => (...args: any[]) => Promise<any>;

export default class GameScene extends Phaser.Scene {
  public key: string;
  public player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  private gameSprites = new Map<string, Phaser.Physics.Arcade.Sprite>();
  private static readonly GAME_SPRITE_BASE_DEPTH = Number.MAX_SAFE_INTEGER - 100;
  private gameLayer!: Phaser.GameObjects.Layer;
  private activeDrag: {
    sprite: Phaser.Physics.Arcade.Sprite;
    start: { x: number; y: number };
    lastWorld: { x: number; y: number };
  } | null = null;
  private gridGraphics: Phaser.GameObjects.Graphics | null = null;

  constructor() {
    super(GAME_SCENE_KEY);
    this.key = GAME_SCENE_KEY;
  }

  preload() {}

  public changeScene() {
    this.scene.start(EDITOR_SCENE_KEY as unknown as string);
  }

  create(data: {
    spriteInstances: SpriteInstance[];
    textures: Map<string, { name: string; file: string }>;
    code: string;
  }) {
    console.log('[GameScene] create called', data);

    this.cursors = this.input.keyboard?.createCursorKeys()!;
    this.wasd = this.input.keyboard?.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
    }) as unknown as typeof this.wasd;

    // Dedicated layer to keep editor sprites above all game objects.
    this.gameLayer = this.add.layer();
    this.gameLayer.setDepth(GameScene.GAME_SPRITE_BASE_DEPTH);

    for (const instance of data.spriteInstances) {
      const textureName = instance.textureName;
      this.addGameSprite(textureName, instance.x, instance.y, instance.id);
    }

    // Execute the Blockly-generated code
    if (data.code) {
      this.runScript(data.code);
    }

    // Tell React which scene is active (will trigger pause state sync)
    EventBus.emit('current-scene-ready', this);

    this.startHook();
  }

  startHook() {}
  update() {}

  /**
   * TODO: Implement pause handler
   */
  // private pauseHandler = (isPaused: boolean) => {
  //   console.log('[MainMenu] editor-pause-changed received:', isPaused);
  //   if (isPaused) {
  //     this.showGrid();
  //   } else {
  //     this.hideGrid();
  //   }
  // };

  public addGameSprite(texture: string, x: number, y: number, id: string) {
    console.log('[GameScene] addGameSprite called', texture, x, y, id);
    const sprite = this.physics.add.sprite(x, y, texture);
    sprite.setName(id);
    sprite.setData('gameSpriteId', id);
    sprite.setDepth(GameScene.GAME_SPRITE_BASE_DEPTH);
    this.gameLayer.add(sprite);
    this.gameLayer.bringToTop(sprite);
    this.gameSprites.set(id, sprite);
    return sprite;
  }

  public removeGameSprite(id: string) {
    const sprite = this.gameSprites.get(id);
    if (!sprite) return;
    sprite.destroy();
    this.gameSprites.delete(id);
  }

  public getSprite(id: string) {
    return this.gameSprites.get(id);
  }

  /**
   * Execute arbitrary JS in a constrained context.
   * Example code string:
   *   "console.log('wow'); await api.wait(250); api.moveBy(50, -20);"
   */
  public async runScript(code: string): Promise<any> {
    const ctx: SandboxContext = {
      scene: this,
      phaser: Phaser,
      console: console, // replace with your own logger if desired
    };

    // The function receives named parameters matching keys of `ctx`.
    // It returns an awaited result of the user's script.
    const argNames = Object.keys(ctx); // ['api','scene','phaser','console']
    const argValues = Object.values(ctx);

    // console.log('[GameScene] runScript called', code);
    // console.log('[GameScene] runScript called', argNames, argValues);

    // Wrap user code in an async IIFE so `await` works at top level.
    // Skip scene restart when paused (editor mode) to preserve grid
    const wrapped = `
      "use strict";
      return (async () => {
        ${code}
      })();
    `;

    try {
      const fn = new AsyncFunction(...argNames, wrapped);
      const result = await fn(...argValues);
      //return result;
    } catch (err) {
      // Surface a readable error back to caller/React UI
      const message = err instanceof Error ? err.message : String(err);
      console.error('[runScript error]', err);
      throw new Error(`runScript failed: ${message}`);
    }
  }
}
