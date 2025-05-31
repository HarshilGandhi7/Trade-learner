"use client";
import { useEffect, useRef, memo } from "react";

interface StockDataProps {
  symbol: string;
  name: string;
  onDataUpdate?: (data: any) => void;
}

function StockDataComponent({ symbol, name, onDataUpdate }: StockDataProps) {
  const dataRef = useRef({
    currentPrice: 0,
    change: 0,
    percentChange: 0,
    previousClose: 0,
    high: 0,
    low: 0,
  });
  const lastUpdateTimeRef = useRef("");

  const priceRef = useRef<HTMLSpanElement>(null);
  const changeRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const previousCloseRef = useRef<HTMLDivElement>(null);
  const highRef = useRef<HTMLDivElement>(null);
  const lowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lastUpdateRef = useRef<HTMLParagraphElement>(null);
  const changeContainerRef = useRef<HTMLDivElement>(null);

  const updateDOM = () => {
    const data = dataRef.current;

    if (priceRef.current) {
      priceRef.current.textContent = `$${data.currentPrice.toFixed(2)}`;
    }

    if (changeRef.current) {
      changeRef.current.textContent = `${
        data.change >= 0 ? "+" : ""
      }${data.change.toFixed(2)}`;
    }

    if (percentRef.current) {
      percentRef.current.textContent = `(${
        data.change >= 0 ? "+" : ""
      }${data.percentChange.toFixed(2)}%)`;
    }

    if (previousCloseRef.current) {
      previousCloseRef.current.textContent = `$${data.previousClose.toFixed(
        2
      )}`;
    }

    if (highRef.current) {
      highRef.current.textContent = `$${data.high.toFixed(2)}`;
    }

    if (lowRef.current) {
      lowRef.current.textContent = `$${data.low.toFixed(2)}`;
    }

    if (changeContainerRef.current) {
      if (data.change >= 0) {
        changeContainerRef.current.classList.remove("text-red-500");
        changeContainerRef.current.classList.add("text-green-500");
      } else {
        changeContainerRef.current.classList.remove("text-green-500");
        changeContainerRef.current.classList.add("text-red-500");
      }
    }

    if (barRef.current) {
      barRef.current.style.width = `${Math.min(
        Math.abs(data.percentChange * 5),
        100
      )}%`;

      if (data.change >= 0) {
        barRef.current.classList.remove("bg-red-500");
        barRef.current.classList.add("bg-green-500");
      } else {
        barRef.current.classList.remove("bg-green-500");
        barRef.current.classList.add("bg-red-500");
      }
    }

    if (lastUpdateRef.current) {
      lastUpdateRef.current.textContent = `Updated: ${lastUpdateTimeRef.current}`;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/market/data/${symbol}`
        );

        if (!response.ok) {
          console.error(`Server error: ${response.status}`);
          return;
        }

        const marketData = await response.json();

        if (marketData) {
          dataRef.current = {
            currentPrice: parseFloat(marketData.currentPrice),
            change: parseFloat(marketData.change),
            percentChange: parseFloat(marketData.percentChange),
            previousClose: parseFloat(marketData.previousClose),
            high: parseFloat(marketData.dayHigh), 
            low: parseFloat(marketData.dayLow), 
          };

          lastUpdateTimeRef.current = new Date(
            marketData.lastUpdate
          ).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          updateDOM();

          if (onDataUpdate) {
            onDataUpdate({
              ...dataRef.current,
              symbol: marketData.symbol,
              lastUpdate: marketData.lastUpdate,
              marketStatus: marketData.marketStatus,
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [symbol]); 

  return (
    <div className="mt-6 bg-zinc-800/50 rounded-lg p-6 border border-zinc-700/50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{name}</h2>
        <p ref={lastUpdateRef} className="text-xs text-zinc-400">
          Updated: {lastUpdateTimeRef.current}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-end gap-3">
          <span ref={priceRef} className="text-4xl font-bold text-white">
            ${dataRef.current.currentPrice.toFixed(2)}
          </span>
          <div
            ref={changeContainerRef}
            className={`flex items-center ${
              dataRef.current.change >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            <span ref={changeRef} className="text-2xl">
              {dataRef.current.change >= 0 ? "+" : ""}
              {dataRef.current.change.toFixed(2)}
            </span>
            <span ref={percentRef} className="ml-2 text-lg">
              ({dataRef.current.change >= 0 ? "+" : ""}
              {dataRef.current.percentChange.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-zinc-800 p-3 rounded-md">
          <div className="text-zinc-400 text-sm">Previous Close</div>
          <div ref={previousCloseRef} className="text-white font-medium">
            ${dataRef.current.previousClose.toFixed(2)}
          </div>
        </div>

        <div className="bg-zinc-800 p-3 rounded-md">
          <div className="text-zinc-400 text-sm">Today's High</div>
          <div ref={highRef} className="text-white font-medium">
            ${dataRef.current.high.toFixed(2)}
          </div>
        </div>

        <div className="bg-zinc-800 p-3 rounded-md">
          <div className="text-zinc-400 text-sm">Today's Low</div>
          <div ref={lowRef} className="text-white font-medium">
            ${dataRef.current.low.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mt-6 h-1 w-full bg-zinc-700 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={`h-full ${
            dataRef.current.change >= 0 ? "bg-green-500" : "bg-red-500"
          }`}
          style={{
            width: `${Math.min(
              Math.abs(dataRef.current.percentChange * 5),
              100
            )}%`,
            minWidth: "5%",
          }}
        ></div>
      </div>
    </div>
  );
}

export default memo(StockDataComponent, () => true);
