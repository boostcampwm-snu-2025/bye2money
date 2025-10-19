import { NavLink } from "react-router-dom";

export default function NavLinkItem({ to, label }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => "tab-link" + (isActive ? " active" : "")}
        aria-label={label}
      >
        {label}
      </NavLink>
    </li>
  );
}
