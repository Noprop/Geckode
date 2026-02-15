import * as Phaser from 'phaser';
import { EventBus } from '@/phaser/EventBus';
import type { SpriteInstance } from '@/blockly/spriteRegistry';
import { GAME_SCENE_KEY, EDITOR_SCENE_KEY } from '@/phaser/sceneKeys';
import { useGeckodeStore } from '@/stores/geckodeStore';

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
  public player!: Phaser.Physics.Matter.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  private justPressedKeys: Array<Phaser.Input.Keyboard.Key> = [];
  private justReleasedKeys: Array<Phaser.Input.Keyboard.Key> = [];
  private started: boolean = false;

  private gameSprites = new Map<string, Phaser.Physics.Matter.Sprite>();
  private static readonly GAME_SPRITE_BASE_DEPTH = Number.MAX_SAFE_INTEGER - 100;
  private gameLayer!: Phaser.GameObjects.Layer;
  private activeDrag: {
    sprite: Phaser.Physics.Matter.Sprite;
    start: { x: number; y: number };
    lastWorld: { x: number; y: number };
  } | null = null;
  private gridGraphics: Phaser.GameObjects.Graphics | null = null;

  /** Tracks which sides of each body are in active contact (from previous physics step). */
  private activeContacts = new Map<number, Set<string>>();

  // Tilemap properties
  private static readonly TILE_SIZE = 16;
  private tilemap: Phaser.Tilemaps.Tilemap | null = null;
  private groundLayer: Phaser.Tilemaps.TilemapLayer | null = null;

  constructor() {
    super(GAME_SCENE_KEY);
    this.key = GAME_SCENE_KEY;
  }

  /** Store (positive-up) → Phaser (positive-down) */
  private toWorldY(y: number): number { return -y; }
  /** Phaser (positive-down) → Store (positive-up) */
  private fromWorldY(y: number): number { return -y; }

  preload() {
    this.generateTilesetTexture();
  }

  create(data: { spriteInstances: SpriteInstance[]; textures: Record<string, string>; code: string }) {
    console.log('[GameScene] create called', data);

    // Reset tilemap state
    this.tilemap = null;
    this.groundLayer = null;
    this.gameSprites.clear();

    // Set world bounds for Matter physics
    this.matter.world.setBounds(0, -this.scale.height, this.scale.width, this.scale.height);

    // Create the tilemap first (sits below everything)
    // this.createTilemap();

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

    for (const instance of useGeckodeStore.getState().spriteInstances) {
      console.log('[GameScene] creating sprite: ', instance.id, instance.textureName, instance.x, instance.y);
      this.addGameSprite(instance);
    }

    // Set up collisions between sprites and tilemap
    // this.setupTilemapCollisions();

    // ── Contact tracking ──
    // Contacts are populated during the physics step (collisionstart / collisionactive)
    // and cleared at the START of the next step (beforeupdate).
    // This means during scene.update() (which runs BEFORE the step) we see the
    // previous step's contacts – exactly what we need for safeSetVelocity checks.
    this.matter.world.on('beforeupdate', () => {
      this.activeContacts.clear();
    });
    this.matter.world.on('collisionstart', (event: any) => {
      this.trackContacts(event.pairs);
    });
    this.matter.world.on('collisionactive', (event: any) => {
      this.trackContacts(event.pairs);
    });

    // Clean up residual velocities from collision resolution each physics step.
    // Prevents blocks from slowly sliding back after being pushed against a wall.
    this.matter.world.on('afterupdate', () => {
      const threshold = 0.3;
      for (const sprite of this.gameSprites.values()) {
        const body = sprite.body as MatterJS.BodyType;
        if (body && !body.isStatic) {
          if (Math.abs(body.velocity.x) < threshold) {
            sprite.setVelocityX(0);
          }
          if (Math.abs(body.velocity.y) < threshold) {
            sprite.setVelocityY(0);
          }
        }
      }
    });

    // Execute the Blockly-generated code
    if (data.code) {
      this.runScript(data.code);
    }

    // Tell React which scene is active (will trigger pause state sync)
    EventBus.emit('current-scene-ready', this);

    this.cameras.main.centerOn(this.scale.width/2, -this.scale.height/2);
    this.started = false;
  }

  startHook() {}
  updateHook() {}

  update() {
    this.justPressedKeys = [];
    this.justReleasedKeys = [];

    if (!this.started) {
      this.started = true;
      this.startHook();
    }

    this.updateHook();
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
    const width = this.scale.width;
    const height = this.scale.height;
    const mapWidth = Math.ceil(width / tileSize);
    const mapHeight = Math.ceil(height / tileSize);

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

    // Matter.js handles collisions automatically between all bodies.
    // Convert tilemap collision tiles to Matter bodies:
    // this.matter.world.convertTilemapLayer(this.groundLayer);
  }

  public changeScene() {
    this.scene.start(EDITOR_SCENE_KEY as unknown as string);
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

  public addGameSprite(instance: SpriteInstance) {
    const { id, x, y, textureName, scaleX, scaleY, visible, direction, physics } = instance;
    console.log('[GameScene] addGameSprite called', textureName, x, y, id, physics);
    const sprite = this.matter.add.sprite(x, this.toWorldY(y), 'sprite-' + textureName);
    sprite.setName(id);
    sprite.setData('gameSpriteId', id);
    sprite.setDepth(GameScene.GAME_SPRITE_BASE_DEPTH);
    sprite.setScale(scaleX, scaleY);
    sprite.setVisible(visible);
    sprite.setAngle(direction);

    // Make Matter.js behave like simple Arcade physics:
    // - No rotation from collisions
    // - No friction (no momentum transfer when sliding)
    // - No bounce (no sliding back after pressing against a wall)
    // - No overlap slop correction
    // - Equal mass so collisions feel uniform
    sprite.setFixedRotation();
    sprite.setFriction(0, 0);       // surface friction = 0, static friction = 0
    sprite.setBounce(0);
    sprite.setMass(1);
    if (sprite.body) {
      (sprite.body as MatterJS.BodyType).slop = 0;
    }

    this.gameLayer.add(sprite);
    this.gameLayer.bringToTop(sprite);
    this.gameSprites.set(id, sprite);

    // Apply physics settings if enabled
    if (physics?.enabled) {
      sprite.setFrictionAir(1 - physics.drag);
      sprite.setStatic(physics.anchored);

      // Matter gravity is world-level; apply per-sprite gravity scale
      if (physics.gravityY === 0) {
        sprite.setIgnoreGravity(true);
      }
    } else {
      // Disable physics body movement when physics is not enabled
      sprite.setStatic(true);
    }

    return sprite;
  }

  public removeSprite(id: string) {
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

  public getJustPressed(key: Phaser.Input.Keyboard.Key) {
    if (this.justPressedKeys.includes(key)) {
      return true;
    }
    if (Phaser.Input.Keyboard.JustDown(key)) {
      this.justPressedKeys.push(key);
      return true;
    }
    return false;
  }

  public getJustReleased(key: Phaser.Input.Keyboard.Key) {
    if (this.justReleasedKeys.includes(key)) {
      return true;
    }
    if (Phaser.Input.Keyboard.JustUp(key)) {
      this.justReleasedKeys.push(key);
      return true;
    }
    return false;
  }

  /**
   * Populate activeContacts from a list of Matter collision pairs.
   * Each body gets a Set of blocked directions: 'left' | 'right' | 'up' | 'down'.
   */
  private trackContacts(pairs: any[]) {
    for (const pair of pairs) {
      const normal = pair.collision.normal; // points from bodyA → bodyB
      const addSide = (bodyId: number, side: string) => {
        let sides = this.activeContacts.get(bodyId);
        if (!sides) {
          sides = new Set();
          this.activeContacts.set(bodyId, sides);
        }
        sides.add(side);
      };
      if (Math.abs(normal.x) > 0.3) {
        addSide(pair.bodyA.id, normal.x > 0 ? 'right' : 'left');
        addSide(pair.bodyB.id, normal.x > 0 ? 'left' : 'right');
      }
      if (Math.abs(normal.y) > 0.3) {
        addSide(pair.bodyA.id, normal.y > 0 ? 'down' : 'up');
        addSide(pair.bodyB.id, normal.y > 0 ? 'up' : 'down');
      }
    }
  }

  /**
   * Set X velocity only if the body is NOT blocked in that direction.
   * When blocked, velocity is zeroed to prevent push-pull oscillation.
   */
  public safeSetVelocityX(sprite: Phaser.Physics.Matter.Sprite, vx: number) {
    const body = sprite.body as MatterJS.BodyType;
    if (!body) return;
    const sides = this.activeContacts.get(body.id);
    if (sides) {
      if (vx > 0 && sides.has('right')) { sprite.setVelocityX(0); return; }
      if (vx < 0 && sides.has('left'))  { sprite.setVelocityX(0); return; }
    }
    sprite.setVelocityX(vx);
  }

  /**
   * Set Y velocity only if the body is NOT blocked in that direction.
   * When blocked, velocity is zeroed to prevent push-pull oscillation.
   */
  public safeSetVelocityY(sprite: Phaser.Physics.Matter.Sprite, vy: number) {
    const body = sprite.body as MatterJS.BodyType;
    if (!body) return;
    const sides = this.activeContacts.get(body.id);
    if (sides) {
      if (vy > 0 && sides.has('down')) { sprite.setVelocityY(0); return; }
      if (vy < 0 && sides.has('up'))   { sprite.setVelocityY(0); return; }
    }
    sprite.setVelocityY(vy);
  }

  private moveWithArrows(spriteName: string, vx: number, vy: number){
    const sprite = this.getSprite(spriteName);
    if (sprite) {
      if (vx != 0) {
        if (this.cursors.left.isDown && this.cursors.right.isDown) {
          sprite.setVelocityX(0);
        } else if (this.cursors.left.isDown) {
          this.safeSetVelocityX(sprite, -vx);
        } else if (this.cursors.right.isDown) {
          this.safeSetVelocityX(sprite, vx);
        } else if (this.getJustReleased(this.cursors.left) || this.getJustReleased(this.cursors.right)) {
          sprite.setVelocityX(0);
        }
      }
      if (vy != 0) {
        if (this.cursors.up.isDown && this.cursors.down.isDown) {
          sprite.setVelocityY(0);
        } else if (this.cursors.up.isDown) {
          this.safeSetVelocityY(sprite, -vy);
        } else if (this.cursors.down.isDown) {
          this.safeSetVelocityY(sprite, vy);
        } else if (this.getJustReleased(this.cursors.up) || this.getJustReleased(this.cursors.down)) {
          sprite.setVelocityY(0);
        }
      }
    }
  }


}
