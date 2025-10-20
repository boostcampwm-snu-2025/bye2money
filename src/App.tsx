import { Route, Routes, Navigate } from "react-router-dom"
import { Header } from './components/Header'
import { useMonthNavigator } from './utils/date'
import './styles/App.css'
import { MainPage } from "./pages/MainPage";

function App() {
  const { year, month, prev, next } = useMonthNavigator();

  return (
    <>
      <Header 
        title="Wise Wallet"
        year={year}
        month={month}
        onPrevMonth={prev}
        onNextMonth={next}
      />
      <main>
        <Routes>
          <Route path="/*" element={ <Navigate to="/main" /> } />
          <Route path="/main" element={ <MainPage /> } />
          <Route path="/calendar" element={ <div>Calendar Page (to be implemented)</div> } />
          <Route path="/charts" element={ <div>Charts Page (to be implemented)</div> } />
        </Routes>
      </main>
    </>
  )
}

export default App
