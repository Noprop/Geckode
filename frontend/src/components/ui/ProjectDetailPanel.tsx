"use client";

import { type Project, projectPermissions } from "@/lib/types/api/projects";
import { UserIcon } from "@/components/ui/UserIcon";
import { EditableTextField } from "@/components/ui/inputs/EditableTextField";
import { ThumbnailUpload } from "@/components/ui/ThumbnailUpload";
import { Button } from "@/components/ui/Button";
import { PanelSection } from "@/components/ui/PanelSection";
import { formatTimeSince } from "@/lib/time";
import { OpenInNewWindowIcon, Share1Icon, TrashIcon } from "@radix-ui/react-icons";

export interface ProjectDetailPanelProps {
  project: Project;
  onDescriptionSave?: (description: string) => void | Promise<void>;
  onThumbnailChange?: (file: File | null) => void | Promise<void>;
  /** If true, the description field is read-only (no edit) */
  descriptionReadOnly?: boolean;
  /** Called when "Open" is clicked – e.g. navigate to project page */
  onOpen?: () => void;
  /** Called when "Share" is clicked – e.g. open share modal */
  onShare?: () => void;
  /** Called when "Delete" is clicked – e.g. open delete confirmation */
  onDelete?: () => void;
  /** Whether the current user can share (show Share button) */
  canShare?: boolean;
  /** Whether the current user can delete (show Delete button) */
  canDelete?: boolean;
}

function formatPermission(permission: Project["permission"]): string {
  if (permission === "owner") return "Owner";
  return projectPermissions[permission as keyof typeof projectPermissions] ?? permission;
}

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function ProjectDetailPanel({
  project,
  onDescriptionSave,
  onThumbnailChange,
  descriptionReadOnly = false,
  onOpen,
  onShare,
  onDelete,
  canShare = false,
  canDelete = false,
}: ProjectDetailPanelProps) {
  const canEditProjectDetails = ["owner", "admin"].includes(project.permission ?? "");

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4">
      {/* Thumbnail */}
      <ThumbnailUpload
        label="Thumbnail"
        currentSrc={project.thumbnail}
        onFileSelect={onThumbnailChange}
        disabled={!onThumbnailChange || !canEditProjectDetails}
      />

      {/* Description */}
      <div className="mt-4">
        <EditableTextField
          multiline
          label="Description"
          value={project.description ?? ""}
          onSave={onDescriptionSave ?? (() => {})}
          placeholder={canEditProjectDetails ? "Add a description…" : "No description"}
          disabled={descriptionReadOnly || !onDescriptionSave || !canEditProjectDetails}
          minRows={3}
        />
      </div>

      {/* Owner */}
      <PanelSection title="Owner" variant="strong" className="mt-5">
        <UserIcon user={project.owner} variant="card" size="lg" />
      </PanelSection>

      {/* Meta: updated, created, permission */}
      <PanelSection title="Details" className="mt-5">
        <dl className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground text-xs">Last updated</dt>
            <dd className="font-medium text-foreground">
              {formatTimeSince(project.updated_at)}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground text-xs">Created</dt>
            <dd className="font-medium text-foreground">
              {formatDateTime(project.created_at)}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground text-xs">Your permission</dt>
            <dd>
              <span className="inline-flex items-center rounded-full bg-primary-green/15 dark:bg-primary-green/25 text-primary-green px-2.5 py-0.5 mt-1 text-sm font-semibold">
                {formatPermission(project.permission)}
              </span>
            </dd>
          </div>
        </dl>
      </PanelSection>
      </div>

      {/* Action buttons at bottom - fixed, not part of scroll */}
      <div className="shrink-0 flex flex-col gap-3 border-t border-gray-500 p-4">
        {onOpen && (
          <Button
            onClick={onOpen}
            className="btn-confirm flex w-full items-center justify-center gap-2 py-3 text-base font-semibold"
          >
            <OpenInNewWindowIcon className="size-5" />
            Open Project
          </Button>
        )}
        {((onShare && canShare) || (onDelete && canDelete)) && (
          <div className="flex justify-center">
            <div className="min-w-0">
              {onShare && canShare ? (
                <Button
                  onClick={onShare}
                  className="w-full flex items-center justify-center gap-2 hover:text-green-500"
                  title="Share project"
                >
                  <Share1Icon className="size-4" />
                  Share
                </Button>
              ) : null}
            </div>
            <div className="min-w-0">
              {onDelete && canDelete ? (
                <Button
                  onClick={onDelete}
                  className="w-full flex items-center justify-center gap-2 hover:text-red-500"
                  title="Delete project"
                >
                  <TrashIcon className="size-4" />
                  Delete
                </Button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
