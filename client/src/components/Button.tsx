import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const base =
  'btn inline-flex items-center justify-center rounded-full transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-text';

const variants: Record<Variant, string> = {
  primary: 'bg-neutral-text text-neutral-text-rev hover:opacity-90 active:opacity-80',
  secondary: 'bg-neutral-surface-point text-neutral-text hover:bg-gs-200',
  ghost: 'bg-transparent hover:bg-gs-100',
  danger: 'bg-danger-surface text-danger-text-rev hover:opacity-90',
};

const sizes: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], disabled && 'opacity-40 pointer-events-none', className)}
      disabled={disabled}
      {...rest}
    >
      {leftIcon ? <span className="mr-2 grid place-items-center">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className="ml-2 grid place-items-center">{rightIcon}</span> : null}
    </button>
  );
}
