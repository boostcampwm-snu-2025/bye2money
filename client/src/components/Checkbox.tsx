type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export function Checkbox({ label, ...rest }: Props) {
  return (
    <label className="inline-flex cursor-pointer select-none items-center gap-2">
      <input type="checkbox" className="chk h-4 w-4 appearance-none rounded-sm border border-neutral-border grid place-content-center" {...rest} />
      {label ? <span className="text-sm">{label}</span> : null}
    </label>
  );
}
