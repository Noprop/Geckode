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
  public player!: Phaser.GameObjects.Sprite;
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

  private gameSprites = new Map<string, Phaser.GameObjects.Sprite>();
  private static readonly GAME_SPRITE_BASE_DEPTH = Number.MAX_SAFE_INTEGER - 100;
  private gameLayer!: Phaser.GameObjects.Layer;
  private activeDrag: {
    sprite: Phaser.GameObjects.Sprite;
    start: { x: number; y: number };
    lastWorld: { x: number; y: number };
  } | null = null;
  private gridGraphics: Phaser.GameObjects.Graphics | null = null;

  /** World boundary rectangle for collision. */
  private worldBounds = { left: 0, top: 0, right: 0, bottom: 0 };

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

    // Set world bounds for our custom collision system
    this.worldBounds = {
      left: 0,
      top: -this.scale.height,
      right: this.scale.width,
      bottom: 0,
    };

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

    // Run our custom physics step after user code
    this.physicsStep();
  }

  // ─── Custom Physics ──────────────────────────────────────────────────

  /**
   * Run one physics step: resolve movement first using current velocities,
   * then apply gravity & drag for the next frame.
   */
  private physicsStep() {
    // 1. Resolve movements using current velocities
    for (const sprite of this.gameSprites.values()) {
      if (sprite.getData('isStatic')) continue;
      const vx: number = sprite.getData('vx') || 0;
      if (vx !== 0) {
        this.resolveAxisMovement(sprite, vx, 'x');
      }
    }

    for (const sprite of this.gameSprites.values()) {
      if (sprite.getData('isStatic')) continue;
      const vy: number = sprite.getData('vy') || 0;
      if (vy !== 0) {
        this.resolveAxisMovement(sprite, vy, 'y');
      }
    }

    // 2. Apply gravity and drag for NEXT frame
    for (const sprite of this.gameSprites.values()) {
      if (sprite.getData('isStatic')) continue;

      let vx: number = sprite.getData('vx') || 0;
      let vy: number = sprite.getData('vy') || 0;

      // Apply gravity
      const gravityY: number = sprite.getData('gravityY') || 0;
      vy += gravityY;

      // Apply air drag — physics.drag is a keep-ratio (0.99 = keep 99%)
      const drag: number = sprite.getData('drag') || 0;
      if (drag > 0 && drag < 1) {
        vx *= drag;
        vy *= drag;
        // Zero out tiny residuals
        if (Math.abs(vx) < 0.01) vx = 0;
        if (Math.abs(vy) < 0.01) vy = 0;
      } else if (drag === 0) {
        // drag = 0 means no keepness → instant stop (like frictionAir = 1)
        vx = 0;
        vy = 0;
      }
      // drag >= 1 means no drag at all

      sprite.setData('vx', vx);
      sprite.setData('vy', vy);
    }
  }

  /**
   * Try to move `sprite` by `delta` pixels along `axis` ('x' or 'y').
   * Handles chain-pushing of dynamic sprites and bouncing off static ones.
   * Returns the actual distance moved.
   */
  private resolveAxisMovement(
    sprite: Phaser.GameObjects.Sprite,
    delta: number,
    axis: 'x' | 'y',
    visited: Set<Phaser.GameObjects.Sprite> = new Set(),
  ): number {
    if (delta === 0 || sprite.getData('isStatic')) return 0;
    visited.add(sprite);

    const hw = sprite.displayWidth / 2;
    const hh = sprite.displayHeight / 2;

    // Find ALL closest blockers in the movement direction
    let closestGap = Math.abs(delta);
    let blockers: (Phaser.GameObjects.Sprite | 'worldBound')[] = [];

    // Check other game sprites
    for (const other of this.gameSprites.values()) {
      if (other === sprite || visited.has(other)) continue;

      const ohw = other.displayWidth / 2;
      const ohh = other.displayHeight / 2;

      if (axis === 'x') {
        // Must have Y overlap
        if (sprite.y + hh <= other.y - ohh || sprite.y - hh >= other.y + ohh) continue;

        let gap: number;
        if (delta > 0) {
          // Moving right: gap = other's left edge - sprite's right edge
          gap = (other.x - ohw) - (sprite.x + hw);
        } else {
          // Moving left: gap = sprite's left edge - other's right edge
          gap = (sprite.x - hw) - (other.x + ohw);
        }

        if (gap < -0.01) continue; // Already overlapping or behind us — skip
        if (gap < 0) gap = 0;      // Touching — treat as 0 gap

        if (gap < closestGap - 0.001) {
          closestGap = gap;
          blockers = [other];
        } else if (Math.abs(gap - closestGap) < 0.001) {
          blockers.push(other);
        }
      } else {
        // Must have X overlap
        if (sprite.x + hw <= other.x - ohw || sprite.x - hw >= other.x + ohw) continue;

        let gap: number;
        if (delta > 0) {
          // Moving down (positive Y): gap = other's top - sprite's bottom
          gap = (other.y - ohh) - (sprite.y + hh);
        } else {
          // Moving up (negative Y): gap = sprite's top - other's bottom
          gap = (sprite.y - hh) - (other.y + ohh);
        }

        if (gap < -0.01) continue;
        if (gap < 0) gap = 0;

        if (gap < closestGap - 0.001) {
          closestGap = gap;
          blockers = [other];
        } else if (Math.abs(gap - closestGap) < 0.001) {
          blockers.push(other);
        }
      }
    }

    // Check world bounds (if collideWorldBounds is on for this sprite)
    if (sprite.getData('collideWorldBounds')) {
      let wbGap = Infinity;
      if (axis === 'x') {
        wbGap = delta > 0
          ? this.worldBounds.right - (sprite.x + hw)
          : (sprite.x - hw) - this.worldBounds.left;
      } else {
        wbGap = delta > 0
          ? this.worldBounds.bottom - (sprite.y + hh)
          : (sprite.y - hh) - this.worldBounds.top;
      }
      if (wbGap < 0) wbGap = 0;

      if (wbGap < closestGap - 0.001) {
        closestGap = wbGap;
        blockers = ['worldBound'];
      } else if (Math.abs(wbGap - closestGap) < 0.001) {
        blockers.push('worldBound');
      }
    }

    // If path is clear, move the full distance
    if (blockers.length === 0 || closestGap >= Math.abs(delta) - 0.001) {
      if (axis === 'x') sprite.x += delta;
      else sprite.y += delta;
      return delta;
    }

    // We hit something — move to contact point
    const sign = delta > 0 ? 1 : -1;
    const contactDelta = sign * closestGap;
    const remainDelta = delta - contactDelta;

    // Check if any blocker is static or world bound — blocks the whole push
    const hasStaticBlocker = blockers.some(b =>
      b === 'worldBound' || (b as Phaser.GameObjects.Sprite).getData('isStatic')
    );

    if (hasStaticBlocker) {
      // Can't push — stop at contact, apply bounce
      if (axis === 'x') {
        sprite.x += contactDelta;
        const bounce: number = sprite.getData('bounce') || 0;
        sprite.setData('vx', -(sprite.getData('vx') || 0) * bounce);
      } else {
        sprite.y += contactDelta;
        const bounce: number = sprite.getData('bounce') || 0;
        sprite.setData('vy', -(sprite.getData('vy') || 0) * bounce);
      }
      return contactDelta;
    }

    // All blockers are dynamic — try to push each one
    // The minimum push distance determines how far we can actually move
    let minPushed = Math.abs(remainDelta);
    for (const blocker of blockers) {
      if (blocker === 'worldBound') { minPushed = 0; break; }
      const pushed = this.resolveAxisMovement(blocker as Phaser.GameObjects.Sprite, remainDelta, axis, visited);
      minPushed = Math.min(minPushed, Math.abs(pushed));
    }

    const actualPush = sign * minPushed;
    const totalMoved = contactDelta + actualPush;

    if (axis === 'x') {
      sprite.x += totalMoved;
      if (Math.abs(actualPush) < Math.abs(remainDelta) - 0.001) {
        const bounce: number = sprite.getData('bounce') || 0;
        sprite.setData('vx', -(sprite.getData('vx') || 0) * bounce);
      }
    } else {
      sprite.y += totalMoved;
      if (Math.abs(actualPush) < Math.abs(remainDelta) - 0.001) {
        const bounce: number = sprite.getData('bounce') || 0;
        sprite.setData('vy', -(sprite.getData('vy') || 0) * bounce);
      }
    }

    return totalMoved;
  }

  // ─── Sprite Velocity Accessors (called by generated Blockly code) ────

  /** Set the X velocity of a sprite. */
  public setVelocityX(sprite: Phaser.GameObjects.Sprite, vx: number) {
    sprite.setData('vx', vx);
  }

  /** Set the Y velocity of a sprite. */
  public setVelocityY(sprite: Phaser.GameObjects.Sprite, vy: number) {
    sprite.setData('vy', vy);
  }

  /** Get the X velocity of a sprite. */
  public getVelocityX(sprite: Phaser.GameObjects.Sprite): number {
    return sprite.getData('vx') || 0;
  }

  /** Get the Y velocity of a sprite. */
  public getVelocityY(sprite: Phaser.GameObjects.Sprite): number {
    return sprite.getData('vy') || 0;
  }

  /** Check AABB overlap between two sprites (touching/overlapping). */
  public isTouching(
    sprite1: Phaser.GameObjects.Sprite,
    sprite2: Phaser.GameObjects.Sprite,
  ): boolean {
    const hw1 = sprite1.displayWidth / 2;
    const hh1 = sprite1.displayHeight / 2;
    const hw2 = sprite2.displayWidth / 2;
    const hh2 = sprite2.displayHeight / 2;

    // Use a 1px tolerance so "touching" (adjacent) counts
    const pad = 1;
    return (
      sprite1.x - hw1 < sprite2.x + hw2 + pad &&
      sprite1.x + hw1 > sprite2.x - hw2 - pad &&
      sprite1.y - hh1 < sprite2.y + hh2 + pad &&
      sprite1.y + hh1 > sprite2.y - hh2 - pad
    );
  }

  // ─── Tilemap helpers (unchanged) ─────────────────────────────────────

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

  // ─── Scene management ────────────────────────────────────────────────

  public changeScene() {
    this.scene.start(EDITOR_SCENE_KEY as unknown as string);
  }

  // ─── Sprite management ───────────────────────────────────────────────

  public addGameSprite(instance: SpriteInstance) {
    const { id, x, y, textureName, scaleX, scaleY, visible, direction, physics } = instance;
    console.log('[GameScene] addGameSprite called', textureName, x, y, id, physics);
    const sprite = this.add.sprite(x, this.toWorldY(y), 'sprite-' + textureName);
    sprite.setName(id);
    sprite.setData('gameSpriteId', id);
    sprite.setDepth(GameScene.GAME_SPRITE_BASE_DEPTH);
    sprite.setScale(scaleX, scaleY);
    sprite.setVisible(visible);
    sprite.setAngle(direction);

    // Initialize custom physics state
    sprite.setData('vx', 0);
    sprite.setData('vy', 0);

    if (physics?.enabled) {
      sprite.setData('isStatic', physics.anchored);
      sprite.setData('gravityY', physics.gravityY || 0);
      sprite.setData('bounce', physics.bounce || 0);
      sprite.setData('drag', physics.drag || 0);
      sprite.setData('collideWorldBounds', physics.collideWorldBounds ?? true);
    } else {
      // No physics = static (doesn't move, but still blocks others)
      sprite.setData('isStatic', true);
      sprite.setData('gravityY', 0);
      sprite.setData('bounce', 0);
      sprite.setData('drag', 0);
      sprite.setData('collideWorldBounds', false);
    }

    this.gameLayer.add(sprite);
    this.gameLayer.bringToTop(sprite);
    this.gameSprites.set(id, sprite);

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

  // ─── Script execution ────────────────────────────────────────────────

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

  // ─── Input helpers ───────────────────────────────────────────────────

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

  // ─── Arrow-key movement (called from generated code) ─────────────────

  private moveWithArrows(spriteName: string, vx: number, vy: number) {
    const sprite = this.getSprite(spriteName);
    if (sprite) {
      if (vx != 0) {
        if (this.cursors.left.isDown && this.cursors.right.isDown) {
          sprite.setData('vx', 0);
        } else if (this.cursors.left.isDown) {
          sprite.setData('vx', -vx);
        } else if (this.cursors.right.isDown) {
          sprite.setData('vx', vx);
        } else if (this.getJustReleased(this.cursors.left) || this.getJustReleased(this.cursors.right)) {
          sprite.setData('vx', 0);
        }
      }
      if (vy != 0) {
        if (this.cursors.up.isDown && this.cursors.down.isDown) {
          sprite.setData('vy', 0);
        } else if (this.cursors.up.isDown) {
          sprite.setData('vy', -vy);
        } else if (this.cursors.down.isDown) {
          sprite.setData('vy', vy);
        } else if (this.getJustReleased(this.cursors.up) || this.getJustReleased(this.cursors.down)) {
          sprite.setData('vy', 0);
        }
      }
    }
  }
}
