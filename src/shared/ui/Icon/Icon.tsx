import { DocIcon } from "./icons/doc";
import { CalendarIcon } from "./icons/calendar";
import { ChartIcon } from "./icons/chart";
import { CheckIcon } from "./icons/check";
import { CheckboxIcon } from "./icons/checkbox";
import { ChevronLeftIcon } from "./icons/chevron-left";
import { ChevronRightIcon } from "./icons/chevron-right";
import { ChevronUpIcon } from "./icons/chevron-up";
import { ChevronDownIcon } from "./icons/chevron-down";
import { MinusIcon } from "./icons/minus";
import { PlusIcon } from "./icons/plus";
import { ClosedIcon } from "./icons/closed";
import { UncheckboxIcon } from "./icons/uncheckbox";
import type { SVGProps } from "react";

type IconName =
  | "doc"
  | "calendar"
  | "chart"
  | "check"
  | "checkbox"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "chevron-down"
  | "minus"
  | "plus"
  | "closed"
  | "uncheckbox";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  color?: string;
}

const iconMap = {
  doc: DocIcon,
  calendar: CalendarIcon,
  chart: ChartIcon,
  check: CheckIcon,
  checkbox: CheckboxIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  "chevron-up": ChevronUpIcon,
  "chevron-down": ChevronDownIcon,
  minus: MinusIcon,
  plus: PlusIcon,
  closed: ClosedIcon,
  uncheckbox: UncheckboxIcon,
};

export const Icon = ({
  name,
  size = 24,
  color = "none",
  ...props
}: IconProps) => {
  const IconComponent = iconMap[name];
  return <IconComponent width={size} height={size} fill={color} {...props} />;
};
