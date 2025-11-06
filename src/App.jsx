import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/features/home/HomePage";
import CalendarPage from "@/features/calendar/CalendarPage";
import StatisticsPage from "@/features/statistics/StatisticsPage";
import Header from "@/layouts/Header";
import { TransactionProvider } from "@/context/TransactionProvider.jsx";
export default function App() {
  return (
    <TransactionProvider>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar-page" element={<CalendarPage />} />
          <Route path="/statistics-page" element={<StatisticsPage />} />
        </Routes>
      </Router>
    </TransactionProvider>
  );
}
