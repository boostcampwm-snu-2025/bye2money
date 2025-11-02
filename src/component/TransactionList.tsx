import type Transaction from '../types.ts';

interface TransactionListProps {
  transactions: Transaction[];
}

function formatMoney(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n);
}

export default function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="w-11/12 max-w-7xl mx-auto mt-8 px-6 py-12 bg-white rounded-lg shadow-lg text-center">
        <p className="text-slate-400">등록된 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-7xl mx-auto mt-8 px-6 py-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">거래 내역</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">날짜</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">내용</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">분류</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">결제수단</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">금액</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const amountClass = transaction.isExpense
                ? "text-red-600"
                : "text-blue-600";
              const sign = transaction.isExpense ? "−" : "+";

              return (
                <tr
                  key={transaction.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {transaction.date}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {transaction.content}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {transaction.category}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {transaction.method}
                  </td>
                  <td className={`py-3 px-4 text-sm font-semibold text-right ${amountClass}`}>
                    {sign} {formatMoney(transaction.amount)}원
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 합계 표시 */}
      <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
        <div className="text-sm space-y-1">
          <div className="flex gap-4">
            <span className="text-slate-600">총 지출:</span>
            <span className="text-red-600 font-semibold">
              −{" "}
              {formatMoney(
                transactions
                  .filter((t) => t.isExpense)
                  .reduce((sum, t) => sum + t.amount, 0)
              )}
              원
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-slate-600">총 수입:</span>
            <span className="text-blue-600 font-semibold">
              +{" "}
              {formatMoney(
                transactions
                  .filter((t) => !t.isExpense)
                  .reduce((sum, t) => sum + t.amount, 0)
              )}
              원
            </span>
          </div>
          <div className="flex gap-4 pt-2 border-t">
            <span className="text-slate-700 font-semibold">잔액:</span>
            <span className="text-slate-900 font-bold">
              {formatMoney(
                transactions.reduce(
                  (sum, t) => sum + (t.isExpense ? -t.amount : t.amount),
                  0
                )
              )}
              원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
