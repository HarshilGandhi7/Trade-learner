"use client";
import { useState, useEffect, useRef } from "react";
import CryptoChart from "@/app/components/Crypto/CryptoChart";
import CryptoData from "@/app/components/Crypto/CryptoData";
import TransactionModal from "@/app/components/Transactions/TransactionModal";
import { executeTransaction } from "@/utils/transactions";
import { useParams } from "next/navigation";

const CRYPTO_INFO = {
  BTC: {
    key: "BTC",
    symbol: "BTCUSDT",
    name: "Bitcoin (BTC-USD)",
    description:
      "The world's first and largest cryptocurrency — operates on a decentralized blockchain network, providing peer-to-peer transactions without intermediaries or central authority.",
    longDescription:
      'Created in 2009 by pseudonymous developer Satoshi Nakamoto, Bitcoin has a fixed supply cap of 21 million coins. It uses proof-of-work consensus to validate transactions and has become widely recognized as "digital gold" — a hedge against inflation and currency devaluation during economic uncertainty.',
    coinName: "bitcoin",
    apiSymbol:process.env.NEXT_PUBLIC_BITCOIN_SYMBOL
  },
  ETH: {
    key: "ETH",
    symbol: "ETHUSDT",
    name: "Ethereum (ETH-USD)",
    description:
      "A decentralized blockchain platform that enables smart contracts and decentralized applications (dApps) to be built and run without downtime, fraud, control, or interference from a third party.",
    longDescription:
      "Launched in 2015, Ethereum introduced smart contract functionality to blockchain technology. It's transitioning from proof-of-work to proof-of-stake consensus with Ethereum 2.0, aiming to improve scalability, security, and sustainability. Ethereum hosts thousands of tokens and is the foundation of decentralized finance (DeFi) applications.",
    coinName: "ethereum",
    apiSymbol: process.env.NEXT_PUBLIC_ETHEREUM_SYMBOL
  },
  SOL: {
    key: "SOL",
    symbol: "SOLUSDT",
    name: "Solana (SOL-USD)",
    description:
      "A high-performance blockchain supporting smart contracts and decentralized applications with an emphasis on speed and low transaction costs.",
    longDescription:
      "Launched in 2020, Solana uses a unique proof-of-history consensus combined with proof-of-stake to achieve high throughput (up to 65,000 transactions per second) and very low fees. Its ecosystem has grown rapidly with NFT marketplaces, DeFi protocols, and Web3 applications making it a popular alternative to Ethereum for developers and users seeking scalability.",
    coinName: "solana",
    apiSymbol: process.env.NEXT_PUBLIC_SOLANA_SYMBOL
  },
};

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

export default function CryptoPage() {
  const params = useParams();
  const symbol = params.symbol as keyof typeof CRYPTO_INFO;

  const [data, setData] = useState<CryptoData | null>(null);
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

        setData((prevData: CryptoData | null) => ({
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
