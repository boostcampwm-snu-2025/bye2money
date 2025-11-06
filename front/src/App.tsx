import "./App.css";
import { Header } from "./components/Header/Header";
import { MainPage } from "./pages/MainPage";
import { CalendarPage } from "./pages/CalendarPage";
import { ChartPage } from "./pages/ChartPage";
import { BrowserRouter, Routes, Route } from "react-router";
import { useEffect } from "react";
import { useSpendingDetailStore } from "./store/useSpendingDetailStore";

function App() {
  const { fetchSpendings } = useSpendingDetailStore();
  useEffect(() => {
    fetchSpendings();
  }, []);
  return (
    <BrowserRouter>
      <div className="place-self-center w-layout flex flex-col bg-neutral-surface-weak">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
