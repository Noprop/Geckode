import * as Phaser from 'phaser';
import { EventBus } from '@/phaser/EventBus';
import { EDITOR_SCENE_KEY } from '@/phaser/sceneKeys';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { SpriteInstance } from '@/blockly/spriteRegistry';

export default class EditorScene extends Phaser.Scene {
  public key: string;
  private readonly SPRITE_DEPTH = 10;
  private readonly TILEMAP_DEPTH = 5;
  private readonly TILE_SIZE = 32;
  private editorSprites = new Map<string, Phaser.Physics.Arcade.Sprite>();
  private spriteLayer: Phaser.GameObjects.Layer | null = null;
  private tilemapLayer: Phaser.Tilemaps.TilemapLayer | null = null;
  private gridGraphics: Phaser.GameObjects.Graphics | null = null;

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
    const { spriteInstances, assetTextures } = useGeckodeStore.getState();
    for (const instance of spriteInstances) {
      console.log('preloading texture: ', instance.textureName);
      const base64Image = assetTextures[instance.textureName];
      if (!base64Image || this.textures.exists(instance.textureName)) continue;
      this.load.image(instance.textureName, base64Image);
    }
  }

  /** Queue a texture load and return a promise that resolves once it's in the cache. */
  public loadTextureAsync(name: string, base64Image: string): Promise<void> {
    if (this.textures.exists(name)) return Promise.resolve();
    return new Promise<void>((resolve) => {
      this.load.once('complete', () => resolve());
      this.load.image(name, base64Image);
      this.load.start();
    });
  }

  /**
   * Safely replace an existing texture without crashing sprites that reference it.
   * Hides affected sprites, removes the old texture, loads the new one,
   * then re-binds and reveals them. Falls back to loadTextureAsync if the
   * texture doesn't exist yet.
   */
  public async updateTextureAsync(name: string, base64Image: string): Promise<void> {
    if (!this.textures.exists(name)) {
      return this.loadTextureAsync(name, base64Image);
    }

    // Collect every sprite using this texture and hide it so Phaser
    // won't try to render a destroyed GL texture between frames.
    const affected: Phaser.Physics.Arcade.Sprite[] = [];
    for (const sprite of this.editorSprites.values()) {
      if (sprite.texture.key === name) {
        sprite.setVisible(false);
        affected.push(sprite);
      }
    }

    this.textures.remove(name);
    await this.loadTextureAsync(name, base64Image);

    // Re-bind the freshly loaded texture and show the sprites again.
    for (const sprite of affected) {
      sprite.setTexture(name);
      sprite.setVisible(true);
    }
  }

  async create() {
    // this.showGrid();
    this.spriteLayer = null;
    this.tilemapLayer = null;
    this.gridGraphics = null;
    this.editorSprites.clear();

    this.spriteLayer = this.add.layer();
    this.spriteLayer.setDepth(this.SPRITE_DEPTH);

    this.initEventListeners();

    // create sprites
    for (const instance of useGeckodeStore.getState().spriteInstances) {
      this.createSprite(instance);
    }

    this.cameras.main.centerOn(0, 0);
    EventBus.emit('current-scene-ready', this);
  }
  update() {}

  // -- Sprite management -- //
  public createSprite(instance: SpriteInstance) {
    if (!this.spriteLayer) return;
    const sprite = this.physics.add.sprite(instance.x, instance.y, instance.textureName);
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
    if (updates.direction !== undefined) sprite.setAngle(updates.direction - 90);
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

  private isPointerInBounds(pointer: Phaser.Input.Pointer): boolean {
    return pointer.x >= 0 && pointer.x <= this.scale.width && pointer.y >= 0 && pointer.y <= this.scale.height;
  }

  private initEventListeners() {
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
      if (this.isPointerInBounds(pointer)) {
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
