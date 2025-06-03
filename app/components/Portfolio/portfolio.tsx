"use client";

import { getPortfolio } from "@/utils/portfolio";
import { useEffect, useState } from "react";

interface PortfolioData {
  avgPrice: number;
  firstPurchased: string;
  lastUpdated: string;
  name: string;
  quantity: number;
  symbol: string;
}

export const Portpolio = ({ userId }: { userId: string }) => {
  const [portfolio, setPortfolio] = useState<PortfolioData[]>([]);
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio(userId);
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
          console.log("Current prices fetched:", data.data);
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
  }, [userId]);

  if (isLoading) {
    return (
      <div className="bg-zinc-800 rounded-lg border border-zinc-700 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          <p className="text-amber-500 text-lg font-medium">
            Loading your portfolio...
          </p>
          <p className="text-zinc-400 text-sm">
            Fetching your latest investment data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 rounded-lg border border-zinc-700">
      <div className="p-6 border-b border-zinc-700">
        <h2 className="text-lg font-medium text-white">Your Portfolio</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead className="bg-zinc-900">
            <tr>
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
                Avg. Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
              >
                Current Value
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
              >
                Profit/Loss
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {portfolio.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-zinc-400"
                >
                  No assets in your portfolio. Start trading to build your
                  portfolio.
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

                return (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center font-medium text-amber-400">
                          {getAssetIcon(asset.symbol)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {asset.name} ({asset.symbol})
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        {asset.quantity} {asset.symbol}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        $
                        {asset.avgPrice.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        $
                        {(currentPrices[asset?.symbol] || 0).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm ${
                          profitLoss >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {profitLoss >= 0 ? "+" : ""}$
                        {Math.abs(profitLoss).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        ({profitLoss >= 0 ? "+" : ""}
                        {profitLossPercent.toFixed(1)}%)
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
