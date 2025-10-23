import clsx from 'clsx';
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  counter?: { value: number; max: number };
};

export function TextInput({ label, error, counter, className, ...rest }: Props) {
  return (
    <label className="block">
      {label ? <span className="mb-1 block text-xs text-neutral-text-weak">{label}</span> : null}
      <input
        className={clsx(
          'input w-full rounded-xl border border-neutral-border bg-neutral-surface px-3 py-2 outline-none',
          'focus:border-neutral-text focus:ring-0',
          error && 'border-danger-border',
          className
        )}
        {...rest}
      />
      <div className="mt-1 flex items-center justify-between">
        {error ? <span className="text-xs text-danger-text">{error}</span> : <span />}
        {counter ? (
          <span className="text-xs text-neutral-text-weak">
            {counter.value}/{counter.max}
          </span>
        ) : null}
      </div>
    </label>
  );
}
