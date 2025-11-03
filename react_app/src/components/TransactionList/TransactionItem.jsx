import "./TransactionItem.css";

const CATEGORY_COLORS = {
  "문화/여가": "#f2e6ff",
  "교통": "#d9f2ff",
  "식비": "#fff5cc",
  "쇼핑": "#ffd6d6",
  "주거/관리": "#e0ffe0",
  "기타": "#e9e9e9",
};

export default function TransactionItem({ tx, isFirst, isLast }) {
  const bgColor = CATEGORY_COLORS[tx.category] || "#f5f5f5";

  return (
    <div
      className={`transaction-row ${isFirst ? "first" : ""} ${
        isLast ? "last" : ""
      }`}
    >
      <div className="tx-category" style={{ backgroundColor: bgColor }}>
        {tx.category}
      </div>

      <div className="tx-desc">{tx.description || "설명 없음"}</div>

      <div className="tx-payment">{tx.paymentMethod}</div>

      <div
        className={`tx-amount ${
          tx.type === "expense" ? "expense" : "income"
        }`}
      >
        {tx.type === "expense" ? "−" : "+"}
        {tx.amount.toLocaleString()}원
      </div>
    </div>
  );
}
