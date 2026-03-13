import { useGeckodeStore } from '@/stores/geckodeStore';

export type SpriteType = { id: string; name: string };

/** Sentinel for "None" in the UI dropdown - not stored, maps to null */
export const SPRITE_TYPE_NONE = '';

export const DEFAULT_SPRITE_TYPES: SpriteType[] = [
  { id: 'sprite_type_player', name: 'player' },
  { id: 'sprite_type_enemy', name: 'enemy' },
  { id: 'sprite_type_collectible', name: 'collectible' },
];

export const DEFAULT_SPRITE_TYPE_ID = 'sprite_type_player';

export type SpriteDefinition = {
  id: string;
  name: string;
  textureName: string;
};

export type SpriteInstance = SpriteDefinition & {
  x: number;
  y: number;
  enabled: boolean;
  scaleX: number;
  scaleY: number;
  direction: number;
  snapToGrid: boolean;
  spriteTypeId: string | null;
  physics?: SpritePhysics;
};

export type SpritePhysics = {
  pushesObjects: boolean;
  pushable: boolean;
  collidesWithWalls: boolean;
  isSolid: boolean;
  gravityY: number;
  bounce: number;
  drag: number;
  collideWorldBounds: boolean;
};

export const getSpriteDropdownOptions = (): string[][] => {
  const { spriteInstances } = useGeckodeStore.getState();
  const options: string[][] = [];

  if (spriteInstances.length == 0) options.push([' ', '__hero__']);
  for (const sprite of spriteInstances) options.push([sprite.name, sprite.id]);

  return options;
};

export const createSpriteName = (name: string): string => {
  const { spriteInstances } = useGeckodeStore.getState();
  const count = spriteInstances.filter((sprite) => sprite.name === name).length;

  if (count === 0) return name;
  if (isNaN(parseInt(name[name.length - 1]))) return createSpriteName(`${name}2`);

  const lastDigit = parseInt(name[name.length - 1]);
  return createSpriteName(`${name.slice(0, -1)}${lastDigit + 1}`);
};
