"use client";
import { useState, useEffect, useRef } from "react";
import StockChart from "@/app/components/StockChart";
import StockData from "@/app/components/StockData";

type IndexData = {
  currentPrice: number;
  change: number;
  percentChange: number;
  previousClose: number;
  high: number;
  low: number;
};

export default function GOLD_ETF() {
  const [data, setData] = useState<IndexData | null>(null);
  const [chartData, setChartData] = useState<{ time: number; value: number }[]>(
    []
  );
  const [timeframe, setTimeframe] = useState<string>("1D");
  const [isChartLoading, setIsChartLoading] = useState<boolean>(false);
  const [chartError, setChartError] = useState<string | null>(null);
  const lastSignificantPriceRef = useRef<number | null>(null);
  const [fiftyTwoWeekHigh, setFiftyTwoWeekHigh] = useState<number | null>(null);
  const [fiftyTwoWeekLow, setFiftyTwoWeekLow] = useState<number | null>(null);
  const Name = "SPDR Gold Shares ETF (GLD)";
  const [marketStatus, setMarketStatus] = useState<{
    isOpen: boolean;
    statusMessage: string;
  }>({
    isOpen: false,
    statusMessage: "Checking market status...",
  });
  const [showMore, setShowMore] = useState(false);
  const lastUpdateRef = useRef<number>(0);

  const fetchHistoricalData = async (selectedTimeframe = timeframe) => {
    try {
      setIsChartLoading(true);
      setChartError(null);

      let interval: string;
      let range: string;

      switch (selectedTimeframe) {
        case "1D":
          interval = "5m";
          range = "1d";
          break;
        case "1W":
          interval = "30m";
          range = "5d";
          break;
        case "1M":
          interval = "1d";
          range = "1mo";
          break;
        case "1Y":
          interval = "1d";
          range = "1y";
          break;
        case "MAX":
          interval = "1wk";
          range = "max";
          break;
        default:
          interval = "5m";
          range = "1d";
      }

      const response = await fetch(
        `/api/stock?interval=${interval}&range=${range}&symbol=${process.env.NEXT_PUBLIC_GOLD_ETF_SYMBOL}`
      );

      if (!response.ok) {
        throw new Error(`Yahoo API error! Status: ${response.status}`);
      }

      const data = await response.json();

      const result = data?.chart?.result?.[0];

      if (!fiftyTwoWeekHigh || !fiftyTwoWeekLow) {
        setFiftyTwoWeekHigh(result?.meta?.fiftyTwoWeekHigh);
        setFiftyTwoWeekLow(result?.meta?.fiftyTwoWeekLow);
      }

      if (
        !result ||
        !result.timestamp ||
        !result.indicators?.quote?.[0]?.close
      ) {
        throw new Error("Invalid response structure from Yahoo");
      }

      const timestamps = result.timestamp;
      const closes = result.indicators.quote[0].close;

      const formattedData = timestamps
        .map((ts: number, i: number) => ({
          time: ts * 1000,
          value: closes[i],
        }))
        .filter((d: any) => d.value !== null && d.value !== undefined);

      setChartData(formattedData);

      if (selectedTimeframe === "1D" && formattedData.length > 0) {
        const lastPoint = formattedData[formattedData.length - 1];
        lastSignificantPriceRef.current = lastPoint.value;
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
          <div
            className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium
      ${
        marketStatus.isOpen
          ? "bg-green-900/30 text-green-500 border border-green-800"
          : "bg-red-900/30 text-red-500 border border-red-800"
      }
    `}
          >
            <div
              className={`w-2 h-2 rounded-full mr-2 
        ${marketStatus.isOpen ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            {marketStatus.statusMessage}
          </div>
        </div>

        <hr className="border-zinc-700 my-6" />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-white mb-2">{Name}</h1>
          <p className="text-sm text-zinc-400 mb-6">
            Real-time stock data, performance chart, and key metrics.
          </p>
          <div className="mt-3 mb-6 p-4 bg-zinc-800/50 rounded-md border border-zinc-700 text-zinc-300 text-sm">
            <strong>About SPDR Gold Shares ETF:</strong>
            Tracks the price of gold bullion — provides investors with exposure
            to the day-to-day movement of the price of gold bullion,
            representing a cost-effective way to access the gold market.
            <button
              onClick={() => setShowMore(!showMore)}
              className="ml-2 text-amber-400 underline text-xs"
            >
              {showMore ? "Show less" : "Learn more"}
            </button>
            {showMore && (
              <p className="mt-2 text-xs text-zinc-400">
                GLD is backed by physical gold held in secure vaults. Each share
                represents approximately 1/10th of an ounce of gold. It's often
                used as a hedge against inflation and currency devaluation,
                providing portfolio diversification during economic uncertainty.
              </p>
            )}
          </div>

          <StockChart
            chartData={chartData}
            timeframe={timeframe}
            isChartLoading={isChartLoading}
            chartError={chartError}
            previousClose={data?.previousClose}
            change={data?.change}
            onTimeframeChange={setTimeframe}
            onRetry={() => fetchHistoricalData(timeframe)}
          />

          {/* 52-Week Data Section */}
          {(fiftyTwoWeekHigh || fiftyTwoWeekLow) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {fiftyTwoWeekHigh && (
                <div className="bg-zinc-800 p-4 rounded-md border-l-4 border-green-500">
                  <div className="text-zinc-400 text-sm">52-Week High</div>
                  <div className="text-white font-medium text-lg">
                    ${fiftyTwoWeekHigh.toFixed(2)}
                  </div>
                  {data?.currentPrice && (
                    <div className="text-xs text-zinc-500 mt-1">
                      {((data?.currentPrice / fiftyTwoWeekHigh) * 100).toFixed(
                        1
                      )}
                      % of high
                    </div>
                  )}
                </div>
              )}

              {fiftyTwoWeekLow && (
                <div className="bg-zinc-800 p-4 rounded-md border-l-4 border-red-500">
                  <div className="text-zinc-400 text-sm">52-Week Low</div>
                  <div className="text-white font-medium text-lg">
                    ${fiftyTwoWeekLow.toFixed(2)}
                  </div>
                  {data?.currentPrice && fiftyTwoWeekHigh && (
                    <div className="text-xs text-zinc-500 mt-1">
                      {(
                        ((data?.currentPrice - fiftyTwoWeekLow) /
                          (fiftyTwoWeekHigh - fiftyTwoWeekLow)) *
                        100
                      ).toFixed(1)}
                      % from low
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <StockData
            symbol={process.env.NEXT_PUBLIC_INVESCO_SYMBOL || "QQQ"}
            name={Name}
            onDataUpdate={(newData) => {
              setData(newData);
              setMarketStatus(newData.marketStatus);

              if (timeframe === "1D") {
                const now = Date.now();
                if (now - lastUpdateRef.current >= 60000) {
                  // 10 seconds
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
