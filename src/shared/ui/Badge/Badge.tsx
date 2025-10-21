import clsx from "clsx";

interface BadgeProps {
  label: string;
  colorClass?: string;
  className?: string;
}

export const Badge = ({ label, colorClass, className }: BadgeProps) => {
  return (
    <div
      className={clsx(
        `flex w-[92px] items-center justify-center p-4 text-light-12`,
        colorClass,
        className,
      )}
    >
      {label}
    </div>
  );
};
