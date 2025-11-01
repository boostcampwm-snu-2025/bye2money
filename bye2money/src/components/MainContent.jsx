import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { InputBar } from "@/components/InputBar";
import { Transactions } from "@/components/Transactions";
import { Calendar } from "@/components/Calendar";
import { useAppContext } from "@/contexts/AppContext";

export function MainContent() {
  const { view } = useAppContext();
  return (
    <Layout>
        <Header/>
        {
          view === "list" && 
          <InputBar>
            <Transactions/>
          </InputBar>
        }
        {
          view === "calendar" && 
          <Calendar/>
        }
        {
          view === "stats" && 
          <Statistics/>
        }
    </Layout>
  )
}
