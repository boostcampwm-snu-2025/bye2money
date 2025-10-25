import type { BtnVariant } from "../types/types";
import { getBtnClass, getIconClass } from "../utils/typeHelpers";

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
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={getBtnClass(variant)}
    >
      {Icon && <Icon className={getIconClass(variant)} />}
      {label && label}
    </button>
  );
};
