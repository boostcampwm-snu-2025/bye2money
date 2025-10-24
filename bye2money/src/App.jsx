import React, { useState } from "react";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { InputBar } from "./components/InputBar";
import { Transactions } from "./components/Transactions";
import { AppContextProvider } from "./contexts/AppContext";

function App() {
  return (
    <AppContextProvider>
      <Layout>
        <Header/>
        <InputBar/>
        <Transactions/>
      </Layout>
    </AppContextProvider>
  );
}

export default App;