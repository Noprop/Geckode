import React, { useCallback, useEffect, useState } from "react";
import { TabId } from "./SpriteModal";
import { useGeckodeStore } from "@/stores/geckodeStore";
import { Sprite } from "@/lib/types/api/sprites";
import projectsApi from "@/lib/api/handlers/projects";
import spritesApi from "@/lib/api/handlers/sprites";
import { extractAxiosErrMsg } from "@/lib/api/axios";
import { useSnackbar } from "@/hooks/useSnackbar";
import SpriteAssetsLocal from "./SpriteAssets";
import SpriteLibraryLocal from "./SpriteLibrary";
import SpriteBtn from "./modal_subcomponents/SpriteBtn";

/* 
Uses api to grab list of sprites.
Will also forward to local sprites
*/

interface SpriteViewProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const SpriteGridList = ({ activeTab, setActiveTab }: SpriteViewProps) => {
  const setEditingSprite = useGeckodeStore((s) => s.setEditingSprite);
  const removeAssetTexture = useGeckodeStore((s) => s.removeAssetTexture);
  const projectID = useGeckodeStore((s) => s.projectId);
  const showSnackbar = useSnackbar();

  const [assetSprites, setAssetSprites] = useState<Sprite[]>([]);
  const [libSprites, setLibSprites] = useState<Sprite[]>([]);

  // on tab switch, clear the sprites list and use new api to refetch them
  useEffect(() => {
    // fetch assets (per-project use)
    if (projectID)
      projectsApi(projectID)
        .spritesApi.list()
        .then((res) => setAssetSprites(res.results))
        .catch((err) => showSnackbar(extractAxiosErrMsg(err, "Failed to get project assets")));

    // fetch library (public use)
    spritesApi
      .list()
      .then((res) => setLibSprites(res.results))
      .catch((err) => showSnackbar(extractAxiosErrMsg(err, "Failed to get project assets")));
  }, []);

  const handleTextureClick = (textureName: string) => {
    setEditingSprite("asset", textureName);
    setActiveTab("editor");
  };

  const handleDelete = useCallback(
    (e: React.MouseEvent, spr: Sprite) => {
      e.stopPropagation();
      removeAssetTexture(spr.texture);
    },
    [removeAssetTexture],
  );

  return (
    <div className="flex-1 min-h-0 overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-4 dark:border-slate-700 dark:bg-dark-tertiary">
      {activeTab === "assets" && (
        <>
          <div className="flex flex-wrap gap-4">
            {assetSprites.map((spr) => (
              <SpriteBtn
                sprite={spr}
                key={spr.id}
                isPublic={false}
                handleTextureClick={handleTextureClick}
                handleDelete={handleDelete}
              />
            ))}
          </div>
          <h2 className="header-2 mt-4">On Disk</h2>
          <SpriteAssetsLocal setActiveTab={setActiveTab} />
        </>
      )}
      {activeTab === "library" && (
        <>
          <div className="flex flex-wrap gap-4">
            {libSprites.map((spr) => (
              <SpriteBtn
                sprite={spr}
                key={spr.id}
                isPublic={true}
                handleTextureClick={handleTextureClick}
                handleDelete={handleDelete}
              />
            ))}
          </div>
          <h2 className="header-2 mt-4">On Disk</h2>
          <SpriteLibraryLocal setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
};

export default SpriteGridList;
