type SpriteDropdownSource = {
  id: string;
  name: string;
  label?: string;
};

export type SpriteInstance = {
  id: string;
  tid: string;
  name: string;
  x: number;
  y: number;
  visible?: boolean;
  size?: number;
  direction?: number;
  snapToGrid?: boolean;
};

let spriteList: SpriteDropdownSource[] = [];

export const setSpriteDropdownOptions = (sprites: SpriteDropdownSource[]) => {
  spriteList = sprites;
};

export const getSpriteDropdownOptions = (): string[][] => {
  const options: string[][] = [];

  if (spriteList.length == 0) options.push([' ', '__hero__']);
  for (const sprite of spriteList) options.push([sprite.name, sprite.id]);

  return options;
};

export const createSpriteName = (name: string): string => {
  const count = spriteList.filter((instance) => instance.name === name).length;
  if (count === 0) {
    return name;
  }

  if (isNaN(parseInt(name[name.length - 1]))) {
    return createSpriteName(`${name}2`);
  } else {
    const lastDigit = parseInt(name[name.length - 1]);
    return createSpriteName(`${name.slice(0, -1)}${lastDigit + 1}`);
  }
};
