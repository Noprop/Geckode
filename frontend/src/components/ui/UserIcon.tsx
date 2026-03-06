"use client";

import { getUserFullName, type PublicUser } from "@/lib/types/api/users";

const AVATAR_SIZES = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
} as const;

export interface UserIconProps {
  user?: PublicUser | null;
  /** Hex color for avatar border (e.g. collaborator accent) */
  accentColor?: string;
  /** Avatar size */
  size?: keyof typeof AVATAR_SIZES;
  /** Layout variant: avatar = circle only; card = avatar + name + username; inline = name + username (no avatar, for tables) */
  variant?: "avatar" | "card" | "inline";
  className?: string;
}

export function UserIcon({
  user,
  accentColor,
  size = "md",
  variant = "card",
  className = "",
}: UserIconProps) {
  const fullName = getUserFullName(user);
  const username = user?.username ?? "unknown";
  const avatarUrl = user?.avatar ?? null;
  const initials = (
    user?.first_name?.[0] ?? user?.username?.[0] ?? "?"
  ).toUpperCase();

  const avatarSize = AVATAR_SIZES[size];
  const avatarEl = (
    <div
      className={`${avatarSize} shrink-0 overflow-hidden rounded-full bg-light-secondary dark:bg-dark-secondary flex items-center justify-center border-2`}
      style={accentColor ? { borderColor: accentColor } : undefined}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={fullName}
          className="size-full object-cover"
        />
      ) : (
        <span className={`font-bold text-${size} text-foreground/85`}>{initials}</span>
      )}
    </div>
  );

  if (variant === "avatar") {
    return <div className={className}>{avatarEl}</div>;
  }

  if (variant === "inline") {
    return (
      <div className={`flex flex-col ${className}`} title={`${fullName} (${username})`}>
        <span className="text-base font-semibold">{fullName}</span>
        <span className="text-xs italic text-muted-foreground">{username}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      title={`${fullName} (${username})`}
    >
      {avatarEl}
      <div className="min-w-0">
        <div className="font-semibold text-sm leading-tight truncate">
          {fullName}
        </div>
        <div className="text-xs leading-tight text-muted-foreground truncate italic">
          {username}
        </div>
      </div>
    </div>
  );
}
