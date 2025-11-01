import React from "react";
import TransactionInputRow from "@/features/home/components/TransactionInputRow";
import TransactionList from "@/features/home/components/TransactionList";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center gap-5 mt-8">
      <TransactionInputRow />
      <TransactionList />
    </div>
  );
};

export default HomePage;
