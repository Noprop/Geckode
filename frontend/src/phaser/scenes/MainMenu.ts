// game/scenes/MainMenu.ts
import Phaser from 'phaser';
import { EventBus } from '@/phaser/EventBus';

export const MAIN_MENU_SCENE_KEY = 'MainMenu' as const;

type PosCB = (pos: { x: number; y: number }) => void;

export type GameAPI = {
  moveBy: (dx: number, dy: number) => void;
  createPlayer: (xPos: number|null, yPos: number|null, starKey: string|null) => void;
  addStar: (xPos: number|null, yPos: number|null, starKey: string|null) => void;
  addSpriteFromEditor: (texture: string, x: number, y: number, id: string) => void;
  removeEditorSprite: (id: string) => void;
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
  private static readonly EDITOR_SPRITE_BASE_DEPTH = Number.MAX_SAFE_INTEGER - 100;
  private editorLayer!: Phaser.GameObjects.Layer;
  private activeDrag:
    | {
        sprite: Phaser.Physics.Arcade.Sprite;
        start: { x: number; y: number };
        lastWorld: { x: number; y: number };
      }
    | null = null;

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

    // Dedicated layer to keep editor sprites above all game objects.
    this.editorLayer = this.add.layer();
    this.editorLayer.setDepth(MainMenu.EDITOR_SPRITE_BASE_DEPTH);

    this.start()
    this.registerDragEvents();
  }

  public createPlayer(xPos: number|null, yPos: number|null, starKey: string|null) {
    const x = xPos ? xPos : 400;
    const y = yPos ? yPos : 300;
    const key = starKey ? starKey : 'player'
    
    // Create a physics-enabled sprite
    this.player = this.physics.add.sprite(x, y, key);
    this.player.name = 'player';
    this.player.setCollideWorldBounds(true);
  }

  start(){
  }

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
  public addStar(xPos: number|null = null, yPos: number|null = null, starKey: string|null = null) {
    const x = xPos ? xPos :Phaser.Math.Between(50, 750);
    const y = yPos ? yPos : Phaser.Math.Between(50, 550);
    const key = starKey ? starKey : 'star'
    this.physics.add.sprite(x, y, key);
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
    sprite.setDepth(MainMenu.EDITOR_SPRITE_BASE_DEPTH);
    this.editorLayer.add(sprite);
    this.editorLayer.bringToTop(sprite);
    this.enableSpriteDragging(sprite);
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
    //   console.log('update position');
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
      createPlayer: (xPos, yPos, starKey) => this.createPlayer(xPos, yPos, starKey),
      addStar: (xPos, yPos, starKey) => this.addStar(xPos, yPos, starKey),
      addSpriteFromEditor: (texture: string, x: number, y: number, id: string) => this.addSpriteFromEditor(texture, x, y, id),
      removeEditorSprite: (id: string) => this.removeEditorSprite(id),
      wait: (ms: number) => new Promise((r) => setTimeout(r, ms)),
      stopAll: () => {
        if (!this.player) return;
        this.player.setVelocity(0, 0);
      },
    };
  }

  private enableSpriteDragging(sprite: Phaser.Physics.Arcade.Sprite) {
    sprite.setInteractive({ cursor: 'grab' });
    this.input.setDraggable(sprite);
  }

  private registerDragEvents() {
    this.input.dragDistanceThreshold = 0;

    this.input.on(
      'dragstart',
      (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
        const sprite = gameObject as Phaser.Physics.Arcade.Sprite;
        const editorId = sprite.getData('editorSpriteId');
        if (!editorId) return;
        this.activeDrag = {
          sprite,
          start: { x: sprite.x, y: sprite.y },
          lastWorld: { x: sprite.x, y: sprite.y },
        };
        sprite.setDepth(MainMenu.EDITOR_SPRITE_BASE_DEPTH);
        this.editorLayer.bringToTop(sprite);
        this.attachGlobalDragListeners();
      }
    );

    this.input.on(
      'drag',
      (pointer: Phaser.Input.Pointer) => {
        this.updateDragPositionFromEvent(pointer.event as PointerEvent | undefined, pointer);
      }
    );

    this.input.on(
      'dragend',
      (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.GameObject,
        _dragX: number,
        _dragY: number
      ) => {
        this.finishActiveDrag(pointer.event as PointerEvent | undefined);
      }
    );
  }

  private attachGlobalDragListeners() {
    if (typeof window === 'undefined') return;
    window.addEventListener('pointermove', this.handleGlobalPointerMove, { capture: true });
    window.addEventListener('pointerup', this.handleGlobalPointerUp, { capture: true });
  }

  private detachGlobalDragListeners() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('pointermove', this.handleGlobalPointerMove, { capture: true });
    window.removeEventListener('pointerup', this.handleGlobalPointerUp, { capture: true });
  }

  private handleGlobalPointerMove = (event: PointerEvent) => {
    this.updateDragPositionFromEvent(event, undefined);
  };

  private handleGlobalPointerUp = (event: PointerEvent) => {
    this.finishActiveDrag(event);
  };

  private updateDragPositionFromEvent(
    event?: PointerEvent,
    pointer?: Phaser.Input.Pointer
  ) {
    if (!this.activeDrag || !event) {
      // Fallback to pointer coords if available (still keeps integers to avoid blur).
      if (!this.activeDrag || !pointer) return;
      const roundedX = Math.round(pointer.worldX);
      const roundedY = Math.round(pointer.worldY);
      this.activeDrag.sprite.setPosition(roundedX, roundedY);
      this.activeDrag.lastWorld = { x: roundedX, y: roundedY };
      return;
    }

    const rect = this.game.canvas.getBoundingClientRect();
    const scaleX = this.scale.width / rect.width;
    const scaleY = this.scale.height / rect.height;
    const worldX = (event.clientX - rect.left) * scaleX;
    const worldY = (event.clientY - rect.top) * scaleY;
    const roundedX = Math.round(worldX);
    const roundedY = Math.round(worldY);

    this.activeDrag.sprite.setPosition(roundedX, roundedY);
    this.activeDrag.lastWorld = { x: roundedX, y: roundedY };
  }

  private finishActiveDrag(event?: PointerEvent) {
    if (!this.activeDrag) return;
    // Ensure we have latest position before deciding.
    this.updateDragPositionFromEvent(event);

    const { sprite, start, lastWorld } = this.activeDrag;
    const withinX = lastWorld.x >= 0 && lastWorld.x <= this.scale.width;
    const withinY = lastWorld.y >= 0 && lastWorld.y <= this.scale.height;

    if (!withinX || !withinY) {
      sprite.setPosition(start.x, start.y);
    } else {
      const finalX = Phaser.Math.Clamp(lastWorld.x, 0, this.scale.width);
      const finalY = Phaser.Math.Clamp(lastWorld.y, 0, this.scale.height);
      const snappedX = Math.round(finalX);
      const snappedY = Math.round(finalY);
      sprite.setPosition(snappedX, snappedY);
      this.editorLayer.bringToTop(sprite);
      EventBus.emit('editor-sprite-moved', {
        id: sprite.getData('editorSpriteId'),
        x: snappedX,
        y: snappedY,
      });
    }

    sprite.setDepth(MainMenu.EDITOR_SPRITE_BASE_DEPTH);
    this.activeDrag = null;
    this.detachGlobalDragListeners();
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
