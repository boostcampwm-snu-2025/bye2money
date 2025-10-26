import type { ChangeEvent } from "react";

interface TextInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  isHollow: boolean;
  width: number;
  disabled: boolean;
}
const getInputClass = (isHollow: string): string => {
  return isHollow ? "input input-hollow" : "input input-filled";
};
export const TextInput: React.FC<TextInputProps> = ({
  onChange,
  value,
  placeholder,
  isHollow,
  width,
  disabled,
}) => {
  const inputClass = getInputClass(isHollow);
  return (
    <input
      className={inputClass}
      type="text"
      value={value}
      style={{ width }}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
