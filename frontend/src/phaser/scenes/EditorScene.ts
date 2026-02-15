import * as Phaser from 'phaser';
import { EventBus } from '@/phaser/EventBus';
import { EDITOR_SCENE_KEY } from '@/phaser/sceneKeys';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { SpriteInstance } from '@/blockly/spriteRegistry';

export default class EditorScene extends Phaser.Scene {
  public key: string;
  private readonly SPRITE_DEPTH = 10;
  private readonly TILE_SIZE = 16;
  private editorSprites = new Map<string, Phaser.Physics.Arcade.Sprite>();
  private spriteLayer: Phaser.GameObjects.Layer | null = null;
  private tilemap: Phaser.Tilemaps.Tilemap | null = null;
  private tilemapLayer: Phaser.Tilemaps.TilemapLayer | null = null;
  private tileKeyToIndex: Map<string, number> = new Map();
  private static readonly TILESET_KEY = 'editor-tileset';
  private gridGraphics: Phaser.GameObjects.Graphics | null = null;
  private handleUpdateTilemap: (() => void) | null = null;

  private activeDrag: {
    sprite: Phaser.Physics.Arcade.Sprite;
    startPos: { x: number; y: number };
    currentPos: { x: number; y: number };
  } | null = null;

  constructor() {
    super(EDITOR_SCENE_KEY);
    this.key = EDITOR_SCENE_KEY;
  }

  // -- Phaser methods -- //
  preload() {
    const { spriteInstances, textures } = useGeckodeStore.getState();
    for (const instance of spriteInstances) {
      console.log('preloading texture: ', instance.textureName);
      const base64Image = textures[instance.textureName];
      if (!base64Image || this.textures.exists(instance.textureName)) continue;
      this.load.image("sprite-" + instance.textureName, base64Image);
    }

    for (const tile of Object.keys(useGeckodeStore.getState().tiles)) {
      const base64Image = useGeckodeStore.getState().tiles[tile];
      if (!base64Image || this.textures.exists(tile)) continue;
      this.load.image("tile-" + tile, base64Image);
    }
  }

  async create() {
    this.spriteLayer = null;
    this.tilemapLayer = null;
    this.gridGraphics = null;
    this.editorSprites.clear();

    this.generateTilesetTexture();

    const { tilemaps } = useGeckodeStore.getState();
    this.createTilemap(tilemaps['tilemap_1'].data);

    this.spriteLayer = this.add.layer();
    this.spriteLayer.setDepth(this.SPRITE_DEPTH);

    this.initEventListeners();

    // create sprites
    for (const instance of useGeckodeStore.getState().spriteInstances) {
      this.createSprite(instance);
    }

    this.cameras.main.centerOn(this.scale.width/2, -this.scale.height/2);
    EventBus.emit('current-scene-ready', this);
  }
  update() {}

  // -- Sprite management -- //
  public createSprite(instance: SpriteInstance) {
    if (!this.spriteLayer) return;
    const sprite = this.physics.add.sprite(instance.x, instance.y, 'sprite-' +instance.textureName);
    sprite.setData('spriteId', instance.id);
    sprite.setDepth(this.SPRITE_DEPTH);
    sprite.setScale(instance.scaleX, instance.scaleY);
    sprite.setVisible(instance.visible);
    sprite.setAngle(instance.direction);
    this.spriteLayer.add(sprite);
    this.spriteLayer.bringToTop(sprite);
    this.editorSprites.set(instance.id, sprite);
    sprite.setInteractive({ cursor: 'grab' });
    this.input.setDraggable(sprite);
  }
  public removeSprite(id: string) {
    const sprite = this.editorSprites.get(id);
    if (!sprite) return;
    sprite.destroy();
    this.editorSprites.delete(id);
  }
  public removeSprites() {
    for (const sprite of this.editorSprites.values()) sprite.destroy();
    this.editorSprites.clear();
  }
  public updateSprite(id: string, updates: Partial<SpriteInstance>): void {
    const sprite = this.editorSprites.get(id);
    if (!sprite) return;

    console.log('setting sprite position: ', updates.x, updates.y);
    sprite.setPosition(updates.x ?? sprite.x, updates.y ?? sprite.y);

    if (updates.visible !== undefined) sprite.setVisible(updates.visible);
    if (updates.scaleX !== undefined || updates.scaleY !== undefined) {
      sprite.setScale(updates.scaleX ?? sprite.scaleX, updates.scaleY ?? sprite.scaleY);
    }
    if (updates.direction !== undefined) sprite.setAngle(updates.direction);
  }

