import "./App.css";
import { Header } from "./components/Header/Header";
import { MainPage } from "./pages/MainPage";
import { CalendarPage } from "./pages/CalendarPage";
import { ChartPage } from "./pages/ChartPage";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div className="w-layout flex flex-col bg-neutral-surface-weak">
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
