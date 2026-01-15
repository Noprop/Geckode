import { useSpriteStore } from '@/stores/spriteStore';

export type Sprite = {
  id: string;
  textureName: string;
  name: string;
  x: number;
  y: number;
  visible?: boolean;
  size?: number;
  direction?: number;
  snapToGrid?: boolean;
};

export const getSpriteDropdownOptions = (): string[][] => {
  const { spriteInstances } = useSpriteStore.getState();
  const options: string[][] = [];

  if (spriteInstances.length == 0) options.push([' ', '__hero__']);
  for (const sprite of spriteInstances) options.push([sprite.name, sprite.id]);

  return options;
};

export const createSpriteName = (name: string): string => {
  const { spriteInstances } = useSpriteStore.getState();
  const count = spriteInstances.filter((sprite) => sprite.name === name).length;

  if (count === 0) return name;
  if (isNaN(parseInt(name[name.length - 1]))) return createSpriteName(`${name}2`);

  const lastDigit = parseInt(name[name.length - 1]);
  return createSpriteName(`${name.slice(0, -1)}${lastDigit + 1}`);
};
