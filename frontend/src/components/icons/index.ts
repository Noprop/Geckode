import { AngleLeftIcon } from "./AngleLeftIcon";
import { AngleRightIcon } from "./AngleRightIcon";
import { AnglesLeftIcon } from "./AnglesLeftIcon";
import { AnglesRightIcon } from "./AnglesRightIcon";
import { SortDownIcon } from "./SortDownIcon";
import { SortUpIcon } from "./SortUpIcon";

export const icons = {
  "angle-left": AngleLeftIcon,
  "angle-right": AngleRightIcon,
  "angles-left": AnglesLeftIcon,
  "angles-right": AnglesRightIcon,
  "sort-up": SortUpIcon,
  "sort-down": SortDownIcon,
} as const;

export type IconName = keyof typeof icons;
export type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;