import { createContext, useContext, type ReactNode } from "react";
import type React from "react";

interface DropdownProps {
  topOffset: number | undefined;
  bottomOffset: number | undefined;
  leftOffset: number | undefined;
  rightOffset: number | undefined;
  elements: ReactNode[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  topOffset,
  bottomOffset,
  leftOffset,
  rightOffset,
  elements,
}) => {
  const lastElement = elements.at(-1);
  const restElements = elements.slice(0, -1);

  const style = {};
  if (topOffset) style.top = `${topOffset}px`;
  if (bottomOffset) style.bottom = `${bottomOffset}px`;
  if (leftOffset) style.left = `${leftOffset}px`;
  if (rightOffset) style.right = `${rightOffset}px`;
  return (
    <div
      style={style}
      className="absolute flex flex-col w-[152px] min-h-0 bg-grayscale-50 border-l-[0.5px] border-r-[0.5px] border-b-[0.5px] border-neutral-border-default items-center z-50"
    >
      {restElements.map((e, i) => {
        return (
          <div className="flex flex-col items-center" key={i}>
            {e}
            <div className="w-[100px] h-[0.5px] bg-neutral-text-default"></div>
          </div>
        );
      })}
      {lastElement}
    </div>
  );
};
