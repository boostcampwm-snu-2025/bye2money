import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import ListPage from "./pages/list/ListPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import StatsPage from "./pages/stats/StatsPage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ListPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="stats" element={<StatsPage />} />
            </Route>
        </Routes>
    );
};

export default App;
