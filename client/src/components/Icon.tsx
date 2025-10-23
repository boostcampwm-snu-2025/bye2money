import { useId } from 'react';
import { iconMap, type IconName } from '../icons';

type Props = {
  name: IconName;
  className?: string;
  title?: string;
  mode?: 'stroke' | 'fill';
};

export function Icon({
  name,
  className = 'w-5 h-5',
  title,
  mode = 'stroke',
}: Props) {
  const C = iconMap[name];
  const titleId = useId();

  const a11y = title
    ? ({ role: 'img' as const, 'aria-labelledby': titleId })
    : ({ role: 'presentation' as const, 'aria-hidden': true as const });

  const common = {
    ...a11y,
    focusable: 'false' as const,
    className:
      `${className} ${mode === 'stroke' ? '[&_*]:stroke-current' : '[&_*]:fill-current'}`,
    width: '1em',
    height: '1em',
    ...(mode === 'stroke'
      ? { stroke: 'currentColor', fill: 'none' as const }
      : { fill: 'currentColor' }),
  };

  return (
    <C {...common}>
      {title ? <title id={titleId}>{title}</title> : null}
    </C>
  );
}
