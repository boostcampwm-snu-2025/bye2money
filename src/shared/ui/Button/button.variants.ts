import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-semibold transition-opacity h-fit",
  {
    variants: {
      variant: {
        container: "bg-grayscale-300 text-grayscale-50",
        outlined: "border border-grayscale-300 text-grayscale-300",
        ghost: "text-grayscale-400",
      },
      size: {
        sm: "text-semibold-12",
        md: "text-semibold-16",
        lg: "text-serif-24",
      },
      flexible: {
        true: "w-fit",
        false: "w-full",
      },
    },
    compoundVariants: [
      {
        variant: ["container", "outlined"],
        size: "sm",
        class: "px-8 py-3",
      },
      {
        variant: ["container", "outlined"],
        size: "md",
        class: "px-8 py-3",
      },
      {
        variant: ["container", "outlined"],
        size: "lg",
        class: "px-8 py-3",
      },
    ],
    defaultVariants: {
      variant: "container",
      size: "md",
      flexible: true,
    },
  },
);
