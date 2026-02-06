import React, { useEffect, useState } from "react";
import LibraryBtn from "./modal_subcomponents/LibraryBtn";
import spriteLibrariesApi from "@/lib/api/handlers/spriteLibraries";
import projectsApi from "@/lib/api/handlers/projects";
import { SpriteLibrary } from "@/lib/types/api/sprite-libraries";
import { Sprite } from "@/lib/types/api/sprite-libraries/sprites";
import { useParams } from "next/navigation";
import DevSpritesPanel from "./DevSpritesPanel";
import { Button } from "../ui/Button";
import SpriteBtn from "./modal_subcomponents/SpriteBtn";

const SpriteLibraryPanel = () => {
  const projectID = Number(useParams().projectID);

  /* "libraries" => libraries view
     [number, "public" | "project"] (corresponds to sprite library id 
     and type of library pulled from) => shows sprites in library */
  // TODO: Remove "disk" mode for production
  const [panelMode, setPanelMode] = useState<"libraries" | [SpriteLibrary, "public" | "project"] | "disk">("libraries");
  const [publicLibs, setPublicLibs] = useState<SpriteLibrary[]>([]);
  const [projectLibs, setProjectLibs] = useState<SpriteLibrary[]>([]);
  const [modal, setModal] = useState<"none" | "addLib" | "delLib" | "addSprite" | "delSprite">("none");

  // for sprite library view (public = available to everybody, project = for this project only)
  const [spritesInCurrLib, setSpritesInCurrLib] = useState<Sprite[]>([]);

  useEffect(() => {
    if (panelMode === "libraries") {
      // get public libs
      spriteLibrariesApi.list().then((res) => setPublicLibs(res.results));

      // get project-specific libs
      projectsApi(projectID)
        .spriteLibrariesApi.list()
        .then((res) => setProjectLibs(res.results));
    } else if (panelMode !== "disk") {
      // reminder: panelMode now represents the current spriteLibID and whether its private or public
      const [lib, libType] = panelMode;
      if (libType === "public") {
        spriteLibrariesApi(lib.id)
          .spritesApi.list()
          .then((res) => setSpritesInCurrLib(res.results));
      } else {
        projectsApi(projectID)
          .spriteLibrariesApi(lib.id)
          .spritesApi.list()
          .then((res) => setSpritesInCurrLib(res.results));
      }
    }
  }, [panelMode]);

  const addSpriteToProject = () => {};

  return (
    <>
      <div className="flex-1 min-h-0 overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-4 dark:border-slate-700 dark:bg-dark-tertiary">
        {/** Libraries Panel */}
        {panelMode === "libraries" ? (
          <>
            {projectLibs.length > 0 ? (
              <>
                <h2 className="header-2">Project Libraries:</h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  {projectLibs.map((lib) => (
                    <LibraryBtn
                      key={lib.id}
                      spriteLibrary={lib}
                      spriteApi={projectsApi(projectID).spriteLibrariesApi(lib.id).spritesApi}
                      onClick={() => setPanelMode([lib, "project"])}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="w-full text-center">No libraries assigned to your project.</p>
            )}

            {publicLibs.length > 0 ? (
              <>
                <h2 className="header-2">Public Libraries:</h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  {publicLibs.map((lib) => (
                    <LibraryBtn
                      key={lib.id}
                      spriteLibrary={lib}
                      spriteApi={spriteLibrariesApi(lib.id).spritesApi}
                      onClick={() => setPanelMode([lib, "public"])}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="w-full text-center">No public libraries available</p>
            )}
            <h2 className="header-2">Disk (for development only):</h2>
            <div className="flex flex-wrap gap-4 mb-6">
              <LibraryBtn spriteLibrary={{ id: 999, name: "Disk" }} onClick={() => setPanelMode("disk")} />
            </div>
          </>
        ) : panelMode === "disk" /** Dev Panel (TODO: Remove for production)*/ ? (
          <DevSpritesPanel />
        ) : (
          /** Sprites Panel */
          <>
            <h2 className="header-2">{`Sprites in "${panelMode[0].name}":`}</h2>
            <div className="flex flex-wrap gap-4 mb-6">
              {spritesInCurrLib.map((spr) => (
                <SpriteBtn key={spr.id} sprite={spr} onClick={() => addSpriteToProject()} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="h-14 align-middle flex bg-light-primary dark:bg-dark-secondary w-full border border-slate-300 dark:border-slate-700">
        <Button
          className={"btn-neutral ml-3 my-auto "}
          disabled={panelMode === "libraries"}
          onClick={() => setPanelMode("libraries")}
        >
          Back
        </Button>
      </div>
    </>
  );
};

export default SpriteLibraryPanel;
