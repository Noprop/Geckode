"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { DrawingPinFilledIcon, ImageIcon } from "@radix-ui/react-icons";
import TabSelector from "@/components/ui/selectors/TabSelector";
import {
  useWorkspaceView,
  WorkspaceView,
} from "@/contexts/WorkspaceViewContext";

import HeaderRHSBtns from "../HeaderRHSBtns";
import { ReactElement } from "react";

interface Props {
  lhs?: ReactElement;
  middle?: ReactElement;
  rhs?: ReactElement;
}

export default function Header({ lhs, middle, rhs }: Props) {
  return (
    <header className="bg-primary-green flex items-center h-16 px-4 shadow-md">
      {/* Left section - Logo */}
      <div className="flex items-center">
        <Link
          href="/"
          className="hover:opacity-90 transition-opacity overflow-hidden h-10"
        >
          <p className="text-3xl">Geckode</p>
        </Link>
      </div>

      {/* Project controls section - Scratch style */}
      {lhs}

      {/* Center section - Workspace Toggle */}
      <div className="flex items-center justify-center flex-1">{middle}</div>

      {/* Right section - Utility actions */}
      <div className="flex items-center justify-end gap-2">
        <HeaderRHSBtns />
      </div>
    </header>
  );
}
