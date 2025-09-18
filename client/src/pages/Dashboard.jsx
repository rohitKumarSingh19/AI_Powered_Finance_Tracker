import { useEffect, useState } from "react";
import API from "../services/api";
import FileUpload from "../components/FileUpload";
import TransactionTable from "../components/TransactionTable";
import SummaryCards from "../components/SummaryCards";
import Chart from "../components/Chart";
import Footer from "../components/Footer";
export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">
          💰 Finance Tracker
        </h1>
        <p className="text-gray-500 text-center md:text-left mt-1">
          Track your income, expenses, and savings with AI-powered insights
        </p>
      </header>

      {/* File Upload */}
      <section className="mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Upload Bank Statement
          </h2>
          <FileUpload />
        </div>
      </section>

      {/* Summary Cards */}
      <SummaryCards transactions={transactions} />

      {/* Main Content: Table + Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Transactions Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Transactions
          </h2>
          {loading ? (
            <p className="text-gray-500 text-center">Loading transactions...</p>
          ) : (
            <TransactionTable transactions={transactions} />
          )}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Spending Insights
          </h2>
          <Chart transactions={transactions} />
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
    
  );
}
