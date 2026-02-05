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
    for (const sprite of useGeckodeStore.getState().spriteInstances) {
      this.createSprite(sprite.id, sprite.x, sprite.y, sprite.textureName);
    }

    this.cameras.main.centerOn(0, 0);
    EventBus.emit('current-scene-ready', this);
  }
  update() {}

  // -- Sprite management -- //
  public createSprite(id: string, x: number, y: number, textureName: string) {
    if (!this.spriteLayer) return;
    const sprite = this.physics.add.sprite(x, y, textureName);
    sprite.setName(id);
    sprite.setDepth(this.SPRITE_DEPTH);
    this.spriteLayer.add(sprite);
    this.spriteLayer.bringToTop(sprite);
    this.editorSprites.set(id, sprite);
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

    sprite.setPosition(updates.x ?? sprite.x, updates.y ?? sprite.y);

    if (updates.visible !== undefined) sprite.setVisible(updates.visible);
    if (updates.size !== undefined) sprite.setScale(updates.size / 100);
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

  private initEventListeners() {
    // may have to adjust this down the line for tilemaps
    this.input.on('dragstart', (_pointer: Phaser.Input.Pointer, sprite: Phaser.Physics.Arcade.Sprite) => {
      this.activeDrag = {
        sprite,
        startPos: { x: sprite.x, y: sprite.y },
        currentPos: { x: sprite.x, y: sprite.y },
      };
      if (this.spriteLayer) this.spriteLayer.bringToTop(sprite);
      EventBus.emit('editor-sprite-drag-start', { id: sprite.name });
    });

    this.input.on('drag', (pointer: Phaser.Input.Pointer, sprite: Phaser.Physics.Arcade.Sprite) => {
      sprite.setPosition(pointer.worldX, pointer.worldY);
      if (!this.activeDrag) return;
      this.activeDrag.currentPos = { x: pointer.worldX, y: pointer.worldY };
      EventBus.emit('editor-sprite-dragging', {
        id: this.activeDrag.sprite.name,
        x: pointer.worldX,
        y: pointer.worldY,
      });
    });

    // this.input.on(
    //   'dragend',
    //   (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, _dragX: number, _dragY: number) => {
    //     this.finishActiveDrag(pointer.event as PointerEvent | undefined);
    //   },
    // );

    // if (typeof window === 'undefined') return;
    // window.addEventListener('pointermove', this.updateDragPositionFromEvent, {
    //   capture: true,
    // });
    // window.addEventListener('pointerup', this.finishActiveDrag, {
    //   capture: true,
    // });
  }

  // private finishActiveDrag(event?: PointerEvent) {
  //   if (!this.activeDrag) return;
  //   // Ensure we have latest position before deciding.
  //   this.updateDragPositionFromEvent(event);

  //   const { sprite, start, lastWorld } = this.activeDrag;
  //   const withinX = lastWorld.x >= 0 && lastWorld.x <= this.scale.width;
  //   const withinY = lastWorld.y >= 0 && lastWorld.y <= this.scale.height;

  //   if (!withinX || !withinY) {
  //     sprite.setPosition(start.x, start.y);
  //   } else {
  //     const finalX = Phaser.Math.Clamp(lastWorld.x, 0, this.scale.width);
  //     const finalY = Phaser.Math.Clamp(lastWorld.y, 0, this.scale.height);
  //     const snappedX = Math.round(finalX);
  //     const snappedY = Math.round(finalY);
  //     sprite.setPosition(snappedX, snappedY);
  //     this.editorLayer.bringToTop(sprite);

  //     EventBus.emit('editor-sprite-moved', {
  //       id: sprite.getData('editorSpriteId'),
  //       x: snappedX,
  //       y: snappedY,
  //     });
  //   }

  //   sprite.setDepth(EditorScene.EDITOR_SPRITE_BASE_DEPTH);
  //   this.activeDrag = null;
  //   this.detachGlobalDragListeners();
  // }
}
