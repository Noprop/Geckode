import * as Phaser from 'phaser';
import { EventBus } from '@/phaser/EventBus';
import type { SpriteInstance } from '@/blockly/spriteRegistry';
import { GAME_SCENE_KEY, EDITOR_SCENE_KEY } from '@/phaser/sceneKeys';

type SandboxContext = {
  scene: GameScene;
  phaser: typeof Phaser;
  console: Console; // you can swap this with a logger collector if you want
};

// Utility to create an async function at runtime.
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (...args: string[]) => (
  ...args: any[]
) => Promise<any>;

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

  // Tilemap properties
  private static readonly TILE_SIZE = 32;
  private tilemap: Phaser.Tilemaps.Tilemap | null = null;
  private groundLayer: Phaser.Tilemaps.TilemapLayer | null = null;

  constructor() {
    super(GAME_SCENE_KEY);
    this.key = GAME_SCENE_KEY;
  }

  preload() {
    this.generateTilesetTexture();
  }

  private generateTilesetTexture(): void {
    const tileSize = GameScene.TILE_SIZE;

    // Create a graphics object to draw tiles
    const graphics = this.make.graphics({ x: 0, y: 0 });

    // Tile 0: Empty/sky (transparent)
    // We don't draw anything for tile 0

    // Tile 1: Grass tile
    graphics.fillStyle(0x4ade80); // green-400
    graphics.fillRect(tileSize, 0, tileSize, tileSize);
    // Add some grass texture lines
    graphics.lineStyle(1, 0x22c55e, 0.6);
    for (let i = 0; i < 5; i++) {
      const x = tileSize + 4 + i * 6;
      graphics.beginPath();
      graphics.moveTo(x, tileSize - 2);
      graphics.lineTo(x + 2, tileSize - 8);
      graphics.strokePath();
    }

    // Tile 2: Dirt tile
    graphics.fillStyle(0x92400e); // amber-800
    graphics.fillRect(tileSize * 2, 0, tileSize, tileSize);
    // Add some dirt texture
    graphics.fillStyle(0x78350f, 0.5);
    for (let i = 0; i < 6; i++) {
      const x = tileSize * 2 + 4 + Math.random() * 24;
      const y = 4 + Math.random() * 24;
      graphics.fillCircle(x, y, 2);
    }

    // Tile 3: Stone tile
    graphics.fillStyle(0x6b7280); // gray-500
    graphics.fillRect(tileSize * 3, 0, tileSize, tileSize);
    graphics.lineStyle(1, 0x4b5563, 0.8);
    graphics.strokeRect(tileSize * 3 + 2, 2, tileSize - 4, tileSize - 4);

    // Generate the texture (4 tiles wide, 1 tile tall)
    graphics.generateTexture('game-tileset', tileSize * 4, tileSize);
    graphics.destroy();
  }

  private createTilemap(): void {
    const tileSize = GameScene.TILE_SIZE;
    const width = 480;
    const height = 360;
    const mapWidth = Math.ceil(width / tileSize); // 15 tiles
    const mapHeight = Math.ceil(height / tileSize); // ~11 tiles

    // Create tilemap data - simple ground at bottom 2 rows
    const mapData: number[][] = [];
    for (let y = 0; y < mapHeight; y++) {
      const row: number[] = [];
      for (let x = 0; x < mapWidth; x++) {
        if (y >= mapHeight - 2) {
          // Bottom 2 rows: grass on top, dirt below
          row.push(y === mapHeight - 2 ? 1 : 2); // 1 = grass, 2 = dirt
        } else {
          row.push(0); // Empty
        }
      }
      mapData.push(row);
    }

    // Create tilemap from data
    this.tilemap = this.make.tilemap({
      data: mapData,
      tileWidth: tileSize,
      tileHeight: tileSize,
    });

    // Add tileset image
    const tileset = this.tilemap.addTilesetImage('game-tileset', 'game-tileset', tileSize, tileSize, 0, 0);
    if (!tileset) {
      console.error('Failed to create tileset');
      return;
    }

    // Create layer (cast to TilemapLayer since we're creating from data, not GPU)
    const layer = this.tilemap.createLayer(0, tileset, 0, 0);
    if (layer && 'tilesDrawn' in layer) {
      this.groundLayer = layer as Phaser.Tilemaps.TilemapLayer;
      this.groundLayer.setDepth(0); // Below sprites

      // Enable collision on grass (1) and dirt (2) tiles
      this.tilemap.setCollision([1, 2]);
    }
  }

  private setupTilemapCollisions(): void {
    if (!this.groundLayer) return;

    // Add collisions between all game sprites and the ground layer
    for (const sprite of this.gameSprites.values()) {
      this.physics.add.collider(sprite, this.groundLayer);
      // Enable gravity for sprites so they fall onto the ground
      sprite.setGravityY(300);
      sprite.setCollideWorldBounds(true);
    }
  }

  public changeScene() {
    this.scene.start(EDITOR_SCENE_KEY as unknown as string);
  }

  create(data: { spriteInstances: SpriteInstance[]; textures: Map<string, { name: string; file: string }>; code: string }) {
    console.log('[GameScene] create called', data);

    // Reset tilemap state
    this.tilemap = null;
    this.groundLayer = null;
    this.gameSprites.clear();

    // Create the tilemap first (sits below everything)
    this.createTilemap();

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

    // Set up collisions between sprites and tilemap
    this.setupTilemapCollisions();

    this.add.sprite(100,100, "star");

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

    // Add collision with ground if tilemap exists
    if (this.groundLayer) {
      this.physics.add.collider(sprite, this.groundLayer);
      sprite.setGravityY(300);
      sprite.setCollideWorldBounds(true);
    }

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
