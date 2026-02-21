import * as Phaser from 'phaser';
import { EventBus } from '@/phaser/EventBus';
import type { SpriteInstance } from '@/blockly/spriteRegistry';
import { GAME_SCENE_KEY, EDITOR_SCENE_KEY } from '@/phaser/sceneKeys';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { getClosestTileCollisionGap as findClosestTileCollisionGap } from '@/phaser/tileCollision';

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

  /** World boundary rectangle for collision. */
  private worldBounds = { left: 0, top: 0, right: 0, bottom: 0 };

  /** Clone registry: maps original sprite ID → array of clone IDs. */
  private cloneRegistry = new Map<string, string[]>();
  private cloneCounter = 0;

  // Tilemap properties
  private static readonly TILE_SIZE = 16;
  private static readonly TILESET_KEY = 'game-tileset';
  private static readonly COLLISION_OVERLAP_EPSILON = 0.01;
  private static readonly COLLISION_GAP_EPSILON = 0.001;
  private tilemap: Phaser.Tilemaps.Tilemap | null = null;
  private tilemapLayer: Phaser.Tilemaps.TilemapLayer | null = null;
  private tileKeyToIndex: Map<string, number> = new Map();
  private collidableTileIndices: Set<number> = new Set();
  private tilemapData: number[][] = [];
  private tilemapOrigin = { x: 0, y: 0 };

  constructor() {
    super(GAME_SCENE_KEY);
    this.key = GAME_SCENE_KEY;
  }

  /** Logical (Y-up) → Phaser world (Y-down) */
  public toWorldY(y: number): number { return -y; }
  /** Phaser world (Y-down) → Logical (Y-up) */
  public toLogicalY(y: number): number { return -y; }

  preload() {
    const { tiles } = useGeckodeStore.getState();
    for (const tileKey of Object.keys(tiles)) {
      const base64Image = tiles[tileKey];
      const textureKey = 'tile-' + tileKey;
      if (!base64Image || this.textures.exists(textureKey)) continue;
      this.load.image(textureKey, base64Image);
    }
  }

  create(data: { spriteInstances: SpriteInstance[]; textures: Record<string, string>; code: string }) {
    console.log('[GameScene] create called', data);

    // Reset tilemap state
    this.tilemap = null;
    this.tilemapLayer = null;
    this.tilemapData = [];
    this.tilemapOrigin = { x: 0, y: 0 };
    this.tileKeyToIndex.clear();
    this.collidableTileIndices.clear();
    this.gameSprites.clear();
    this.cloneRegistry.clear();
    this.cloneCounter = 0;

    // Set world bounds for our custom collision system
    this.worldBounds = {
      left: 0,
      top: this.toWorldY(this.scale.height),
      right: this.scale.width,
      bottom: 0,
    };

    // Create the tilemap first (sits below everything)
    const { tilemaps, activeTilemapId, tileCollidables } = useGeckodeStore.getState();
    const selectedTilemap = tilemaps[activeTilemapId ?? 'tilemap_1'] ?? tilemaps['tilemap_1'];
    this.generateTilesetTexture();
    this.createTilemap(selectedTilemap?.data ?? [], tileCollidables);

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

    this.cameras.main.centerOn(this.scale.width/2, this.toWorldY(this.scale.height/2));
    this.started = false;
  }

  private loadTextureAsync(key: string, base64Image: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.load.once('complete', () => resolve());
      this.load.image(key, base64Image);
      this.load.start();
    });
  }

  startHook() {}
  updateHook() {}

  update(_time: number, delta: number) {
    this.justPressedKeys = [];
    this.justReleasedKeys = [];

    if (!this.started) {
      this.started = true;
      this.startHook();
    }

    this.updateHook();

    // Run our custom physics step after user code (dt in seconds)
    console.log('[GameScene] updating physics, delta: ', delta);
    this.physicsStep(delta / 1000);
  }

  // ─── Custom Physics ──────────────────────────────────────────────────

  /**
   * Run one physics step: apply gravity & drag, then resolve movement
   * with AABB chain-collision on each axis.
   *
   * Velocities are stored in **pixels per second**.
   * `dt` is the frame duration in seconds (delta / 1000).
   *
   * Drag is applied BEFORE movement so that drag=0 zeroes velocity
   * immediately — even user-set velocity — preventing any movement.
   */
  private physicsStep(dt: number) {
    // 1. Apply gravity and drag BEFORE movement
    for (const sprite of this.gameSprites.values()) {
      if (sprite.getData('isStatic')) continue;

      let vx: number = sprite.getData('vx') || 0;
      let vy: number = sprite.getData('vy') || 0;

      // Only apply gravity/drag to sprites with physics enabled
      if (sprite.getData('hasPhysics')) {
        // Apply gravity (gravityY is in px/s²)
        const gravityY: number = sprite.getData('gravityY') || 0;
        vy += gravityY * dt;

        const drag: number = sprite.getData('drag') || 0;
        if (drag > 0 && drag < 1) {
          const dragFactor = Math.pow(drag, dt);
          vx *= dragFactor;
          vy *= dragFactor;
          // Zero out tiny residuals
          if (Math.abs(vx) < 0.01) vx = 0;
          if (Math.abs(vy) < 0.01) vy = 0;
        } else if (drag === 0) {
          // drag = 0 → lose all velocity immediately
          vx = 0;
          vy = 0;
        }
        // drag >= 1 means no drag at all
      }

      sprite.setData('vx', vx);
      sprite.setData('vy', vy);
      console.log('[GameScene] after applying gravity and drag, vx: ', sprite.getData('vx'), 'vy: ', sprite.getData('vy'));
    }

    // 2. Resolve movement — convert velocity (px/s) to displacement (px) for this frame.
    // processedX/Y tracks sprites already moved (prevents double-movement
    // from imparted velocity). Each resolveAxisMovement call gets a FRESH
    // chain set so pushed sprites are still visible as blockers to others.
    this.resolveVelocityAxisMovement(dt, 'x');
    this.resolveVelocityAxisMovement(dt, 'y');
  }

  private resolveVelocityAxisMovement(dt: number, axis: 'x' | 'y'): void {
    const processed = new Set<Phaser.GameObjects.Sprite>();
    for (const sprite of this.gameSprites.values()) {
      if (sprite.getData('isStatic') || processed.has(sprite)) continue;
      const velocity = sprite.getData(`v${axis}`);
      if (velocity === 0) continue;

      const chain = new Set<Phaser.GameObjects.Sprite>();
      this.resolveAxisMovement(sprite, velocity * dt, axis, chain);
      for (const pushedSprite of chain) {
        processed.add(pushedSprite);
      }
    }
  }

  /**
   * Try to move `sprite` by `delta` pixels along `axis` ('x' or 'y').
   * Handles chain-pushing of dynamic sprites and bouncing off static ones.
   * Returns the actual distance moved.
   */
  private updateClosestBlockers(
    gap: number | null,
    blocker: Phaser.GameObjects.Sprite | 'worldBound' | 'tilemap',
    closestState: {
      closestGap: number;
      blockers: (Phaser.GameObjects.Sprite | 'worldBound' | 'tilemap')[];
    },
  ): void {
    if (gap === null) return;
    if (gap < closestState.closestGap - GameScene.COLLISION_GAP_EPSILON) {
      closestState.closestGap = gap;
      closestState.blockers = [blocker];
      return;
    }
    if (Math.abs(gap - closestState.closestGap) < GameScene.COLLISION_GAP_EPSILON) {
      closestState.blockers.push(blocker);
    }
  }

  private getSpriteCollisionGap(
    sprite: Phaser.GameObjects.Sprite,
    other: Phaser.GameObjects.Sprite,
    delta: number,
    axis: 'x' | 'y',
    hw: number,
    hh: number,
    ohw: number,
    ohh: number,
  ): number | null {
    if (axis === 'x') {
      const hasYOverlap = sprite.y + hh >= other.y - ohh && sprite.y - hh <= other.y + ohh;
      if (!hasYOverlap) return null;

      const rawGap = delta > 0
        ? (other.x - ohw) - (sprite.x + hw)
        : (sprite.x - hw) - (other.x + ohw);
      if (rawGap < -GameScene.COLLISION_OVERLAP_EPSILON) return null;
      return rawGap < 0 ? 0 : rawGap;
    }

    const hasXOverlap = sprite.x + hw >= other.x - ohw && sprite.x - hw <= other.x + ohw;
    if (!hasXOverlap) return null;

    const rawGap = delta > 0
      ? (other.y - ohh) - (sprite.y + hh)
      : (sprite.y - hh) - (other.y + ohh);
    if (rawGap < -GameScene.COLLISION_OVERLAP_EPSILON) return null;
    return rawGap < 0 ? 0 : rawGap;
  }

  private getWorldBoundGap(sprite: Phaser.GameObjects.Sprite, delta: number, axis: 'x' | 'y', hw: number, hh: number): number {
    let worldBoundGap = Infinity;
    if (axis === 'x') {
      worldBoundGap = delta > 0
        ? this.worldBounds.right - (sprite.x + hw)
        : (sprite.x - hw) - this.worldBounds.left;
    } else {
      worldBoundGap = delta > 0
        ? this.worldBounds.bottom - (sprite.y + hh)
        : (sprite.y - hh) - this.worldBounds.top;
    }

    if (worldBoundGap < 0) return 0;
    return worldBoundGap;
  }

  private resolveAxisMovement(
    sprite: Phaser.GameObjects.Sprite,
    delta: number,
    axis: 'x' | 'y',
    visited: Set<Phaser.GameObjects.Sprite> = new Set(),
  ): number {
    if (delta === 0 || sprite.getData('isStatic')) return 0;
    visited.add(sprite);

    // Non-solid sprites move freely — no collision checks
    if (!sprite.getData('isSolid')) {
      sprite[axis] += delta;
      return delta;
    }

    const hw = sprite.displayWidth / 2;
    const hh = sprite.displayHeight / 2;

    const closestState: {
      closestGap: number;
      blockers: (Phaser.GameObjects.Sprite | 'worldBound' | 'tilemap')[];
    } = {
      closestGap: Math.abs(delta),
      blockers: [],
    };

    // Check other game sprites
    for (const other of this.gameSprites.values()) {
      if (other === sprite || visited.has(other)) continue;
      if (!other.getData('isSolid')) continue;

      const ohw = other.displayWidth / 2;
      const ohh = other.displayHeight / 2;
      const gap = this.getSpriteCollisionGap(sprite, other, delta, axis, hw, hh, ohw, ohh);
      this.updateClosestBlockers(gap, other, closestState);
    }

    // Check collidable map tiles (acts like a static blocker)
    const tileGap = this.getClosestTileCollisionGap(sprite, delta, axis, hw, hh);
    this.updateClosestBlockers(tileGap, 'tilemap', closestState);

    // Check world bounds (if collideWorldBounds is on for this sprite)
    if (sprite.getData('collideWorldBounds')) {
      const worldBoundGap = this.getWorldBoundGap(sprite, delta, axis, hw, hh);
      this.updateClosestBlockers(worldBoundGap, 'worldBound', closestState);
    }

    // If path is clear, move the full distance
    if (
      closestState.blockers.length === 0 ||
      closestState.closestGap >= Math.abs(delta) - GameScene.COLLISION_GAP_EPSILON
    ) {
      sprite[axis] += delta;
      return delta;
    }

    // We hit something — move to contact point
    const sign = delta > 0 ? 1 : -1;
    const contactDelta = sign * closestState.closestGap;
    const remainDelta = delta - contactDelta;

    // Check if any blocker is static or world bound — blocks the whole push
    const hasStatic = closestState.blockers.some(b => b === 'worldBound' || b === 'tilemap' || b.getData('isStatic'));
    if (hasStatic) {
      // Can't push — stop at contact, apply bounce
      sprite[axis] += contactDelta;
      const bounce: number = sprite.getData('bounce') || 0;
      const vel = (sprite.getData(axis === 'x' ? 'vx' : 'vy') || 0) as number;
      sprite.setData(axis === 'x' ? 'vx' : 'vy', -vel * bounce);
      return contactDelta;
    }

    // All blockers are dynamic — try to push each one
    // The minimum push distance determines how far we can actually move
    let minPushed = Math.abs(remainDelta);
    for (const blocker of closestState.blockers) {
      if (blocker === 'worldBound' || blocker === 'tilemap') { minPushed = 0; break; }
      const pushed = this.resolveAxisMovement(blocker, remainDelta, axis, visited);
      minPushed = Math.min(minPushed, Math.abs(pushed));

      // Impart pusher's velocity onto pushed object, scaled by its drag.
      // drag=1 → full transfer, drag=0 → no transfer (stops when released).
      // The shared visited set prevents the blocker from moving again this
      // frame, so the imparted velocity only takes effect next frame.
      const pushedDrag: number = blocker.getData('drag') || 0;
      const vKey = axis === 'x' ? 'vx' : 'vy';
      blocker.setData(vKey, ((sprite.getData(vKey) || 0) as number) * pushedDrag);
    }

    const actualPush = sign * minPushed;
    const totalMoved = contactDelta + actualPush;
    sprite[axis] += totalMoved;
    if (Math.abs(actualPush) < Math.abs(remainDelta) - GameScene.COLLISION_GAP_EPSILON) {
      const bounce: number = sprite.getData('bounce') || 0;
      const vel = (sprite.getData(axis === 'x' ? 'vx' : 'vy') || 0) as number;
      sprite.setData(axis === 'x' ? 'vx' : 'vy', -vel * bounce);
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

  // ─── Tilemap helpers ──────────────────────────────────────────────────

  private generateTilesetTexture(): void {
    const { tiles } = useGeckodeStore.getState();
    const tileKeys = Object.keys(tiles);

    // Build mapping: index 0 = empty, 1+ = each tile key
    this.tileKeyToIndex.clear();
    for (let i = 0; i < tileKeys.length; i++) {
      this.tileKeyToIndex.set(tileKeys[i], i + 1);
    }

    const totalSlots = tileKeys.length + 1; // +1 for empty tile at index 0
    const stripWidth = totalSlots * GameScene.TILE_SIZE;

    // Remove previous tileset texture if it exists
    if (this.textures.exists(GameScene.TILESET_KEY)) {
      this.textures.remove(GameScene.TILESET_KEY);
    }

    const dt = this.textures.addDynamicTexture(
      GameScene.TILESET_KEY,
      stripWidth,
      GameScene.TILE_SIZE,
      false,
    );
    if (!dt) return;

    // Index 0 is left transparent (empty tile)
    // Stamp each tile texture at its index position
    for (let i = 0; i < tileKeys.length; i++) {
      const textureKey = 'tile-' + tileKeys[i];
      if (!this.textures.exists(textureKey)) continue;
      dt.stamp(textureKey, undefined, (i + 1) * GameScene.TILE_SIZE, 0, {
        originX: 0,
        originY: 0,
      });
    }

    dt.render();
  }

  private createTilemap(tilemap: (string | null)[][], tileCollidables: Record<string, boolean>): void {
    // Clean up previous tilemap/layer
    if (this.tilemapLayer) {
      this.tilemapLayer.destroy();
      this.tilemapLayer = null;
    }
    if (this.tilemap) {
      this.tilemap.destroy();
      this.tilemap = null;
    }

    if (tilemap.length === 0 || tilemap[0].length === 0) {
      this.tilemapData = [];
      this.tilemapOrigin = { x: 0, y: 0 };
      this.collidableTileIndices.clear();
      return;
    }

    // Convert string keys to numeric indices using tileKeyToIndex
    const numericData: number[][] = tilemap.map((row) =>
      row.map((cell) => {
        if (!cell) return 0;
        return this.tileKeyToIndex.get(cell) ?? 0;
      }),
    );
    this.tilemapData = numericData;

    // Create tilemap from numeric data
    this.tilemap = this.make.tilemap({
      data: numericData,
      tileWidth: GameScene.TILE_SIZE,
      tileHeight: GameScene.TILE_SIZE,
    });

    // Add tileset image
    const tileset = this.tilemap.addTilesetImage(
      GameScene.TILESET_KEY,
      GameScene.TILESET_KEY,
      GameScene.TILE_SIZE,
      GameScene.TILE_SIZE,
      0,
      0,
    );
    if (!tileset) return;

    const mapPixelHeight = tilemap.length * GameScene.TILE_SIZE;
    const layerY = this.toWorldY(mapPixelHeight);
    this.tilemapOrigin = { x: 0, y: layerY };

    const layer = this.tilemap.createLayer(
      0,
      tileset,
      this.tilemapOrigin.x,
      this.tilemapOrigin.y,
    );
    if (layer) {
      this.tilemapLayer = layer as Phaser.Tilemaps.TilemapLayer;
      this.tilemapLayer.setDepth(0); // Below sprites
    }

    this.rebuildCollidableTileIndices(tileCollidables);

    if (this.collidableTileIndices.size > 0) {
      this.tilemap.setCollision(Array.from(this.collidableTileIndices));
    }
  }

  private rebuildCollidableTileIndices(tileCollidables: Record<string, boolean>): void {
    this.collidableTileIndices.clear();
    for (const [tileKey, collidable] of Object.entries(tileCollidables)) {
      if (!collidable) continue;
      const index = this.tileKeyToIndex.get(tileKey);
      if (index !== undefined) {
        this.collidableTileIndices.add(index);
      }
    }
  }

  private getClosestTileCollisionGap(
    sprite: Phaser.GameObjects.Sprite,
    delta: number,
    axis: 'x' | 'y',
    hw: number,
    hh: number,
  ): number | null {
    if (this.tilemapData.length === 0 || this.collidableTileIndices.size === 0) return null;

    return findClosestTileCollisionGap({
      axis,
      delta,
      aabb: {
        left: sprite.x - hw,
        right: sprite.x + hw,
        top: sprite.y - hh,
        bottom: sprite.y + hh,
      },
      grid: {
        data: this.tilemapData,
        collidableTileIndices: this.collidableTileIndices,
        tileSize: GameScene.TILE_SIZE,
        originX: this.tilemapOrigin.x,
        originY: this.tilemapOrigin.y,
      },
    });
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
      sprite.setData('hasPhysics', true);
      sprite.setData('isSolid', true);
      sprite.setData('isStatic', physics.anchored);
      sprite.setData('gravityY', physics.gravityY || 0);
      sprite.setData('bounce', physics.bounce || 0);
      sprite.setData('drag', physics.drag || 0);
      sprite.setData('collideWorldBounds', physics.collideWorldBounds ?? true);
    } else {
      // No physics — can still move via velocity, but no collision
      sprite.setData('hasPhysics', false);
      sprite.setData('isSolid', false);
      sprite.setData('isStatic', false);
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

  // ─── Cloning ────────────────────────────────────────────────────────

  /** Clone a sprite, copying its texture, transform, and all data properties. */
  public cloneSprite(originalId: string): string | null {
    const original = this.gameSprites.get(originalId);
    if (!original) return null;

    const cloneId = `${originalId}_clone_${this.cloneCounter++}`;

    const clone = this.add.sprite(original.x, original.y, original.texture.key);
    clone.setName(cloneId);
    clone.setDepth(original.depth);
    clone.setScale(original.scaleX, original.scaleY);
    clone.setVisible(original.visible);
    clone.setAngle(original.angle);

    // Copy ALL data properties dynamically
    const allData = original.data.getAll();
    for (const [key, value] of Object.entries(allData)) {
      clone.setData(key, value);
    }

    // Override clone-specific fields
    clone.setData('gameSpriteId', cloneId);
    clone.setData('isClone', true);
    clone.setData('cloneParentId', originalId);

    this.gameLayer.add(clone);
    this.gameSprites.set(cloneId, clone);

    // Register in clone registry
    if (!this.cloneRegistry.has(originalId)) {
      this.cloneRegistry.set(originalId, []);
    }
    this.cloneRegistry.get(originalId)!.push(cloneId);

    return cloneId;
  }

  /** Returns [spriteId, ...cloneIds] for iterating a sprite and its clones. */
  public getSpriteAndClones(spriteId: string): string[] {
    const clones = this.cloneRegistry.get(spriteId) ?? [];
    return [spriteId, ...clones];
  }

  /** Delete a clone, removing it from the scene and registry. */
  public deleteClone(cloneId: string): void {
    const sprite = this.gameSprites.get(cloneId);
    if (!sprite || !sprite.getData('isClone')) return;

    const parentId = sprite.getData('cloneParentId') as string;
    const clones = this.cloneRegistry.get(parentId);
    if (clones) {
      const idx = clones.indexOf(cloneId);
      if (idx !== -1) clones.splice(idx, 1);
    }

    sprite.destroy();
    this.gameSprites.delete(cloneId);
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

  private getJustPressed(key: Phaser.Input.Keyboard.Key) {
    if (this.justPressedKeys.includes(key)) {
      return true;
    }
    if (Phaser.Input.Keyboard.JustDown(key)) {
      this.justPressedKeys.push(key);
      return true;
    }
    return false;
  }

  private getJustReleased(key: Phaser.Input.Keyboard.Key) {
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

  private applyArrowAxisInput(
    sprite: Phaser.GameObjects.Sprite,
    speed: number,
    negativeKey: Phaser.Input.Keyboard.Key,
    positiveKey: Phaser.Input.Keyboard.Key,
    axis: 'x' | 'y',
  ): void {
    if (speed == 0) return;

    const vKey = axis === 'x' ? 'vx' : 'vy';
    if (negativeKey.isDown && positiveKey.isDown) {
      sprite.setData(vKey, 0);
    } else if (negativeKey.isDown) {
      sprite.setData(vKey, -speed);
    } else if (positiveKey.isDown) {
      sprite.setData(vKey, speed);
    } else if (this.getJustReleased(negativeKey) || this.getJustReleased(positiveKey)) {
      sprite.setData(vKey, 0);
    }
  }

  private moveWithArrows(spriteName: string, vx: number, vy: number) {
    const sprite = this.getSprite(spriteName);
    if (!sprite) return;

    this.applyArrowAxisInput(sprite, vx, this.cursors.left, this.cursors.right, 'x');
    this.applyArrowAxisInput(sprite, vy, this.cursors.up, this.cursors.down, 'y');
  }

  // Source - https://stackoverflow.com/q/35271222
  // Posted by Matthew Spence, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-02-19, License - CC BY-SA 4.0

  private getMovementAngle(spriteName: string) {
    const sprite = this.getSprite(spriteName);
    if (sprite) {
      const x = this.getVelocityX(sprite);
      const y = this.getVelocityY(sprite);
      if (x == 0 && y == 0) {
        return 0;
      }
      const angle = Math.atan2(y, x);
      const degrees = 180 * angle / Math.PI;
      return (90 + degrees) % 360;
    }
    return 0;
  }

}
