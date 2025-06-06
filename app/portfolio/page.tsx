"use client";

import { PortfolioData, PortfolioTotals, UserData } from "@/app/types";
import { getCookie } from "@/utils/auth";
import { getPortfolio, getTotals } from "@/utils/portfolio";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioData[]>([]);
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState(null as UserData | null);
  const [totals, setTotals] = useState<PortfolioTotals | null>(null);

  const getAssetIcon = (symbol: string) => {
    switch (symbol) {
      case "BTC":
        return "₿";
      case "ETH":
        return "Ξ";
      case "SOL":
        return "◎";
      default:
        return "$";
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      setIsLoading(true);
      const userCookie = getCookie();
      if (userCookie) {
        setUserData(userCookie);
      }
      setIsLoading(false);
    };

    checkLogin();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio(userData?.uid || "");
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };

    const fetchCurrentPrices = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/current/data/all`
        );
        const data = await response.json();

        if (data && data.data) {
          setCurrentPrices(data.data);
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching current prices:", error);
      }
    };

    fetchPortfolio();
    fetchCurrentPrices();
    setIsLoading(false);

    const intervalId = setInterval(fetchCurrentPrices, 10000);

    return () => clearInterval(intervalId);
  }, [userData?.uid]);

  useEffect(() => {
    const fetchTotals = async () => {
      if (portfolio.length > 0) {
        const result = await getTotals({ userId: userData?.uid || "" });
        setTotals(result);
      }
    };
    fetchTotals();
  }, [currentPrices, userData?.uid]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl py-16">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-zinc-200 dark:border-zinc-800 opacity-30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500 animate-spin"></div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-  semibold text-zinc-900 dark:text-white mb-2">
              Loading Portfolio
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Fetching your latest investment data
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
      {/* Header Section */}
      <div className="px-8 py-6 border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Portfolio Overview
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Track your investment performance in real-time
            </p>
          </div>

          {totals && (
            <div className="flex flex-wrap gap-4">
              <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 px-6 py-4 shadow-sm">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                  Total Portfolio Value
                </p>
                <p className="text-xl font-bold text-zinc-900 dark:text-white mt-1">
                  $
                  {totals.totalCurrentValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div
                className={`rounded-xl border px-6 py-4 shadow-sm ${
                  totals.totalProfitLoss >= 0
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                }`}
              >
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                  Total Return
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <p
                    className={`text-xl font-bold ${
                      totals.totalProfitLoss >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {totals.totalProfitLoss >= 0 ? "+" : ""}
                    {totals.totalProfitLossPercent.toFixed(2)}%
                  </p>
                  <span
                    className={`text-sm ${
                      totals.totalProfitLoss >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    (${totals.totalProfitLoss >= 0 ? "+" : ""}
                    {Math.abs(totals.totalProfitLoss).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                    )
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50">
            <tr>
              {[
                "Asset",
                "Holdings",
                "Avg. Price",
                "Market Value",
                "Performance",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-8 py-4 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
            {portfolio.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-zinc-400 dark:text-zinc-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                        No investments yet
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 max-w-sm">
                        Start building your portfolio by making your first
                        investment
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              portfolio.map((asset, i) => {
                const currentPrice =
                  currentPrices[asset.symbol] || asset.avgPrice;
                const currentValue = asset.quantity * currentPrice;
                const invested = asset.quantity * asset.avgPrice;
                const profitLoss = currentValue - invested;
                const profitLossPercent = (profitLoss / invested) * 100;

                return (
                  <tr
                    key={i}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-200"
                  >
                    {/* Asset Info */}
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {getAssetIcon(asset.symbol)}
                        </div>
                        <div>
                          <p className="text-base font-semibold text-zinc-900 dark:text-white">
                            {asset.name}
                          </p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                            {asset.symbol}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Holdings */}
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div>
                        <p className="text-base font-semibold text-zinc-900 dark:text-white">
                          {asset.quantity.toLocaleString(undefined, {
                            maximumFractionDigits: 8,
                          })}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          {asset.symbol} tokens
                        </p>
                      </div>
                    </td>

                    {/* Avg. Price */}
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div>
                        <p className="text-base font-semibold text-zinc-900 dark:text-white">
                          $
                          {asset.avgPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Average cost
                        </p>
                      </div>
                    </td>

                    {/* Market Value */}
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div>
                        <p className="text-base font-semibold text-zinc-900 dark:text-white">
                          $
                          {currentValue.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          @ $
                          {currentPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </td>

                    {/* Performance */}
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`flex items-center space-x-1 ${
                            profitLoss >= 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {profitLoss >= 0 ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                              />
                            </svg>
                          )}
                          <div>
                            <p className="text-base font-semibold">
                              {profitLoss >= 0 ? "+" : ""}$
                              {Math.abs(profitLoss).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                            <p className="text-sm">
                              {profitLoss >= 0 ? "+" : ""}
                              {profitLossPercent.toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {portfolio.length > 0 && (
        <div className="px-8 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
            <span>
              Showing {portfolio.length} asset
              {portfolio.length !== 1 ? "s" : ""}
            </span>
            <span>Prices updated every 10 seconds</span>
          </div>
        </div>
      )}
    </div>
  );
}
