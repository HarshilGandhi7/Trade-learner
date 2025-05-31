"use client";
import { useEffect, useRef, memo } from "react";

interface CryptoDataProps {
  symbol: string;
  name: string;
  onDataUpdate?: (data: any) => void;
}

function CryptoData({ symbol, name, onDataUpdate }: CryptoDataProps) {
  const dataRef = useRef({
    currentPrice: 0,
    change24h: 0,
    percentChange24h: 0,
    high24h: 0,
    low24h: 0,
    volume24h: 0,
  });

  const lastUpdateTimeRef = useRef("");
  const priceRef = useRef<HTMLSpanElement>(null);
  const changeRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const highRef = useRef<HTMLDivElement>(null);
  const lowRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lastUpdateRef = useRef<HTMLParagraphElement>(null);
  const changeContainerRef = useRef<HTMLDivElement>(null);
  const marketCapRef = useRef<HTMLDivElement>(null);

  const updateDOM = () => {
    const data = dataRef.current;

    if (priceRef.current) {
      priceRef.current.textContent = `$${data.currentPrice.toLocaleString()}`;
    }

    if (changeRef.current) {
      changeRef.current.textContent = `${
        data.change24h >= 0 ? "+" : ""
      }${data.change24h.toFixed(2)}`;
    }

    if (percentRef.current) {
      percentRef.current.textContent = `(${
        data.change24h >= 0 ? "+" : ""
      }${data.percentChange24h.toFixed(2)}%)`;
    }

    if (highRef.current) {
      highRef.current.textContent = `$${data.high24h.toLocaleString()}`;
    }

    if (lowRef.current) {
      lowRef.current.textContent = `$${data.low24h.toLocaleString()}`;
    }

    if (volumeRef.current) {
      volumeRef.current.textContent = `${data.volume24h.toLocaleString()} BTC`;
    }

    if (changeContainerRef.current) {
      if (data.change24h >= 0) {
        changeContainerRef.current.classList.remove("text-red-500");
        changeContainerRef.current.classList.add("text-green-500");
      } else {
        changeContainerRef.current.classList.remove("text-green-500");
        changeContainerRef.current.classList.add("text-red-500");
      }
    }

    if (barRef.current) {
      barRef.current.style.width = `${Math.min(
        Math.abs(data.percentChange24h * 5),
        100
      )}%`;

      if (data.change24h >= 0) {
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
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/crypto/data/${symbol}`
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const cryptoData = await response.json();

        dataRef.current = {
          currentPrice: parseFloat(cryptoData.currentPrice),
          change24h: parseFloat(cryptoData.change24h),
          percentChange24h: parseFloat(cryptoData.percentChange24h),
          high24h: parseFloat(cryptoData.high24h),
          low24h: parseFloat(cryptoData.low24h),
          volume24h: parseFloat(cryptoData.volume24h),
        };

        lastUpdateTimeRef.current = new Date().toLocaleTimeString();
        updateDOM();

        if (onDataUpdate) {
          onDataUpdate(cryptoData);
        }
      } catch (error) {
        console.error("Failed to fetch crypto data:", error);
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
            ${dataRef.current.currentPrice.toLocaleString()}
          </span>
          <div
            ref={changeContainerRef}
            className={`flex items-center ${
              dataRef.current.change24h >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            <span ref={changeRef} className="text-2xl">
              {dataRef.current.change24h >= 0 ? "+" : ""}
              {dataRef.current.change24h.toFixed(2)}
            </span>
            <span ref={percentRef} className="ml-2 text-lg">
              ({dataRef.current.change24h >= 0 ? "+" : ""}
              {dataRef.current.percentChange24h.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-zinc-800 p-3 rounded-md">
          <div className="text-zinc-400 text-sm">24h High</div>
          <div ref={highRef} className="text-white font-medium">
            ${dataRef.current.high24h.toLocaleString()}
          </div>
        </div>

        <div className="bg-zinc-800 p-3 rounded-md">
          <div className="text-zinc-400 text-sm">24h Low</div>
          <div ref={lowRef} className="text-white font-medium">
            ${dataRef.current.low24h.toLocaleString()}
          </div>
        </div>

        <div className="bg-zinc-800 p-3 rounded-md">
          <div className="text-zinc-400 text-sm">24h Volume</div>
          <div ref={volumeRef} className="text-white font-medium">
            {dataRef.current.volume24h.toLocaleString()} BTC
          </div>
        </div>
      </div>

      <div className="mt-6 h-1 w-full bg-zinc-700 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={`h-full ${
            dataRef.current.change24h >= 0 ? "bg-green-500" : "bg-red-500"
          }`}
          style={{
            width: `${Math.min(
              Math.abs(dataRef.current.percentChange24h * 5),
              100
            )}%`,
            minWidth: "5%",
          }}
        ></div>
      </div>
    </div>
  );
}

export default memo(CryptoData, () => true);
