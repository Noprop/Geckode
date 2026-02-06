"use client";

import { GitHubLogoIcon, DownloadIcon } from "@radix-ui/react-icons";
import { useEditorStore } from "@/stores/editorStore";
import { useSnackbar } from "@/hooks/useSnackbar";
import projectsApi from "@/lib/api/handlers/projects";
import { headerBtnClasses } from "./Header";
import { extractAxiosErrMsg } from "@/lib/api/axios";

export default function ProjectControls() {
  const showSnackbar = useSnackbar();
  const { projectName, setProjectName, saveProject, projectId } = useEditorStore();

  const handleSave = () => {
    saveProject(showSnackbar);
  };

  // every time user exits focus on the project name, it is updated
  const changeProjectName = (newPrjName: string) => {
    if (projectId && projectName !== newPrjName)
      projectsApi(projectId)
        .update({
          name: newPrjName,
        })
        .then(() => showSnackbar(`Updated prj name to ${newPrjName}!`, "success"))
        .catch((err) =>
          showSnackbar(extractAxiosErrMsg(err, "Failed to update project name! Please try again."), "error"),
        );
  };

  return (
    <div className="flex items-center gap-2 ml-6">
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        onBlur={(e) => changeProjectName(e.target.value)}
        placeholder="Project Name"
        className="h-8 px-3 rounded-md shadow-sm bg-white/15 text-white text-sm placeholder-white/60 outline-none border border-white/20 transition focus:bg-white/25 focus:border-white/40"
        style={{ width: "160px" }}
      />
      <button onClick={handleSave} title="Save Project" className={headerBtnClasses}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
      </button>
      <button title="GitHub (Coming Soon)" className={headerBtnClasses}>
        <GitHubLogoIcon className="w-4 h-4" />
      </button>
      <button title="Download (Coming Soon)" className={headerBtnClasses}>
        <DownloadIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
