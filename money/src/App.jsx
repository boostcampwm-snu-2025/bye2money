import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { YearMonthProvider } from "./context/YearMonthContext.jsx";
import Transactions from "./pages/Transactions.jsx";
import Calendar from "./pages/Calendar.jsx";
import Stats from "./pages/Stats.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <YearMonthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/transactions" replace />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </YearMonthProvider>
    </BrowserRouter>
  );
}
