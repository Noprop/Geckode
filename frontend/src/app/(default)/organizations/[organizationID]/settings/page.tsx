"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import organizationsApi from "@/lib/api/handlers/organizations";
import TabSystem from "@/components/ui/selectors/TabSystem";
import { Organization } from "@/lib/types/api/organizations";
import { authApi } from "@/lib/api/auth";
import { User } from "@/lib/types/api/users";
import { AboutOrganization } from "./AboutOrganization";
import { ManageMembers } from "./ManageMembers";
import { useLayout } from "@/contexts/LayoutProvider";

const OrganizationSettingsPage = () => {
  const layout = useLayout();

  const orgID = Number(useParams().organizationID);
  const [org, setOrg] = useState<Organization>();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    layout.setFooterVisibility(false);

    // fetch api for org name
    organizationsApi(orgID)
      .get()
      .then((org) => setOrg(org));

    authApi.getUserDetails().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="mx-50 my-5">
      <h1 className="header-1 mt-4">Settings</h1>
      <h1 className="header-2 mt-20 h-12">{org?.name}</h1>
      <TabSystem
        tabs={[
          {
            title: "About Organization",
            element: (
              <AboutOrganization org={org!} setOrg={setOrg} user={user!} />
            ),
          },
          {
            title: "Manage Members",
            element: <ManageMembers org={org!} setOrg={setOrg} user={user!} />,
          },
        ]}
      ></TabSystem>
    </div>
  );
};

export default OrganizationSettingsPage;
