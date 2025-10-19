import React, { useState } from "react";
import { Layout } from "@/components/common/Layout";
import { Header } from "@/components/domain/Header";
import { InputBar } from "./components/domain/InputBar";

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
    </Layout>
  );
}

export default App;