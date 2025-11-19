import { icons, IconName, IconComponent } from ".";
import { BaseIcon } from "./BaseIcon";

type IconProps = {
  name: IconName;
  onClick?: () => void;
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
    className: `inline-flex items-center justify-center ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : isInteractive ? "cursor-pointer" : ""
    }`,
    style: { width: size, height: size },
    onClick: disabled ? undefined : onClick,
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