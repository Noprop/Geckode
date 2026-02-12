import { createBaseApi } from "../base";

import { Asset, AssetFilters, AssetPayload } from "@/lib/types/api/assets/index";

export const TEXTURE_URL = "assets/"


const assetsApi = createBaseApi<Asset, AssetPayload, AssetFilters>({
    baseUrl: TEXTURE_URL
  })();

export default assetsApi;
