import colors from "tailwindcss/colors";

type TailwindColors = typeof colors;

type ColorName = {
  [K in keyof TailwindColors]: TailwindColors[K] extends Record<string, string> ? K : never;
}[keyof TailwindColors];

type ColorShade<T extends ColorName> = keyof TailwindColors[T];

type ColorSelection = {
  [K in ColorName]: [K, ColorShade<K>];
}[ColorName];

export const CLIENT_COLOURS: ColorSelection[] = [
  ["red", "500"],
  ["blue", "800"],
  ["green", "800"],
  ["purple", "500"],
  ["pink", "500"],
  ["cyan", "500"],
] as const;

export const getClientColourHex = (i: number) => {
  const [colour, shade] = CLIENT_COLOURS[i % CLIENT_COLOURS.length];
  return colors[colour][shade];
};

export const getClientColourTailwind = (i: number) => {
  const [colour, shade] = CLIENT_COLOURS[i % CLIENT_COLOURS.length];
  return `${colour}-${shade}`;
}