import Phaser from 'phaser';
import { EventBus } from '@/phaser/EventBus';
import { useEditorStore } from '@/stores/editorStore';

export const EDITOR_SCENE_KEY = 'EditorScene' as const;
import GAME_SCENE_KEY from '@/phaser/scenes/GameScene';

export default class EditorScene extends Phaser.Scene {
  public key: string;
  private editorSprites = new Map<string, Phaser.Physics.Arcade.Sprite>();
  private static readonly EDITOR_SPRITE_BASE_DEPTH = Number.MAX_SAFE_INTEGER - 100;
  private editorLayer!: Phaser.GameObjects.Layer;
  private activeDrag: {
    sprite: Phaser.Physics.Arcade.Sprite;
    start: { x: number; y: number };
    lastWorld: { x: number; y: number };
  } | null = null;
  private gridGraphics: Phaser.GameObjects.Graphics | null = null;

  constructor() {
    super(EDITOR_SCENE_KEY);
    this.key = EDITOR_SCENE_KEY;
  }

  preload() {
    const textures = useEditorStore.getState().spriteTextures;
    for (const [textureName, textureUrl] of textures.entries()) {
      this.load.image(textureName, textureUrl);
    }
  }

  public changeScene() {
    this.scene.start(GAME_SCENE_KEY as unknown as string);
  }

  async create() {
    this.showGrid();

    this.editorSprites.clear();
    this.gridGraphics = null; // Reset on scene restart

    // Dedicated layer to keep editor sprites above all game objects.
    this.editorLayer = this.add.layer();
    this.editorLayer.setDepth(EditorScene.EDITOR_SPRITE_BASE_DEPTH);

    this.registerDragEvents();

    // Set up pause state listener for grid visibility BEFORE telling React scene is ready
    this.setupGridListener();
    try {
      await this.load.image('hero-walk-front', '/heroWalkFront1.bmp');
    } catch (error) {
      console.error('Error loading image', error);
    }

    const spriteInstances = useEditorStore.getState().spriteInstances;
    for (const instance of spriteInstances) {
      this.createSprite(instance.textureName, instance.x, instance.y, instance.id);
    }
    // Tell React which scene is active (will trigger pause state sync)
    EventBus.emit('current-scene-ready', this);
  }

  private pauseHandler = (isPaused: boolean) => {
    if (isPaused) {
      this.showGrid();
    } else {
      this.hideGrid();
    }
  };

  private setupGridListener(): void {
    // Remove existing listener to prevent duplicates on scene restart
    EventBus.off('editor-pause-changed', this.pauseHandler);
    EventBus.on('editor-pause-changed', this.pauseHandler);
  }

  public createSprite(textureName: string, x: number, y: number, id: string) {
    const sprite = this.physics.add.sprite(x, y, textureName);
    sprite.setName(id);
    sprite.setData('editorSpriteId', id);
    sprite.setDepth(EditorScene.EDITOR_SPRITE_BASE_DEPTH);
    this.editorLayer.add(sprite);
    this.editorLayer.bringToTop(sprite);
    this.enableSpriteDragging(sprite);
    this.editorSprites.set(id, sprite);

    // TODO: Add collision detection
    // this.player.setCollideWorldBounds(true);

    // console.log(this.scene)
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
    this.drawGrid();
    if (this.gridGraphics) {
      this.gridGraphics.setVisible(true);
    }
  }

  public hideGrid(): void {
    if (this.gridGraphics) {
      this.gridGraphics.setVisible(false);
    }
  }

  update() {}

  private enableSpriteDragging(sprite: Phaser.Physics.Arcade.Sprite) {
    sprite.setInteractive({ cursor: 'grab' });
    this.input.setDraggable(sprite);
  }

  private registerDragEvents() {
    this.input.dragDistanceThreshold = 0;

    this.input.on('dragstart', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
      const sprite = gameObject as Phaser.Physics.Arcade.Sprite;
      const editorId = sprite.getData('editorSpriteId');
      if (!editorId) return;
      this.activeDrag = {
        sprite,
        start: { x: sprite.x, y: sprite.y },
        lastWorld: { x: sprite.x, y: sprite.y },
      };
      sprite.setDepth(EditorScene.EDITOR_SPRITE_BASE_DEPTH);
      this.editorLayer.bringToTop(sprite);
      this.attachGlobalDragListeners();
    });

    this.input.on('drag', (pointer: Phaser.Input.Pointer) => {
      this.updateDragPositionFromEvent(pointer.event as PointerEvent | undefined, pointer);
    });

    this.input.on(
      'dragend',
      (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, _dragX: number, _dragY: number) => {
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

  private updateDragPositionFromEvent(event?: PointerEvent, pointer?: Phaser.Input.Pointer) {
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

    sprite.setDepth(EditorScene.EDITOR_SPRITE_BASE_DEPTH);
    this.activeDrag = null;
    this.detachGlobalDragListeners();
  }
}
