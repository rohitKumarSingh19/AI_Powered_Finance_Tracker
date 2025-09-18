export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netBalance = income - expenses;

  const cards = [
    { title: "Total Income", value: `₹${income.toFixed(2)}`, color: "bg-green-100 text-green-700" },
    { title: "Total Expenses", value: `₹${expenses.toFixed(2)}`, color: "bg-red-100 text-red-700" },
    { title: "Net Balance", value: `₹${netBalance.toFixed(2)}`, color: "bg-blue-100 text-blue-700" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      {cards.map((card, idx) => (
        <div key={idx} className={`p-4 rounded-xl shadow ${card.color}`}>
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
