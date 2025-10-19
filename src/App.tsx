import "./App.css";
import { Header, type NavState } from "./components/Header";
import { MainPage } from "./pages/MainPage";
import { CalendarPage } from "./pages/CalendarPage";
import { ChartPage } from "./pages/ChartPage";
import { useRouteStore } from "./store/useRouteStore";
import type { ReactNode } from "react";

function App() {
  const { currentRoute } = useRouteStore();
  const routes: Record<NavState, ReactNode> = {
    main: <MainPage />,
    calendar: <CalendarPage />,
    chart: <ChartPage />,
  };

  return (
    <div className="w-layout flex flex-col bg-teal-400">
      <Header />
      {routes[currentRoute]}
    </div>
  );
}

export default App;
