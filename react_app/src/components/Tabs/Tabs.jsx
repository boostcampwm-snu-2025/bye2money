import { NavLink } from 'react-router-dom';
import './tabs.css';

export default function Tabs() {
  return (
    <nav className="tabs">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'tab active' : 'tab'}>내역</NavLink>
      <NavLink to="/calendar" className={({ isActive }) => isActive ? 'tab active' : 'tab'}>달력</NavLink>
      <NavLink to="/stats" className={({ isActive }) => isActive ? 'tab active' : 'tab'}>통계</NavLink>
    </nav>
  );
}
