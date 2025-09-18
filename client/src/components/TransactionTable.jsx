export default function TransactionTable({ transactions }) {
  return (
    <div className="overflow-x-auto border rounded-lg shadow my-6">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-b">
              <td className="px-4 py-2">{t.date}</td>
              <td className="px-4 py-2">{t.description}</td>
              <td className="px-4 py-2">{t.category}</td>
              <td className="px-4 py-2 capitalize">{t.type}</td>
              <td
                className={`px-4 py-2 font-medium ${
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹{Number(t.amount).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {transactions.length === 0 && (
        <p className="text-center py-4 text-gray-500">No transactions available</p>
      )}
    </div>
  );
}
