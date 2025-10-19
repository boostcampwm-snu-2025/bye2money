const BTN_VARIANT = { SM: "sm", MD: "md", LG: "lg" } as const;
type BtnVariant = (typeof BTN_VARIANT)[keyof typeof BTN_VARIANT];
const getBtnClass = (variant: string): string => {
  const VARIANT_CLASS_MAP: Record<BtnVariant, string> = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };
  return `btn ${VARIANT_CLASS_MAP[variant]}`;
};
const getIconClass = (variant: string): string => {
  const VARIANT_ICON_CLASS_MAP: Record<BtnVariant, string> = {
    sm: "h-icon-sm",
    md: "h-icon-md",
    lg: "h-icon-lg",
  };
  return `${VARIANT_ICON_CLASS_MAP[variant]} aspect-square`;
};
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant: BtnVariant;
  icon: React.FC;
  disabled: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  label,
  icon: Icon,
  onClick,
  variant,
  disabled,
}) => {
  const btnClass = getBtnClass(variant);
  const iconClass = getIconClass(variant);
  return (
    <button onClick={onClick} disabled={disabled} className={btnClass}>
      {Icon && <Icon className={iconClass} />}
      {label && label}
    </button>
  );
};
