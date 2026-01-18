"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import projectsApi from "@/lib/api/handlers/projects";
import TabSystem from "@/components/ui/selectors/TabSystem";
import { Project } from "@/lib/types/api/projects";
import { authApi } from "@/lib/api/auth";
import { User } from "@/lib/types/api/users";
import { AboutProject } from "./AboutProject";
import { ManageMembers } from "./ManageMembers";
import { useLayout } from "@/contexts/LayoutProvider";

const ProjectSettingsPage = () => {
  const layout = useLayout();

  const prjID = Number(useParams().projectID);
  const [prj, setPrj] = useState<Project>();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    layout.setFooterVisibility(false);

    // fetch api for prj name
    projectsApi(prjID)
      .get()
      .then((prj) => setPrj(prj));

    authApi.getUserDetails().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="mx-50 my-5">
      <h1 className="header-1 mt-4">Settings</h1>
      <h1 className="header-2 mt-20 h-12">{prj?.name}</h1>
      <TabSystem
        tabs={[
          {
            title: "About Project",
            element: <AboutProject prj={prj!} setPrj={setPrj} user={user!} />,
          },
          {
            title: "Manage Members",
            element: <ManageMembers prj={prj!} setPrj={setPrj} user={user!} />,
          },
        ]}
      ></TabSystem>
    </div>
  );
};

export default ProjectSettingsPage;
