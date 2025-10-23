import { NavLink } from 'react-router-dom';
import './tabs.css'; // use same css file

export default function NavMenu({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) => (isActive ? 'tab active' : 'tab')}
    >
      <div className="nav-menu">
        <div className="nav-icon">{icon}</div>
        <div className="nav-label">{label}</div>
      </div>
    </NavLink>
  );
}
