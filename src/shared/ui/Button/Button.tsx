import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactElement } from "react";
import { buttonVariants } from "./button.variants";

type BaseButtonProps = {
  variant?: "container" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  flexible?: boolean;
  disabled?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

type TextOnlyButton = BaseButtonProps & {
  layout: "text";
  label: string;
  icon?: never;
};

type IconOnlyButton = BaseButtonProps & {
  layout: "icon";
  label?: never;
  icon: ReactElement;
};

type TextIconButton = BaseButtonProps & {
  layout: "text-icon";
  label: string;
  icon: ReactElement;
};

export type ButtonProps = TextOnlyButton | IconOnlyButton | TextIconButton;

export const Button = ({
  variant = "container",
  size = "md",
  flexible = true,
  disabled = false,
  layout,
  label,
  icon,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        buttonVariants({ variant, size, flexible }),
        disabled && "cursor-not-allowed opacity-[0.32]",
        !disabled && "hover:opacity-80 active:opacity-[0.64]",
        layout === "text-icon" && "gap-2",
        layout === "icon" && "px-2 py-2",
        className,
      )}
      {...props}
    >
      {layout === "text" && label}
      {layout === "icon" && icon}
      {layout === "text-icon" && (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
};
