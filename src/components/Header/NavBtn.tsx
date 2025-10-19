import type React from "react";
import type { NavState } from "./Header";

interface NavBtnProps {
  onClick: (state: NavState) => void;
  state: NavState;
  currentState: NavState;
  icon: React.FC;
}
export const NavBtn: React.FC<NavBtnProps> = ({
  icon: Icon,
  currentState,
  onClick,
  state,
}) => {
  return (
    <button
      onClick={() => onClick(state)}
      className={
        "grid place-items-center w-[40px] h-[40px] rounded-full " +
        (state === currentState ? "bg-white" : "bg-transparent")
      }
    >
      <Icon width="24px" height="24px" />
    </button>
  );
};
