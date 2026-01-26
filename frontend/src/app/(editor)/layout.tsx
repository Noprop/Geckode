"use client";

import Header from "@/components/Header/Header";
import HeaderRHSBtns from "@/components/HeaderRHSBtns";
import TabSelector from "@/components/ui/selectors/TabSelector";
import {
  useWorkspaceView,
  WorkspaceView,
} from "@/contexts/WorkspaceViewContext";
import { DrawingPinFilledIcon, ImageIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
const ProjectControls = dynamic(
  () => import("./../../components/Header/ProjectControls"),
  {
    ssr: false,
  },
);
export default function Layout({ children }: { children: React.ReactNode }) {
  const { view, setView } = useWorkspaceView();
  return (
    <>
      <Header
        lhs={<ProjectControls />}
        middle={
          <TabSelector<WorkspaceView>
            tab={view}
            setTab={setView}
            options={[
              {
                value: "blocks",
                label: "Blocks",
                icon: DrawingPinFilledIcon,
              },
              { value: "sprite", label: "Sprite Editor", icon: ImageIcon },
            ]}
          />
        }
        rhs={<HeaderRHSBtns />}
      />
      <main
        className="flex-1 flex flex-col bg-light-secondary dark:bg-dark-secondary"
        id="app"
      >
        {children}
      </main>
    </>
  );
}
