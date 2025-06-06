"use client";
import { useState, useEffect, useRef } from "react";
import CryptoChart from "@/app/components/Crypto/CryptoChart";
import CryptoData from "@/app/components/Crypto/CryptoData";
import TransactionModal from "@/app/components/Transactions/TransactionModal";
import { executeTransaction } from "@/utils/transactions";
import { useParams } from "next/navigation";
import { CryptoDataType } from "@/app/types";
import { CRYPTO_INFO } from "@/app/constants";

export default function CryptoPage() {
  const params = useParams();
  const symbol = params.symbol as keyof typeof CRYPTO_INFO;

  const [data, setData] = useState<CryptoDataType | null>(null);
  const [chartData, setChartData] = useState<{ time: number; value: number }[]>(
    []
  );
  const [timeframe, setTimeframe] = useState<string>("1D");
  const [isChartLoading, setIsChartLoading] = useState<boolean>(false);
  const [chartError, setChartError] = useState<string | null>(null);
  const lastSignificantPriceRef = useRef<number | null>(null);
  const Name = CRYPTO_INFO[symbol]?.name;
  const [showMore, setShowMore] = useState(false);
  const lastUpdateRef = useRef<number>(0);

  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [quantity, setQuantity] = useState("0.01");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        `${process.env.NEXT_PUBLIC_CRYPTO_CHART_URL}/api/v3/coins/${CRYPTO_INFO[symbol].coinName}/market_chart?vs_currency=usd&days=${days}`
      );

      if (!response.ok) {
        throw new Error(`Crypto API error! Status: ${response.status}`);
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

        setData((prevData: CryptoDataType | null) => ({
          symbol: symbol,
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

  async function handleTransaction(
    currentPrice: number,
    type: string,
    quantity: string
  ) {
    await executeTransaction({
      symbol: symbol,
      name: CRYPTO_INFO[symbol]?.name,
      currentPrice,
      type: type as "buy" | "sell",
      quantity,
      setIsSubmitting,
    });
  }

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
            <strong>{CRYPTO_INFO[symbol]?.name}</strong>
            {CRYPTO_INFO[symbol]?.description}
            <button
              onClick={() => setShowMore(!showMore)}
              className="ml-2 text-amber-400 underline text-xs"
            >
              {showMore ? "Show less" : "Learn more"}
            </button>
            {showMore && (
              <p className="mt-2 text-xs text-zinc-400">
                {CRYPTO_INFO[symbol]?.longDescription}
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
          <div className="flex space-x-4 mt-6 mb-6">
            <button
              onClick={() => setBuyModalOpen(true)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center justify-center"
              disabled={!data?.currentPrice}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
              Buy
            </button>

            <button
              onClick={() => setSellModalOpen(true)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center justify-center"
              disabled={!data?.currentPrice}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 12H6"
                />
              </svg>
              Sell
            </button>
          </div>

          <CryptoData
            symbol={CRYPTO_INFO[symbol].apiSymbol ?? symbol}
            name={Name}
            onDataUpdate={(newData: CryptoDataType) => {
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

      <TransactionModal
        isOpen={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        type="buy"
        assetName={CRYPTO_INFO[symbol]?.name}
        assetSymbol={symbol}
        currentPrice={data?.currentPrice}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onConfirm={() =>
          handleTransaction(data?.currentPrice || 0, "buy", quantity)
        }
        isSubmitting={isSubmitting}
      />

      <TransactionModal
        isOpen={sellModalOpen}
        onClose={() => setSellModalOpen(false)}
        type="sell"
        assetName={CRYPTO_INFO[symbol]?.name}
        assetSymbol={symbol}
        currentPrice={data?.currentPrice}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onConfirm={() =>
          handleTransaction(data?.currentPrice || 0, "sell", quantity)
        }
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
