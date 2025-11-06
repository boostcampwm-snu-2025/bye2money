import React from "react";
import { AppContextProvider } from "@/contexts/AppContext";
import { MainContent } from "./components/MainContent";

function App() {
  return (
    <AppContextProvider>
      <MainContent/>
    </AppContextProvider>
  );
}

export default App;