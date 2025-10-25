import type React from "react";
import { useLocation, useNavigate } from "react-router";
import type { NavState } from "../../types/types";

interface NavBtnProps {
  state: NavState;
  icon: React.FC;
}
export const NavBtn: React.FC<NavBtnProps> = ({ icon: Icon, state }) => {
  const nav = useNavigate();
  const loc = useLocation();
  return (
    <button
      onClick={() => nav(state)}
      className={
        "grid place-items-center w-[40px] h-[40px] rounded-full " +
        (state === loc.pathname ? "bg-white" : "bg-transparent")
      }
    >
      <Icon width="24px" height="24px" />
    </button>
  );
};