  // -- Texture management -- //
  public loadSpriteTextureAsync(name: string, base64Image: string): Promise<void> {
    return this.loadTextureAsync("sprite-" + name, base64Image);
  }
  public loadTileTextureAsync(name: string, base64Image: string): Promise<void> {
    return this.loadTextureAsync("tile-" + name, base64Image);
  }
  public loadTextureAsync(name: string, base64Image: string): Promise<void> {
    if (this.textures.exists(name)) return Promise.resolve();
    return new Promise<void>((resolve) => {
      this.load.once('complete', () => resolve());
      this.load.image(name, base64Image);
      this.load.start();
    });
  }

  public updateSpriteTextureAsync(name: string, base64Image: string): Promise<void> {
    return this.updateTextureAsync("sprite-" + name, base64Image);
  }
  public updateTileTextureAsync(name: string, base64Image: string): Promise<void> {
    return this.updateTextureAsync("tile-" + name, base64Image);
  }
  public async updateTextureAsync(name: string, base64Image: string): Promise<void> {
    // Collect every sprite using this texture and hide it so Phaser
    // won't try to render a destroyed GL texture between frames.
    const affected: Phaser.Physics.Arcade.Sprite[] = [];
    for (const sprite of this.editorSprites.values()) {
      if (sprite.texture.key === name && sprite.visible) {
        console.log('sprite texture fix', sprite.name);
        sprite.setVisible(false);
        affected.push(sprite);
      }
    }

    if (this.textures.exists(name)) {
      this.textures.remove(name);
    }

    await this.loadTextureAsync(name, base64Image);
    console.log('after sync update texture');

    for (const sprite of affected) {
      sprite.setTexture(name);
      sprite.setVisible(true);
    }
  }

  // -- Grid management -- //
  private drawGrid(): void {
    const width = this.scale.width;
    const height = this.scale.height;
    const gridSpacing = 32;

    if (!this.gridGraphics) {
      this.gridGraphics = this.add.graphics();
      this.gridGraphics.setDepth(0);
    }

    this.gridGraphics.clear();
    this.gridGraphics.lineStyle(2, 0xffffff, 0.2);

    for (let x = gridSpacing; x < width; x += gridSpacing) {
      this.gridGraphics.beginPath();
      this.gridGraphics.moveTo(x, 0);
      this.gridGraphics.lineTo(x, height);
      this.gridGraphics.strokePath();
    }
    for (let y = gridSpacing; y < height; y += gridSpacing) {
      this.gridGraphics.beginPath();
      this.gridGraphics.moveTo(0, y);
      this.gridGraphics.lineTo(width, y);
      this.gridGraphics.strokePath();
    }

    // Thick center axes: TODO
    //   this.gridGraphics.lineStyle(2, 0xffffff, 0.8);
    //   this.gridGraphics.beginPath();
    //   this.gridGraphics.moveTo(centerX, 0);
    //   this.gridGraphics.lineTo(centerX, height);
    //   this.gridGraphics.strokePath();
    //   this.gridGraphics.beginPath();
    //   this.gridGraphics.moveTo(0, centerY);
    //   this.gridGraphics.lineTo(width, centerY);
    //   this.gridGraphics.strokePath();
  }
  public showGrid(): void {
    this.drawGrid();
    if (this.gridGraphics) this.gridGraphics.setVisible(true);
  }
  public hideGrid(): void {
    if (this.gridGraphics) this.gridGraphics.setVisible(false);
  }

  private generateTilesetTexture(): void {
    const { tiles } = useGeckodeStore.getState();
    const tileKeys = Object.keys(tiles);

    // Build mapping: index 0 = empty, 1+ = each tile key
    this.tileKeyToIndex.clear();
    for (let i = 0; i < tileKeys.length; i++) {
      this.tileKeyToIndex.set(tileKeys[i], i + 1);
    }

    const totalSlots = tileKeys.length + 1; // +1 for empty tile at index 0
    const stripWidth = totalSlots * this.TILE_SIZE;

    // Remove previous tileset texture if it exists
    if (this.textures.exists(EditorScene.TILESET_KEY)) {
      this.textures.remove(EditorScene.TILESET_KEY);
    }

    const dt = this.textures.addDynamicTexture(
      EditorScene.TILESET_KEY,
      stripWidth,
      this.TILE_SIZE,
      false,
    );
    if (!dt) return;

    // Index 0 is left transparent (empty tile)
    // Stamp each tile texture at its index position
    for (let i = 0; i < tileKeys.length; i++) {
      const textureKey = 'tile-' + tileKeys[i];
      if (!this.textures.exists(textureKey)) continue;
      dt.stamp(textureKey, undefined, (i + 1) * this.TILE_SIZE, 0, {
        originX: 0,
        originY: 0,
      });
    }

    dt.render();
  }

