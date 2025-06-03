"use client";
import { getTransactionHistory } from "@/utils/transactions";
import { useState, useEffect } from "react";
import { TransactionData } from "../Transactions/TransactionHistory";
import {
  getAmountInvestedAndAmountLeft,
  getCurrentValue,
  getPortfolio,
} from "@/utils/portfolio";
import { PortfolioData } from "../Portfolio/portfolio";

export const Overview = ({ userId }: { userId: string }) => {
  const [ActivityHistory, setActivityHistory] = useState<TransactionData[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioData[]>([]);
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>(
    {}
  );
  const [amountInvested, setAmountInvested] = useState<string>("0.00");
  const [creditsLeft, setCreditsLeft] = useState<string>("0.00");
  const [portfolioValue, setPortfolioValue] = useState<string>("Nan");
  const [totalProfitLoss, setTotalProfitLoss] = useState<number>(0);
  const [profitLossPercent, setProfitLossPercent] = useState<number>(0);

  useEffect(() => {
    const fetchActivityHistory = async () => {
      const activity = await getTransactionHistory(userId);
      if (activity && activity.length > 0) {
        const activities = [...activity].sort(
          (a, b) => b.timestamp - a.timestamp
        );
        const recentActivity = activities.slice(0, 4);
        setActivityHistory(recentActivity);
      } else {
        setActivityHistory([]);
      }
    };
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio(userId);
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };
    const fetchAmountInvestedAndCreditsLeft = async () => {
      const [investedMoney, creditsLeft] = await getAmountInvestedAndAmountLeft(
        userId
      );
      setAmountInvested(investedMoney);
      setCreditsLeft(creditsLeft);
    };

    fetchActivityHistory();
    fetchAmountInvestedAndCreditsLeft();
    fetchPortfolio();
  }, [userId]);

  useEffect(() => {
    const updatePortfolioValue = async () => {
      try {
        const value = await getCurrentValue({ userId });
        setPortfolioValue(value);

        const profitLoss = Number(value) - Number(amountInvested);
        setTotalProfitLoss(profitLoss);

        const percent =
          Number(amountInvested) > 0
            ? (profitLoss / Number(amountInvested)) * 100
            : 0;
        setProfitLossPercent(percent);
      } catch (error) {
        console.error("Error updating portfolio value:", error);
      }
    };

    // Initial update
    updatePortfolioValue();

    // Set up interval
    const intervalId = setInterval(updatePortfolioValue, 10000);
    return () => clearInterval(intervalId);
  }, [userId, amountInvested]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 transition-all hover:border-zinc-600 hover:shadow-md hover:shadow-zinc-900/20">
          <h3 className="text-zinc-400 text-sm font-medium mb-2">
            Invested Amount
          </h3>
          <div className="text-2xl md:text-3xl text-white font-bold">
            ${amountInvested}
          </div>
          <div className="mt-2">
            <span className="text-zinc-500 text-xs">Total funds invested</span>
          </div>
        </div>

        <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 transition-all hover:border-zinc-600 hover:shadow-md hover:shadow-zinc-900/20">
          <h3 className="text-zinc-400 text-sm font-medium mb-2">
            Portfolio Value
          </h3>
          <div className="flex items-baseline">
            <div className="text-2xl md:text-3xl text-white font-bold">
              ${portfolioValue}
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-zinc-500 text-xs ml-2">Current Value</span>
          </div>
        </div>

        <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 transition-all hover:border-zinc-600 hover:shadow-md hover:shadow-zinc-900/20">
          <h3 className="text-zinc-400 text-sm font-medium mb-2">
            Available Cash
          </h3>
          <div className="text-2xl md:text-3xl text-white font-bold">
            ${creditsLeft}
          </div>
          <div className="mt-2">
            <span className="text-zinc-500 text-xs">Ready to invest</span>
          </div>
        </div>

        <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 transition-all hover:border-zinc-600 hover:shadow-md hover:shadow-zinc-900/20">
          <h3 className="text-zinc-400 text-sm font-medium mb-2">
            Total Profit/Loss
          </h3>
          <div
            className={`text-2xl md:text-3xl font-bold ${
              totalProfitLoss >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {totalProfitLoss >= 0 ? "+" : ""}
            {totalProfitLoss.toFixed(2)}
          </div>
          <div className="flex items-center mt-2">
            <span
              className={`text-sm font-medium ${
                profitLossPercent >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {profitLossPercent >= 0 ? "+" : ""}
              {profitLossPercent.toFixed(2)}%
            </span>
            <span className="text-zinc-500 text-xs ml-2">All time</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-zinc-800 rounded-lg border border-zinc-700 mb-8">
        <div className="p-6 border-b border-zinc-700">
          <h2 className="text-lg font-medium text-white">Recent Activity</h2>
        </div>
        <div className="divide-y divide-zinc-700">
          {ActivityHistory.length === 0 ? (
            <div className="p-6 text-center text-zinc-400">
              No recent activity. Start trading to see your activity here.
            </div>
          ) : (
            ActivityHistory.map((tx, i) => (
              <div key={i} className="p-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type.toLowerCase() === "buy"
                        ? "bg-green-500/20"
                        : tx.type.toLowerCase() === "sell"
                        ? "bg-red-500/20"
                        : "bg-blue-500/20"
                    }`}
                  >
                    <span
                      className={`text-lg ${
                        tx.type.toLowerCase() === "buy"
                          ? "text-green-500"
                          : tx.type.toLowerCase() === "sell"
                          ? "text-red-500"
                          : "text-blue-500"
                      }`}
                    >
                      {tx.type.toLowerCase() === "buy"
                        ? "+"
                        : tx.type.toLowerCase() === "sell"
                        ? "-"
                        : "$"}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-white font-medium">
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}{" "}
                      {tx.name} ({tx.symbol})
                    </p>
                    <p className="text-zinc-500 text-sm">
                      {tx.quantity} {tx.symbol} @ $
                      {tx.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm text-right">
                    $
                    {tx.total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-zinc-500 text-xs text-right">
                    {new Date(tx.timestamp).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
