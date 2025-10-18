import { Icon } from "../Icon/Icon";
import clsx from "clsx";

interface CheckBoxProps {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const CheckBox = ({
  checked,
  label,
  onChange,
  className,
}: CheckBoxProps) => {
  return (
    <div
      className={clsx(
        `flex w-fit items-center justify-center gap-1 text-light-12`,
        className,
      )}
      onClick={() => onChange(!checked)}
    >
      <Icon name={checked ? "checkbox" : "uncheckbox"} />
      {label}
    </div>
  );
};