  private createTilemap(tilemap: (string | null)[][]): void {
    const tileSize = this.TILE_SIZE;

    // Clean up previous tilemap/layer
    if (this.tilemapLayer) {
      this.tilemapLayer.destroy();
      this.tilemapLayer = null;
    }
    if (this.tilemap) {
      this.tilemap.destroy();
      this.tilemap = null;
    }

    // Convert string keys to numeric indices using tileKeyToIndex
    const numericData: number[][] = tilemap.map((row) =>
      row.map((cell) => {
        if (!cell) return 0;
        return this.tileKeyToIndex.get(cell) ?? 0;
      }),
    );

    // Create tilemap from numeric data
    this.tilemap = this.make.tilemap({
      data: numericData,
      tileWidth: tileSize,
      tileHeight: tileSize,
    });

    // Add tileset image
    const tileset = this.tilemap.addTilesetImage(
      EditorScene.TILESET_KEY,
      EditorScene.TILESET_KEY,
      tileSize,
      tileSize,
      0,
      0,
    );
    if (!tileset) return;

    // Center the map around (0, 0)
    const mapPixelWidth = tilemap[0].length * tileSize;
    const mapPixelHeight = tilemap.length * tileSize;

    const layer = this.tilemap.createLayer(
      0,
      tileset,
      0,
      -mapPixelHeight,
    );
    if (layer) {
      this.tilemapLayer = layer as Phaser.Tilemaps.TilemapLayer;
      this.tilemapLayer.setDepth(0); // Below sprites at depth 10
    }
  }

  shutdown() {
    if (this.handleUpdateTilemap) {
      EventBus.off('update-tilemap', this.handleUpdateTilemap);
      this.handleUpdateTilemap = null;
    }
  }

  private initEventListeners() {
    this.handleUpdateTilemap = () => {
      const { tilemaps } = useGeckodeStore.getState();
      this.generateTilesetTexture();
      this.createTilemap(tilemaps['tilemap_1'].data);
    };
    EventBus.on('update-tilemap', this.handleUpdateTilemap);

    // may have to adjust this down the line for tilemaps
    this.input.on('dragstart', (_pointer: Phaser.Input.Pointer, sprite: Phaser.Physics.Arcade.Sprite) => {
      this.activeDrag = {
        sprite,
        startPos: { x: sprite.x, y: sprite.y },
        currentPos: { x: sprite.x, y: sprite.y },
      };
      if (this.spriteLayer) this.spriteLayer.bringToTop(sprite);
      EventBus.emit('editor-sprite-drag-start', { id: sprite.getData('spriteId') });
    });

    this.input.on('drag', (pointer: Phaser.Input.Pointer, sprite: Phaser.Physics.Arcade.Sprite) => {
      if (!this.activeDrag) return;
      sprite.setPosition(pointer.worldX, pointer.worldY);
      this.activeDrag.currentPos = { x: pointer.worldX, y: pointer.worldY };
      EventBus.emit('editor-sprite-dragging', {
        x: pointer.worldX,
        y: pointer.worldY,
      });
    });

    this.input.on('gameout', (_time: number, event: MouseEvent) => {
      if (!this.activeDrag || !this.game.canvas) return;

      const rect = this.game.canvas.getBoundingClientRect();

      // event.clientX/clientY are the actual exit coordinates (not stale)
      const clampedX = Phaser.Math.Clamp(event.clientX - rect.left, 0, rect.width);
      const clampedY = Phaser.Math.Clamp(event.clientY - rect.top, 0, rect.height);

      // Scale from DOM pixel space to game viewport space
      const gameX = (clampedX / rect.width) * this.scale.width;
      const gameY = (clampedY / rect.height) * this.scale.height;

      // Convert canvas coordinates to game coordinates
      const worldPoint = this.cameras.main.getWorldPoint(gameX, gameY);

      this.activeDrag.sprite.setPosition(worldPoint.x, worldPoint.y);
      this.activeDrag.currentPos = { x: worldPoint.x, y: worldPoint.y };
      EventBus.emit('editor-sprite-dragging', {
        id: this.activeDrag.sprite.getData('spriteId'),
        x: worldPoint.x,
        y: worldPoint.y,
      });
    });

    this.input.on('dragend', (pointer: Phaser.Input.Pointer, sprite: Phaser.Physics.Arcade.Sprite) => {
      if (!this.activeDrag) return;
      if (pointer.x >= 0 && pointer.x <= this.scale.width && pointer.y >= 0 && pointer.y <= this.scale.height) {
        EventBus.emit('editor-sprite-drag-end', {
          id: sprite.getData('spriteId'),
          x: pointer.worldX,
          y: pointer.worldY,
        });
      } else {
        sprite.setPosition(this.activeDrag.startPos.x, this.activeDrag.startPos.y);
        EventBus.emit('editor-sprite-drag-end', {
          id: sprite.getData('spriteId'),
          x: this.activeDrag.startPos.x,
          y: this.activeDrag.startPos.y,
        });
      }
      this.activeDrag = null;
    });
  }
}
