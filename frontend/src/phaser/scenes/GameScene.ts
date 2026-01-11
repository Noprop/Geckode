// game/scenes/MainMenu.ts
import Phaser from 'phaser';
import { EventBus } from '@/phaser/EventBus';

export const MAIN_MENU_SCENE_KEY = 'MainMenu' as const;

type PosCB = (pos: { x: number; y: number }) => void;

export type GameAPI = {
  addGameSprite: (texture: string, x: number, y: number, id: string) => void;
  removeGameSprite: (id: string) => void;
  updateGameSprite: (
    id: string,
    updates: {
      x?: number;
      y?: number;
      visible?: boolean;
      size?: number;
      direction?: number;
    }
  ) => void;
  wait: (ms: number) => Promise<void>;
};

type SandboxContext = {
  api: GameAPI;
  scene: MainMenu;
  phaser: typeof Phaser;
  console: Console; // you can swap this with a logger collector if you want
};

// Utility to create an async function at runtime.
const AsyncFunction = Object.getPrototypeOf(async function () {})
  .constructor as new (...args: string[]) => (...args: any[]) => Promise<any>;

export default class MainMenu extends Phaser.Scene {
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
  private static readonly GAME_SPRITE_BASE_DEPTH =
    Number.MAX_SAFE_INTEGER - 100;
  private gameLayer!: Phaser.GameObjects.Layer;
  private activeDrag: {
    sprite: Phaser.Physics.Arcade.Sprite;
    start: { x: number; y: number };
    lastWorld: { x: number; y: number };
  } | null = null;
  private gridGraphics: Phaser.GameObjects.Graphics | null = null;

  constructor() {
    super(MAIN_MENU_SCENE_KEY);
    this.key = MAIN_MENU_SCENE_KEY;
  }

  preload() {}

  public changeScene() {
    this.scene.start('Game');
  }

  create() {
    this.gameSprites.clear();
    // Cursor keys
    // @ts-ignore
    this.cursors = this.input.keyboard.createCursorKeys();

    // WASD keys
    // @ts-ignore
    this.wasd = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
    }) as unknown as typeof this.wasd;

    // Dedicated layer to keep editor sprites above all game objects.
    this.gameLayer = this.add.layer();
    this.gameLayer.setDepth(MainMenu.GAME_SPRITE_BASE_DEPTH);

    this.start();

    // Tell React which scene is active (will trigger pause state sync)
    EventBus.emit('current-scene-ready', this);
  }

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

  start() {}

  public updateGameSprite(id: string, updates: { x?: number; y?: number }) {
    const sprite = this.gameSprites.get(id);
    if (!sprite) return;
    sprite.setX(updates.x);
    sprite.setY(updates.y);
  }

  public addGameSprite(texture: string, x: number, y: number, id: string) {
    const sprite = this.physics.add.sprite(x, y, texture);
    sprite.setName(id);
    sprite.setData('gameSpriteId', id);
    sprite.setDepth(MainMenu.GAME_SPRITE_BASE_DEPTH);
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

  update() {
    // if (!this.player) return;
    // const speed = 200;
    // // Reset velocity each frame, then set based on input
    // this.player.setVelocity(0);
    // const left = this.cursors.left?.isDown || this.wasd.A.isDown;
    // const right = this.cursors.right?.isDown || this.wasd.D.isDown;
    // const up = this.cursors.up?.isDown || this.wasd.W.isDown;
    // const down = this.cursors.down?.isDown || this.wasd.S.isDown;
    // if (left) this.player.setVelocityX(-speed);
    // if (right) this.player.setVelocityX(speed);
    // if (up) this.player.setVelocityY(-speed);
    // if (down) this.player.setVelocityY(speed);
    // // Normalize diagonal speed
    // if ((left || right) && (up || down) && this.player.body) {
    //   this.player.setVelocity(
    //     this.player.body.velocity.x * 0.7071,
    //     this.player.body.velocity.y * 0.7071
    //   );
    // }
    // // Publish position only when it changes (avoids spamming React state)
    // const px = Math.round(this.player.x);
    // const py = Math.round(this.player.y);
    // if ((px !== this.lastSent.x || py !== this.lastSent.y) && this.posCB) {
    //   console.log('update position');
    //   this.posCB({ x: px, y: py });
    //   this.lastSent = { x: px, y: py };
    // }
  }

  private buildAPI(): GameAPI {
    return {
      addGameSprite: (texture: string, x: number, y: number, id: string) =>
        this.addGameSprite(texture, x, y, id),
      removeGameSprite: (id: string) => this.gameSprites.delete(id),
      updateGameSprite: (id: string, updates: { x?: number; y?: number }) =>
        this.updateGameSprite(id, updates),
      wait: (ms: number) => new Promise((r) => setTimeout(r, ms)),
    };
  }

  /**
   * Execute arbitrary JS in a constrained context.
   * Example code string:
   *   "console.log('wow'); await api.wait(250); api.moveBy(50, -20);"
   */
  public async runScript(code: string): Promise<any> {
    const ctx: SandboxContext = {
      api: this.buildAPI(),
      scene: this,
      phaser: Phaser,
      console: console, // replace with your own logger if desired
    };

    // The function receives named parameters matching keys of `ctx`.
    // It returns an awaited result of the user's script.
    const argNames = Object.keys(ctx); // ['api','scene','phaser','console']
    const argValues = Object.values(ctx);

    // Wrap user code in an async IIFE so `await` works at top level.
    // Skip scene restart when paused (editor mode) to preserve grid
    const wrapped = `
      "use strict";
      return (async () => {
        ${code}
        if (!scene.game.isPaused) {
          scene.scene.restart();
        }
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
