import { AngleLeftIcon } from "./AngleLeftIcon";
import { AngleRightIcon } from "./AngleRightIcon";
import { AnglesLeftIcon } from "./AnglesLeftIcon";
import { AnglesRightIcon } from "./AnglesRightIcon";
import { CircleInfoIcon } from "./CircleInfoIcon";
import { FilePlusIcon } from "./FilePlusIcon";
import { MagnifyingGlassIcon } from "./MagnifyingGlassIcon";
import { SortDownIcon } from "./SortDownIcon";
import { SortUpIcon } from "./SortUpIcon";
import { TrashIcon } from "./TrashIcon";
import { WarningIcon } from "./WarningIcon";
import { LeaveIcon } from "./LeaveIcon";

export const icons = {
  "angle-left": AngleLeftIcon,
  "angle-right": AngleRightIcon,
  "angles-left": AnglesLeftIcon,
  "angles-right": AnglesRightIcon,
  "sort-up": SortUpIcon,
  "sort-down": SortDownIcon,
  "magnifying-glass": MagnifyingGlassIcon,
  "file-plus": FilePlusIcon,
  "circle-info": CircleInfoIcon,
  "trash": TrashIcon,
  "warning": WarningIcon,
  "leave": LeaveIcon,
} as const;

export type IconName = keyof typeof icons;
export type IconComponent = React.FC<React.SVGProps<SVGSVGElement>> & {
  viewBox?: string;
};