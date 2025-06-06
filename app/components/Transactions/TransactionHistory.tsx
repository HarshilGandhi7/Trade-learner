"use client";
import { TransactionData } from "@/app/types";
import { getTransactionHistory } from "@/utils/transactions";
import React, { useEffect, useState } from "react";


export const TransactionHistory = ({ userId }: { userId: string }) => {
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionData[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 6;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactionHistory.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(transactionHistory.length / transactionsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      console.log("Fetching transaction history for user:", userId);
      const transactions = await getTransactionHistory(userId);
      if (transactions && transactions.length > 0) {
        console.log("Fetched transactions:", transactions);
        setTransactionHistory(transactions);
      } else {
        setTransactionHistory([]);
      }
    };
    fetchTransactionHistory();
  }, []);
  return (
    <div className="bg-zinc-800 rounded-lg border border-zinc-700">
      <div className="p-6 border-b border-zinc-700 flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Transaction History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead className="bg-zinc-900">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
              >
                Asset
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {transactionHistory.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-zinc-400"
                >
                  No transactions found. Start trading to see your history here.
                </td>
              </tr>
            ) : (
              currentTransactions.map((tx, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tx.type.toLowerCase() === "buy"
                          ? "bg-green-100 text-green-800"
                          : tx.type.toLowerCase() === "sell"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {tx.name} ({tx.symbol})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {tx.quantity} {tx.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    $
                    {tx.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    $
                    {tx.total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {transactionHistory.length > 0 && (
        <div className="px-6 py-4 border-t border-zinc-700">
          <nav className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">
                Showing{" "}
                <span className="font-medium">
                  {indexOfFirstTransaction + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastTransaction, transactionHistory.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{transactionHistory.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav className="flex items-center">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 text-sm rounded-l ${
                    currentPage === 1
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      : "bg-zinc-700 text-white hover:bg-zinc-600"
                  }`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    );
                  })
                  .map((page, index, array) => (
                    <div key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 text-zinc-500">...</span>
                      )}
                      <button
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 text-sm ${
                          currentPage === page
                            ? "bg-amber-600 text-white"
                            : "bg-zinc-700 text-white hover:bg-zinc-600"
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  ))}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 text-sm rounded-r ${
                    currentPage === totalPages
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      : "bg-zinc-700 text-white hover:bg-zinc-600"
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};
