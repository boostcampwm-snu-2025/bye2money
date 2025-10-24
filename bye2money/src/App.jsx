import React, { useState } from "react";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { InputBar } from "./components/InputBar";
import { Transactions } from "./components/Transactions";

function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [view, setView] = useState("list");

  return (
    <Layout>
      <Header 
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        view={view}
        setView={setView}/>
      <InputBar/>
      <Transactions
        year={year}
        month={month}/>
    </Layout>
  );
}

export default App;