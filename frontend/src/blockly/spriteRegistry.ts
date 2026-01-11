type SpriteDropdownSource = {
  id: string;
  variableName: string;
  label?: string;
};

let spriteList: SpriteDropdownSource[] = [];

export const setSpriteDropdownOptions = (sprites: SpriteDropdownSource[]) => {
  spriteList = sprites;
};

export const getSpriteDropdownOptions = (): string[][] => {
  console.log('getSpriteDropdownOptions()', spriteList);
  const seen = new Set<string>();
  const options: string[][] = [];

  // Keep the original single-sprite default available for backwards compatibility.
  // options.push(['player', '__player__']);
  if (spriteList.length == 0) {
    options.push([' ', '__hero__']);
  }

  for (const sprite of spriteList) {
    const value = sprite.variableName?.trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    const display = sprite.label ? `${sprite.label} (${value})` : value;
    options.push([display, value]);
  }
  console.log('options', options);

  return options;
};
