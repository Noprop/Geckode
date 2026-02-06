import { createBaseApi } from "../base";

import { SpriteLibrary, SpriteLibraryFilters, SpriteLibraryPayload } from "@/lib/types/api/sprite-libraries";
import { Sprite, SpriteFilters, SpritePayload } from "@/lib/types/api/sprite-libraries/sprites";

export const SPRITE_LIB_URL = "sprite_libraries/"
export const SPRITE_URL = "sprites/"

export const spritesApi = (id : number | string) => `${SPRITE_LIB_URL}${id}/${SPRITE_URL}`


const spriteLibrariesApi = createBaseApi<SpriteLibrary, SpriteLibraryPayload, SpriteLibraryFilters>({
  baseUrl: SPRITE_LIB_URL
})({
  spritesApi: (id: number | string) => createBaseApi<Sprite, SpritePayload, SpriteFilters>({
    baseUrl: spritesApi(id)
  })(),
});

export default spriteLibrariesApi;