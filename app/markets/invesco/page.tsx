"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
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

export default function NasdaqPage() {
  const [data, setData] = useState<IndexData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);
  const updateMs = 1500;
  const [chartData, setChartData] = useState<{ time: number; value: number }[]>(
    []
  );
  const [timeframe, setTimeframe] = useState<string>("1D");
  const [isChartLoading, setIsChartLoading] = useState<boolean>(false);
  const [chartError, setChartError] = useState<string | null>(null);
  const lastSignificantPriceRef = useRef<number | null>(null);
  const lastChartUpdateRef = useRef<number>(0);
  const MINIMUM_UPDATE_INTERVAL = 30000;
  const PRICE_CHANGE_THRESHOLD = 0.05;
  const [fiftyTwoWeekHigh, setFiftyTwoWeekHigh] = useState<number | null>(null);
  const [fiftyTwoWeekLow, setFiftyTwoWeekLow] = useState<number | null>(null);
  const Name = "Invesco QQQ Trust – Nasdaq-100 ETF";
  const [marketStatus, setMarketStatus] = useState<string>(
    "Checking market status..."
  );
  const socketRef = useRef<WebSocket | null>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showMore, setShowMore] = useState(false);

  const isMarketHoliday = (date: Date): boolean => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    const holidays2025 = [
      "2025-01-01", // New Year's Day
      "2025-01-20", // MLK Day
      "2025-02-17", // Presidents Day
      "2025-04-18", // Good Friday
      "2025-05-26", // Memorial Day
      "2025-06-19", // Juneteenth
      "2025-07-04", // Independence Day
      "2025-09-01", // Labor Day
      "2025-11-27", // Thanksgiving
      "2025-12-25", // Christmas
    ];

    return holidays2025.includes(dateString);
  };

  const checkMarketOpen = (): boolean => {
    const now = new Date();
    const options = { timeZone: "America/New_York" };
    const nyTime = new Date(now.toLocaleString("en-US", options));

    const day = nyTime.getDay();
    if (day === 0 || day === 6) {
      setMarketStatus("Market Closed (Weekend)");
      return false;
    }

    if (isMarketHoliday(nyTime)) {
      setMarketStatus("Market Closed (Holiday)");
      return false;
    }

    const hours = nyTime.getHours();
    const minutes = nyTime.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;
    const marketOpenTime = 9 * 60 + 30;
    const marketCloseTime = 16 * 60;

    if (
      currentTimeInMinutes >= marketOpenTime &&
      currentTimeInMinutes < marketCloseTime
    ) {
      setMarketStatus("Market Open - Live Data");
      return true;
    } else {
      setMarketStatus("Market Closed - Showing Last Close Price");
      return false;
    }
  };

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
        `/api/stock?interval=${interval}&range=${range}&symbol=${process.env.NEXT_PUBLIC_NASDAQ_SYMBOL}`
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${process.env.NEXT_PUBLIC_NASDAQ_SYMBOL}&token=${process.env.NEXT_PUBLIC_NASDAQ_API_KEY}`
        );
        const quoteData = response.data;
        setData({
          currentPrice: quoteData.c,
          change: quoteData.d,
          percentChange: quoteData.dp,
          previousClose: quoteData.pc,
          high: quoteData.h,
          low: quoteData.l,
        });
        await fetchHistoricalData();
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
    checkMarketOpen();
    const manageConnection = () => {
      const isOpen = checkMarketOpen();
      if (isOpen && !socketRef.current) {
        socketRef.current = new WebSocket(
          `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_NASDAQ_API_KEY}`
        );
        socketRef.current.addEventListener("open", function () {
          if (socketRef.current) {
            socketRef.current.send(
              JSON.stringify({
                type: "subscribe",
                symbol: process.env.NEXT_PUBLIC_NASDAQ_SYMBOL,
              })
            );
          }
        });

        socketRef.current.addEventListener("message", function (event) {
          const message = JSON.parse(event.data);

          if (message.type === "ping") {
            return;
          }

          if (
            message.type === "trade" &&
            message.data &&
            message.data.length > 0
          ) {
            const now = Date.now();
            if (now - lastUpdateTime < updateMs) {
              return;
            }

            const latestTrade = message.data[message.data.length - 1];
            setData((prevData) => {
              if (
                !prevData ||
                latestTrade.p === undefined ||
                isNaN(latestTrade.p)
              ) {
                return prevData;
              }

              const newPrice = latestTrade.p;
              const previousClose = prevData.previousClose;

              const change = previousClose
                ? newPrice - previousClose
                : prevData.change;
              const percentChange = previousClose
                ? ((newPrice - previousClose) / previousClose) * 100
                : prevData.percentChange;

              if (now - lastChartUpdateRef.current >= MINIMUM_UPDATE_INTERVAL) {
                const newPrice = latestTrade.p;
                const lastPrice = lastSignificantPriceRef.current;

                const priceChangePercent = lastPrice
                  ? Math.abs((newPrice - lastPrice) / lastPrice) * 100
                  : 100;

                if (
                  !lastPrice ||
                  priceChangePercent >= PRICE_CHANGE_THRESHOLD
                ) {
                  

                  setChartData((prev) => [
                    ...prev,
                    { time: now, value: newPrice },
                  ]);

                  lastChartUpdateRef.current = now;
                  lastSignificantPriceRef.current = newPrice;
                }
              }
              setLastUpdateTime(now);

              return {
                ...prevData,
                currentPrice: newPrice,
                change: change,
                percentChange: percentChange,
                high:
                  prevData.high !== undefined
                    ? Math.max(prevData.high, newPrice)
                    : newPrice,
                low:
                  prevData.low !== undefined
                    ? Math.min(prevData.low, newPrice)
                    : newPrice,
              };
            });
          }
        });

        socketRef.current.addEventListener("error", function (error) {
          toast.error("Please refresh the page to reconnect.");
          console.error("WebSocket error:", error);
        });
      } else if (!isOpen && socketRef.current) {

        if (socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(
            JSON.stringify({
              type: "unsubscribe",
              symbol: process.env.NEXT_PUBLIC_NASDAQ_SYMBOL,
            })
          );
          socketRef.current.close();
        }
        socketRef.current = null;
      }
    };

    manageConnection();

    checkIntervalRef.current = setInterval(manageConnection, 60000);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }

      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send(
          JSON.stringify({
            type: "unsubscribe",
            symbol: process.env.NEXT_PUBLIC_NASDAQ_SYMBOL,
          })
        );
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div className="bg-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-4 px-4">
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-sm text-zinc-400">Market Status:</span>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium
      ${
        marketStatus.includes("Open")
          ? "bg-green-900/30 text-green-500 border border-green-800"
          : "bg-red-900/30 text-red-500 border border-red-800"
      }
    `}
          >
            <div
              className={`w-2 h-2 rounded-full mr-2 
        ${marketStatus.includes("Open") ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            {marketStatus}
          </div>
        </div>

        <hr className="border-zinc-700 my-6" />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-white mb-2">{Name}</h1>
          <p className="text-sm text-zinc-400 mb-6">
            Real-time stock data, performance chart, and key metrics.
          </p>
          <div className="mt-3 mb-6 p-4 bg-zinc-800/50 rounded-md border border-zinc-700 text-zinc-300 text-sm">
            <strong>About Invesco QQQ ETF :</strong>
            Tracks the Nasdaq-100 Index — the 100 largest non-financial
            companies listed on NASDAQ, mainly from technology, consumer
            services, and healthcare sectors.
            <button
              onClick={() => setShowMore(!showMore)}
              className="ml-2 text-amber-400 underline text-xs"
            >
              {showMore ? "Show less" : "Learn more"}
            </button>
            {showMore && (
              <p className="mt-2 text-xs text-zinc-400">
                This ETF provides exposure to leading companies such as Apple,
                Microsoft, Amazon, and others. It is popular for its
                tech-focused growth potential and liquidity.
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

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-zinc-600 rounded-full border-t-zinc-200"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/30 border border-red-800 rounded-md p-4 text-red-400">
              {error}
            </div>
          ) : data ? (
            <StockData
              data={data}
              name={Name}
              lastUpdateTime={lastUpdateTime}
            />
          ) : (
            <div className="bg-zinc-800 rounded-md p-4 text-zinc-400">
              No price data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
