import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import CalendarPage from "./pages/CalendarPage";
import StatsPage from "./pages/StatsPage";

export default function App() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="*" element={<div>Not Found: {pathname}</div>} />
        </Routes>
      </main>
    </div>
  );
}
