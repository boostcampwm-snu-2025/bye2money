import clsx from "clsx";
import { cva } from "class-variance-authority";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const textInputVariants = cva(
  "rounded-xl transition-colors focus:outline-none text-neutral-text-weak",
  {
    variants: {
      type: {
        default: "px-4 py-2",
        "text-area": "p-0 bg-transparent border-none rounded-none",
      },
      error: {
        true: "border bg-neutral-surface border-danger-border",
        false: "",
      },
      disabled: {
        true: "bg-neutral-surface-weak cursor-not-allowed opacity-60",
        false: "",
      },
    },
    compoundVariants: [
      {
        type: "default",
        error: false,
        disabled: false,
        className:
          "border border-transparent focus:border-neutral-border bg-neutral-surface-point focus:bg-neutral-surface",
      },
    ],
    defaultVariants: {
      type: "default",
      error: false,
      disabled: false,
    },
  },
);

type BaseTextInputProps = {
  label?: string;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

type DefaultTextInputProps = BaseTextInputProps & {
  type: "default";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "children">;

type TextAreaTextInputProps = BaseTextInputProps & {
  type: "text-area";
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "children">;

export type TextInputProps = DefaultTextInputProps | TextAreaTextInputProps;

export const TextInput = ({
  type = "default",
  label,
  placeholder,
  value,
  onChange,
  error = false,
  disabled = false,
  className,
  ...props
}: TextInputProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => onChange?.(e.target.value);

  const inputClassName = clsx(
    textInputVariants({ type, error, disabled }),
    className,
  );

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-semibold-16 text-grayscale-400">{label}</label>
      )}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClassName}
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
      />
    </div>
  );
};
