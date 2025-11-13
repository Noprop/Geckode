// game/scenes/MainMenu.ts
import Phaser from 'phaser';
import { EventBus } from '@/phaser/EventBus';

export const MAIN_MENU_SCENE_KEY = 'MainMenu' as const;

type PosCB = (pos: { x: number; y: number }) => void;

export type GameAPI = {
  moveBy: (dx: number, dy: number) => void;
  addStar: () => void;
  wait: (ms: number) => Promise<void>;
  stopAll: () => void;
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
  private posCB?: PosCB;
  private lastSent = { x: -1, y: -1 };
  private editorSprites = new Map<string, Phaser.Physics.Arcade.Sprite>();

  constructor() {
    super(MAIN_MENU_SCENE_KEY);
    this.key = MAIN_MENU_SCENE_KEY;
  }

  preload() {
    // Ensure you have a sprite/atlas loaded; example:
    // this.load.image('star', 'assets/star.png');
  }

  public changeScene() {
    this.scene.start('Game');
  }

  create() {
    this.editorSprites.clear();
    // Create a physics-enabled sprite
    this.player = this.physics.add.sprite(400, 300, 'star');
    this.player.setCollideWorldBounds(true);

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

    // Tell React which scene is active
    EventBus.emit('current-scene-ready', this);

    this.start();
  }

  start() {}

  /**
   * Keep your existing React contract:
   * Home.tsx calls scene.moveLogo(cb => setSpritePosition(cb))
   * We store the callback and call it whenever the sprite position changes.
   */
  public moveLogo(cb: PosCB) {
    this.posCB = cb;
    // Send an initial position immediately
    this.posCB?.({
      x: Math.round(this.player.x),
      y: Math.round(this.player.y),
    });
  }

  /**
   * Optional: If you already have addStar() wired from React, keep it.
   */
  public addStar() {
    const x = Phaser.Math.Between(50, 750);
    const y = Phaser.Math.Between(50, 550);
    this.physics.add.sprite(x, y, 'star');
  }

  public addSpriteFromEditor(
    texture: string,
    x: number,
    y: number,
    id: string
  ) {
    const sprite = this.physics.add.sprite(x, y, texture);
    sprite.setName(id);
    sprite.setData('editorSpriteId', id);
    this.editorSprites.set(id, sprite);
    return sprite;
  }

  public removeEditorSprite(id: string) {
    const sprite = this.editorSprites.get(id);
    if (!sprite) return;
    sprite.destroy();
    this.editorSprites.delete(id);
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
    //   this.posCB({ x: px, y: py });
    //   this.lastSent = { x: px, y: py };
    // }
  }

  private buildAPI(): GameAPI {
    return {
      moveBy: (dx: number, dy: number) => {
        if (!this.player) return;
        this.player.setX(this.player.x + dx);
        this.player.setY(this.player.y + dy);
      },
      addStar: () => this.addStar(),
      wait: (ms: number) => new Promise((r) => setTimeout(r, ms)),
      stopAll: () => {
        if (!this.player) return;
        this.player.setVelocity(0, 0);
      },
    };
  }

  /**
   * Execute arbitrary JS in a constrained context.
   * Example code string:
   *   "console.log('wow'); await api.wait(250); api.moveBy(50, -20);"
   */
  public async runScript(code: string): Promise<any> {
    //this.player.setVelocity(20, 0);
    // @ts-ignore
    console.log('this.test: ', this.test);
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
    const wrapped = `
      "use strict";
      return (async () => {
        ${code}
        scene.scene.restart();
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
