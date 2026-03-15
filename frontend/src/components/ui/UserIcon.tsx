"use client";

import { getUserFullName, type PublicUser } from "@/lib/types/api/users";
import type { OrganizationLite } from "@/lib/types/api/organizations";

const AVATAR_SIZES = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
} as const;

type AvatarSize = keyof typeof AVATAR_SIZES;

type IconVariant = "avatar" | "card" | "inline";

interface BaseIconProps {
  primaryText: string;
  secondaryText: string;
  imageUrl: string | null;
  fallbackText: string;
  accentColor?: string;
  size?: AvatarSize;
  variant?: IconVariant;
  className?: string;
}

function BaseIcon({
  primaryText,
  secondaryText,
  imageUrl,
  fallbackText,
  accentColor,
  size = "md",
  variant = "card",
  className = "",
}: BaseIconProps) {
  const avatarSize = AVATAR_SIZES[size];

  const avatarEl = (
    <div
      className={`${avatarSize} shrink-0 overflow-hidden rounded-full bg-light-secondary dark:bg-dark-secondary flex items-center justify-center border-2`}
      style={accentColor ? { borderColor: accentColor } : undefined}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={primaryText}
          className="size-full object-cover"
        />
      ) : (
        <span className={`font-bold text-${size} text-foreground/85`}>
          {fallbackText}
        </span>
      )}
    </div>
  );

  if (variant === "avatar") {
    return <div className={className}>{avatarEl}</div>;
  }

  if (variant === "inline") {
    return (
      <div
        className={`flex flex-col ${className}`}
        title={`${primaryText} (${secondaryText})`}
      >
        <span className="text-base font-semibold">{primaryText}</span>
        <span className="text-xs italic text-muted-foreground">
          {secondaryText}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      title={`${primaryText} (${secondaryText})`}
    >
      {avatarEl}
      <div className="min-w-0">
        <div className="font-semibold text-sm leading-tight truncate">
          {primaryText}
        </div>
        <div className="text-xs leading-tight text-muted-foreground truncate italic">
          {secondaryText}
        </div>
      </div>
    </div>
  );
}

export interface UserIconProps {
  user?: PublicUser | null;
  accentColor?: string;
  size?: AvatarSize;
  variant?: IconVariant;
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

  return (
    <BaseIcon
      primaryText={fullName}
      secondaryText={username}
      imageUrl={avatarUrl}
      fallbackText={initials}
      accentColor={accentColor}
      size={size}
      variant={variant}
      className={className}
    />
  );
}

export interface OrganizationIconProps {
  organization?: OrganizationLite | null;
  accentColor?: string;
  size?: AvatarSize;
  variant?: IconVariant;
  className?: string;
}

export function OrganizationIcon({
  organization,
  accentColor,
  size = "md",
  variant = "card",
  className = "",
}: OrganizationIconProps) {
  const name = organization?.name ?? "Unknown organization";
  const slug = organization?.slug ?? "unknown";
  const thumbnailUrl = organization?.thumbnail ?? null;
  const initials = (organization?.name?.[0] ?? "?").toUpperCase();

  return (
    <BaseIcon
      primaryText={name}
      secondaryText={slug}
      imageUrl={thumbnailUrl}
      fallbackText={initials}
      accentColor={accentColor}
      size={size}
      variant={variant}
      className={className}
    />
  );
}
