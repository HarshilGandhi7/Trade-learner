"use client";
import { useState, useEffect, useRef } from "react";
import CryptoChart from "@/app/components/CryptoChart";
import CryptoData from "@/app/components/CryptoData";

type CryptoData = {
  symbol: string;
  currentPrice: number;
  change24h: number;
  percentChange24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
  lastUpdate: number;
};

export interface CryptoDataProps {
  symbol: string;
  name: string;
  onDataUpdate: (newData: CryptoData) => void;
}

export default function SOLANA_PAGE() {
  const [data, setData] = useState<CryptoData | null>(null);
  const [chartData, setChartData] = useState<{ time: number; value: number }[]>(
    []
  );
  const [timeframe, setTimeframe] = useState<string>("1D");
  const [isChartLoading, setIsChartLoading] = useState<boolean>(false);
  const [chartError, setChartError] = useState<string | null>(null);
  const lastSignificantPriceRef = useRef<number | null>(null);
  const Name = "Solana (SOL-USD)";
  const [showMore, setShowMore] = useState(false);
  const lastUpdateRef = useRef<number>(0);

  const fetchHistoricalData = async (selectedTimeframe = timeframe) => {
    try {
      setIsChartLoading(true);
      setChartError(null);

      let days: string;
      switch (selectedTimeframe) {
        case "1D":
          days = "1";
          break;
        case "1W":
          days = "7";
          break;
        case "1M":
          days = "30";
          break;
        case "1Y":
          days = "365";
          break;
        default:
          days = "1";
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CRYPTO_CHART_URL}/api/v3/coins/solana/market_chart?vs_currency=usd&days=${days}`
      );

      if (!response.ok) {
        throw new Error(`Solana API error! Status: ${response.status}`);
      }

      const data = await response.json();

      const formattedData = data.prices.map((item: [number, number]) => ({
        time: item[0],
        value: item[1],
      }));

      setChartData(formattedData);

      if (data.prices.length > 0) {
        const latestPrice = data.prices[data.prices.length - 1][1];
        const yesterdayPrice = data.prices[0][1];
        const change24h = latestPrice - yesterdayPrice;
        const percentChange24h = (change24h / yesterdayPrice) * 100;

        setData((prevData: CryptoData | null) => ({
          symbol: "BTCUSDT",
          currentPrice: latestPrice,
          change24h: change24h,
          percentChange24h: percentChange24h,
          high24h: Math.max(...data.prices.map((p: [number, number]) => p[1])),
          low24h: Math.min(...data.prices.map((p: [number, number]) => p[1])),
          volume24h: data.total_volumes.reduce(
            (acc: number, curr: [number, number]) => acc + curr[1],
            0
          ),
          marketCap: data.market_caps.reduce(
            (acc: number, curr: [number, number]) => acc + curr[1],
            0
          ),
          lastUpdate: Date.now(),
        }));

        if (selectedTimeframe === "1D") {
          lastSignificantPriceRef.current = latestPrice;
        }
      }
    } catch (err) {
      console.error("Failed to fetch historical data:", err);
      setChartError("Unable to load chart data. Try refreshing.");
    } finally {
      setIsChartLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricalData(timeframe);
  }, [timeframe]);

  return (
    <div className="bg-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-4 px-4">
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-sm text-zinc-400">Market Status:</span>
          <div className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-green-900/30 text-green-500 border border-green-800">
            <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
            ALWAYS OPEN
          </div>
        </div>

        <hr className="border-zinc-700 my-6" />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-white mb-2">{Name}</h1>
          <p className="text-sm text-zinc-400 mb-6">
            Real-time cryptocurrency data, performance chart, and key metrics.
          </p>
          <div className="mt-3 mb-6 p-4 bg-zinc-800/50 rounded-md border border-zinc-700 text-zinc-300 text-sm">
            <strong>About Solana:</strong>
            High-performance blockchain platform — known for its ultra-fast
            processing speeds and low transaction costs, enabling scalable
            decentralized applications and NFT marketplaces.
            <button
              onClick={() => setShowMore(!showMore)}
              className="ml-2 text-amber-400 underline text-xs"
            >
              {showMore ? "Show less" : "Learn more"}
            </button>
            {showMore && (
              <p className="mt-2 text-xs text-zinc-400">
                Launched in 2020 by Anatoly Yakovenko, Solana can process up to
                65,000 transactions per second through its unique
                proof-of-history and proof-of-stake consensus mechanisms. The
                ecosystem has grown rapidly to become a major platform for DeFi,
                NFTs, and Web3 applications, though it faces challenges with
                network stability and decentralization.
              </p>
            )}
          </div>

          <CryptoChart
            chartData={chartData}
            timeframe={timeframe}
            isChartLoading={isChartLoading}
            chartError={chartError}
            change24h={data?.change24h}
            onTimeframeChange={setTimeframe}
            onRetry={() => fetchHistoricalData(timeframe)}
          />

          <CryptoData
            symbol={process.env.NEXT_PUBLIC_SOLANA_SYMBOL || "SOLUSDT"}
            name={Name}
            onDataUpdate={(newData: CryptoData) => {
              setData(newData);
              if (timeframe === "1D") {
                const now = Date.now();
                if (now - lastUpdateRef.current >= 60000) {
                  lastUpdateRef.current = now;
                  setChartData((prevData) => [
                    ...prevData,
                    {
                      time: new Date(newData.lastUpdate).getTime(),
                      value: newData.currentPrice,
                    },
                  ]);
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
