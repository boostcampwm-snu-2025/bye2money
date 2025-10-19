import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/Home/HomePage';
import CalendarPage from './pages/Calendar/CalendarPage';
import StatsPage from './pages/Stats/StatsPage';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </>
  );
}
