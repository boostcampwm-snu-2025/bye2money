import Doc from '../assets/icons/doc.svg?react';
import Calendar from '../assets/icons/calendar.svg?react';
import Chart from '../assets/icons/chart.svg?react';
import Check from '../assets/icons/check.svg?react';
import Checkbox from '../assets/icons/checkbox.svg?react';
import Uncheckbox from '../assets/icons/uncheckbox.svg?react';
import ChevronLeft from '../assets/icons/chevron-left.svg?react';
import ChevronRight from '../assets/icons/chevron-right.svg?react';
import ChevronUp from '../assets/icons/chevron-up.svg?react';
import ChevronDown from '../assets/icons/chevron-down.svg?react';
import Minus from '../assets/icons/minus.svg?react';
import Plus from '../assets/icons/plus.svg?react';
import Closed from '../assets/icons/closed.svg?react';

export const iconMap = {
  'doc': Doc,
  'calendar': Calendar,
  'chart': Chart,
  'check': Check,
  'checkbox': Checkbox,
  'uncheckbox': Uncheckbox,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'minus': Minus,
  'plus': Plus,
  'closed': Closed,
};
export type IconName = keyof typeof iconMap;
