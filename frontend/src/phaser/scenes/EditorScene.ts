// game/scenes/MainMenu.ts
import Phaser from 'phaser';
import { EventBus } from '@/phaser/EventBus';
import { useEditorStore } from '@/stores/editorStore';

export const MAIN_MENU_SCENE_KEY = 'MainMenu' as const;

type PosCB = (pos: { x: number; y: number }) => void;

// export type GameAPI = {
//   createSprite: (texture: string, x: number, y: number, id: string) => void;
//   removeSprite: (id: string) => void;
//   updateSprite: (
//     id: string,
//     updates: {
//       x?: number;
//       y?: number;
//       visible?: boolean;
//       size?: number;
//       direction?: number;
//     }
//   ) => void;
// };

type SandboxContext = {
  // api: GameAPI;
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
  private static readonly EDITOR_SPRITE_BASE_DEPTH =
    Number.MAX_SAFE_INTEGER - 100;
  private editorLayer!: Phaser.GameObjects.Layer;
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

  preload() {
    // Ensure you have a sprite/atlas loaded; example:
    // this.load.image('star', 'assets/star.png');
    // this.load.image('hero-walk-front2', '/heroWalkFront1.bmp');

    const textures = useEditorStore.getState().textures;
    for (const texture of textures.values()) {
      this.load.image(texture.name, texture.file);
    }
  }

  public changeScene() {
    this.scene.start('Game');
  }

  async create() {
    this.editorSprites.clear();
    this.gridGraphics = null; // Reset on scene restart
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
    this.editorLayer = this.add.layer();
    this.editorLayer.setDepth(MainMenu.EDITOR_SPRITE_BASE_DEPTH);

    this.start();
    this.registerDragEvents();

    // Set up pause state listener for grid visibility BEFORE telling React scene is ready
    this.setupGridListener();
    try {
      await this.load.image('hero-walk-front2', '/heroWalkFront1.bmp');
    } catch (error) {
      console.error('Error loading image', error);
    }

    const spriteInstances = useEditorStore.getState().spriteInstances;
    const textures = useEditorStore.getState().textures;
    for (const instance of spriteInstances) {
      this.createSprite(
        textures.get(instance.tid)?.name || '',
        instance.x,
        instance.y,
        instance.id
      );
    }

    // Tell React which scene is active (will trigger pause state sync)
    EventBus.emit('current-scene-ready', this);
  }

  private pauseHandler = (isPaused: boolean) => {
    console.log('[MainMenu] editor-pause-changed received:', isPaused);
    if (isPaused) {
      this.showGrid();
    } else {
      this.hideGrid();
    }
  };

  private setupGridListener(): void {
    // Remove existing listener to prevent duplicates on scene restart
    EventBus.off('editor-pause-changed', this.pauseHandler);

    console.log('[MainMenu] setting up editor-pause-changed listener');
    EventBus.on('editor-pause-changed', this.pauseHandler);
  }

  start() {}

  public createSprite(texture: string, x: number, y: number, id: string) {
    const sprite = this.physics.add.sprite(x, y, texture);
    sprite.setName(id);
    sprite.setData('editorSpriteId', id);
    sprite.setDepth(MainMenu.EDITOR_SPRITE_BASE_DEPTH);
    this.editorLayer.add(sprite);
    this.editorLayer.bringToTop(sprite);
    this.enableSpriteDragging(sprite);
    this.editorSprites.set(id, sprite);

    console.log('actual name: ', sprite.name, id);

    // TODO: Add collision detection
    // this.player.setCollideWorldBounds(true);

    return sprite;
  }

  public removeSprite(id: string) {
    const sprite = this.editorSprites.get(id);
    if (!sprite) return;
    sprite.destroy();
    this.editorSprites.delete(id);
  }

  public updateSprite(
    id: string,
    updates: {
      x?: number;
      y?: number;
      visible?: boolean;
      size?: number;
      direction?: number;
    }
  ) {
    const sprite = this.editorSprites.get(id);
    console.log('updateSprite()', sprite);
    if (!sprite) return;

    if (updates.x !== undefined) {
      sprite.setX(updates.x);
    }
    if (updates.y !== undefined) {
      sprite.setY(updates.y);
    }
    if (updates.visible !== undefined) {
      sprite.setVisible(updates.visible);
    }
    if (updates.size !== undefined) {
      // Size is a percentage (100 = 100% = scale 1)
      const scale = updates.size / 100;
      sprite.setScale(scale);
    }
    if (updates.direction !== undefined) {
      // Direction in degrees, Phaser uses angle property
      sprite.setAngle(updates.direction - 90); // Scratch-style: 90 = right, convert to Phaser
    }
  }

  private drawGrid(): void {
    const width = 480;
    const height = 360;
    const gridSpacing = 50;
    const centerX = 240;
    const centerY = 180;

    if (!this.gridGraphics) {
      this.gridGraphics = this.add.graphics();
      this.gridGraphics.setDepth(Number.MAX_SAFE_INTEGER);
    }

    this.gridGraphics.clear();

    // Thin grid lines radiating from center
    this.gridGraphics.lineStyle(1, 0xffffff, 0.3);

    // Vertical lines from center outward
    for (let x = centerX - gridSpacing; x >= 0; x -= gridSpacing) {
      this.gridGraphics.beginPath();
      this.gridGraphics.moveTo(x, 0);
      this.gridGraphics.lineTo(x, height);
      this.gridGraphics.strokePath();
    }
    for (let x = centerX + gridSpacing; x <= width; x += gridSpacing) {
      this.gridGraphics.beginPath();
      this.gridGraphics.moveTo(x, 0);
      this.gridGraphics.lineTo(x, height);
      this.gridGraphics.strokePath();
    }

    // Horizontal lines from center outward
    for (let y = centerY - gridSpacing; y >= 0; y -= gridSpacing) {
      this.gridGraphics.beginPath();
      this.gridGraphics.moveTo(0, y);
      this.gridGraphics.lineTo(width, y);
      this.gridGraphics.strokePath();
    }
    for (let y = centerY + gridSpacing; y <= height; y += gridSpacing) {
      this.gridGraphics.beginPath();
      this.gridGraphics.moveTo(0, y);
      this.gridGraphics.lineTo(width, y);
      this.gridGraphics.strokePath();
    }

    // Thick center axes
    this.gridGraphics.lineStyle(2, 0xffffff, 0.8);
    this.gridGraphics.beginPath();
    this.gridGraphics.moveTo(centerX, 0);
    this.gridGraphics.lineTo(centerX, height);
    this.gridGraphics.strokePath();
    this.gridGraphics.beginPath();
    this.gridGraphics.moveTo(0, centerY);
    this.gridGraphics.lineTo(width, centerY);
    this.gridGraphics.strokePath();
  }

  public showGrid(): void {
    console.log('[MainMenu] showGrid called');
    this.drawGrid();
    if (this.gridGraphics) {
      this.gridGraphics.setVisible(true);
      console.log(
        '[MainMenu] gridGraphics visible:',
        this.gridGraphics.visible
      );
    }
  }

  public hideGrid(): void {
    console.log('[MainMenu] hideGrid called');
    if (this.gridGraphics) {
      this.gridGraphics.setVisible(false);
    }
  }

  update() {}

  // private buildAPI(): GameAPI {
  //   return {
  //     createSprite: (texture: string, x: number, y: number, id: string) =>
  //       this.createSprite(texture, x, y, id),
  //     removeSprite: (id: string) => this.removeSprite(id),
  //     updateSprite: (id, updates) => this.updateSprite(id, updates),
  //   };
  // }

  private enableSpriteDragging(sprite: Phaser.Physics.Arcade.Sprite) {
    sprite.setInteractive({ cursor: 'grab' });
    this.input.setDraggable(sprite);
  }

  private registerDragEvents() {
    this.input.dragDistanceThreshold = 0;

    this.input.on(
      'dragstart',
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.GameObject
      ) => {
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

    this.input.on('drag', (pointer: Phaser.Input.Pointer) => {
      this.updateDragPositionFromEvent(
        pointer.event as PointerEvent | undefined,
        pointer
      );
    });

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
    window.addEventListener('pointermove', this.handleGlobalPointerMove, {
      capture: true,
    });
    window.addEventListener('pointerup', this.handleGlobalPointerUp, {
      capture: true,
    });
  }

  private detachGlobalDragListeners() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('pointermove', this.handleGlobalPointerMove, {
      capture: true,
    });
    window.removeEventListener('pointerup', this.handleGlobalPointerUp, {
      capture: true,
    });
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
      // api: this.buildAPI(),
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
