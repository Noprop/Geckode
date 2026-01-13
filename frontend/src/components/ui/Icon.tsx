import { IconProps } from "@radix-ui/themes";
import { MouseEvent } from "react";

export type IconType = React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;

type Props = {
  icon: IconType;
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  size?: number | string;
  className?: string;
};

export function Icon({
  icon,
  onClick,
  disabled = false,
  size = 24,
  className = "",
}: Props) {
  const Icon = icon;
  const isInteractive = !!onClick;

  const commonProps = {
    className: `${className} text-black dark:text-white ${
      disabled ? "opacity-50 cursor-not-allowed" : isInteractive ? "cursor-pointer" : ""
    }`,
    style: { width: size, height: size },
    size: size,
    onClick: disabled ? undefined : onClick,
  };

  if (isInteractive) {
    return (
      <button type="button" {...commonProps} disabled={disabled}>
        <Icon width={size} height={size} />
      </button>
    );
  }

  return (
    <Icon {...commonProps} />
  );
}