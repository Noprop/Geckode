import { MouseEvent } from "react";
import { icons, IconName, IconComponent } from ".";
import { BaseIcon } from "./BaseIcon";

type IconProps = {
  name: IconName;
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  size?: number | string;
  className?: string;
};

export function Icon({
  name,
  onClick,
  disabled = false,
  size = 24,
  className = "",
}: IconProps) {
  const Component = icons[name] as IconComponent;
  const isInteractive = !!onClick;

  const commonProps = {
    className: `inline-flex items-center justify-center ${className} text-black dark:text-white ${
      disabled ? "opacity-50 cursor-not-allowed" : isInteractive ? "cursor-pointer" : ""
    }`,
    style: { width: size, height: size },
    onClick: disabled ? undefined : onClick,
    viewBox: Component.viewBox ?? "0 0 16 16",
  };

  if (isInteractive) {
    return (
      <button type="button" {...commonProps} disabled={disabled}>
        <BaseIcon className="w-full h-full">
          <Component/>
        </BaseIcon>
      </button>
    );
  }

  return (
    <BaseIcon {...commonProps}>
      <Component/>
    </BaseIcon>
  );
}