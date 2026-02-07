import { createBaseApi } from "../base";

import { Sprite, SpriteFilters, SpritePayload } from "@/lib/types/api/sprites/index";

export const SPRITE_URL = "sprites/"


const spritesApi = createBaseApi<Sprite, SpritePayload, SpriteFilters>({
    baseUrl: SPRITE_URL
  })();

export default spritesApi;
