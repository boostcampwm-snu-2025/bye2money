import type React from "react";
import Check from "../assets/icons/check-rounded.svg?react";
import UnCheck from "../assets/icons/uncheck-rounded.svg?react";

interface CheckBoxProps {
  value: boolean;
  onClick: () => void;
  label: string;
}
export const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  onClick,
  label,
}) => {
  const svgSize = "16px";
  return (
    <button onClick={onClick} className="checkbox">
      {value ? (
        <Check width={svgSize} height={svgSize} />
      ) : (
        <UnCheck width={svgSize} height={svgSize} />
      )}
      {label}
    </button>
  );
};
