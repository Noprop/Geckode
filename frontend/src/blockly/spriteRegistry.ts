type SpriteDropdownSource = {
  id: string;
  variableName: string;
  label?: string;
};

let spriteOptions: SpriteDropdownSource[] = [];

export const setSpriteDropdownOptions = (sprites: SpriteDropdownSource[]) => {
  spriteOptions = sprites;
};

export const getSpriteDropdownOptions = (): string[][] => {
  const seen = new Set<string>();
  const options: string[][] = [];

  // Keep the original single-sprite default available for backwards compatibility.
  options.push(['player', '__player__']);

  for (const sprite of spriteOptions) {
    const value = sprite.variableName?.trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    const display = sprite.label
      ? `${sprite.label} (${value})`
      : value;
    options.push([display, value]);
  }

  return options;
};
