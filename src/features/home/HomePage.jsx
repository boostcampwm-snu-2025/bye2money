import React from "react";
import TransactionInputRow from "./components/TransactionInputRow";
import TransactionList from "./components/TransactionList";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <TransactionInputRow />
      <TransactionList />
    </div>
  );
};

export default HomePage;
