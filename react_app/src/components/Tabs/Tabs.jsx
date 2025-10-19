import NavMenu from './NavMenu';
import './tabs.css';

export default function Tabs({ className = '' }) {
  return (
    <nav className={`tabs ${className}`}>
      <NavMenu to="/" icon="🧾" label="내역" />
      <NavMenu to="/calendar" icon="📅" label="달력" />
      <NavMenu to="/stats" icon="📊" label="통계" />
    </nav>
  );
}
