import DragAndDrop, { DragAndDropRef } from "@/components/DragAndDrop";
import { InputBox, InputBoxRef } from "@/components/ui/inputs/InputBox";
import { useSnackbar } from "@/hooks/useSnackbar";
import projectsApi from "@/lib/api/handlers/projects";
import {
  Project,
  ProjectPayload,
  projectPermissions,
} from "@/lib/types/api/projects";
import { User } from "@/lib/types/api/users";
import { useEffect, useRef, useState } from "react";
import { ProjectPermissions } from "@/lib/types/api/projects";
import { Button } from "@/components/ui/Button";

interface Props {
  prj: Project;
  setPrj: React.Dispatch<React.SetStateAction<Project | undefined>>;
  user: User;
}

export const AboutProject = ({ prj, setPrj, user }: Props) => {
  const snackbar = useSnackbar();
  const prjNameRef = useRef<InputBoxRef | null>(null);
  const prjDescRef = useRef<InputBoxRef | null>(null);
  const permissionDropdownView = useRef<HTMLSelectElement | null>(null);
  const dropboxRef = useRef<DragAndDropRef>(null);

  const [slug, setSlug] = useState<string>("");

  useEffect(() => {}, []);

  // submit changes
  const updatePrj = () => {
    // fill out update information if filled out
    const payload: Partial<ProjectPayload> = {};
    if (prjNameRef.current?.inputValue !== "")
      payload.name = prjNameRef.current?.inputValue;

    if (prjDescRef.current?.inputValue !== "")
      payload.description = prjDescRef.current?.inputValue;

    // TODO: make collaboration permissions
    /*if (permissionDropdownView.current)
      payload. = permissionDropdownView.current.value;*/

    prj?.id &&
      projectsApi(prj.id)
        .update(payload)
        .then(() => {
          snackbar("Updated Project!", "success");
        })
        .catch(() => {
          snackbar("Failed to update project!");
        });
  };

  const resetPage = () => {
    prjNameRef.current?.setInputValue("");
    prjDescRef.current?.setInputValue("");
    dropboxRef.current?.setFiles([]);
  };

  return (
    <div className="w-full flex-col">
      <h1>Project Title:</h1>
      <InputBox
        ref={prjNameRef}
        placeholder={prj?.name ?? ""}
        className="bg-white text-black mb-3 border-0 w-full"
      />
      <h1>Project Description:</h1>
      <InputBox
        ref={prjDescRef}
        placeholder={prj?.description ?? ""}
        className="bg-white text-black mb-3 border-0 w-full"
      />
      <h1>Default Permisson:</h1>
      <select
        ref={permissionDropdownView}
        className="bg-white text-black mb-3 p-2 rounded-md"
        defaultValue={prj?.permission ?? ""}
      >
        {Object.entries(projectPermissions).map((p) => (
          <option key={p[0]} value={p[0]}>
            {p.join(" - ")}
          </option>
        ))}
      </select>
      <h1>Thumbnail:</h1>
      {prj?.thumbnail !== null && <img src={prj?.thumbnail}></img>}
      <DragAndDrop ref={dropboxRef} accept="image/*" multiple={false} />
      <div className="w-max mt-8 flex">
        <Button className="bg-primary-green" onClick={updatePrj}>
          Save Changes
        </Button>
        <Button
          className="bg-light-tertiary dark:bg-dark-tertiary ml-3"
          onClick={resetPage}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
