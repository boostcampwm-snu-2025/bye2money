import React from "react";
import { currency } from "../utils";

type Props = { income: number; expense: number };

const Totals: React.FC<Props> = ({ income, expense }) => {
  return (
    <section className="totals">
      <span>수입 <b>{currency(income)}</b></span>
      <span className="dot">•</span>
      <span>지출 <b>{currency(expense)}</b></span>
    </section>
  );
};

export default Totals;
