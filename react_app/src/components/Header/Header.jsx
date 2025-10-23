import { Link } from 'react-router-dom';
import MonthSelector from './MonthSelector';
import Tabs from '../Tabs/Tabs';
import './header.css';

export default function Header() {
  return (
    <header className="app-header" >
      <div className="header-main-content">
        <div className="header-main-content-row1">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>Wise Wallet</Link>
          <MonthSelector />
          <Tabs className="header-menu"/>
        </div>

      </div>

    </header>
  );
}
