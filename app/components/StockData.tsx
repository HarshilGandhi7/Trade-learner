"use client";

interface StockDataProps {
  data: {
    currentPrice: number;
    change: number;
    percentChange: number;
    previousClose: number;
    high: number;
    low: number;
  };
  name: string;
  lastUpdateTime: number;
}

export default function StockData({ data, name, lastUpdateTime }: StockDataProps) {
  return (
    <div className="mt-6 bg-zinc-800/50 rounded-lg p-6 border border-zinc-700/50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{name}</h2>
        {lastUpdateTime > 0 && (
          <p className="text-xs text-zinc-400">
            Updated: {new Date(lastUpdateTime).toLocaleTimeString()}
          </p>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-white">
            ${data.currentPrice.toFixed(2)}
          </span>
          <div
            className={`flex items-center ${
              data.change >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            <span className="text-2xl">
              {data.change >= 0 ? "+" : ""}
              {data.change.toFixed(2)}
            </span>
            <span className="ml-2 text-lg">
              ({data.change >= 0 ? "+" : ""}
              {data.percentChange.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-zinc-800 p-3 rounded-md">
          <div className="text-zinc-400 text-sm">Previous Close</div>
          <div className="text-white font-medium">
            ${data.previousClose.toFixed(2)}
          </div>
        </div>

        <div className="bg-zinc-800 p-3 rounded-md">
          <div className="text-zinc-400 text-sm">Today's High</div>
          <div className="text-white font-medium">
            ${data.high.toFixed(2)}
          </div>
        </div>

        <div className="bg-zinc-800 p-3 rounded-md">
          <div className="text-zinc-400 text-sm">Today's Low</div>
          <div className="text-white font-medium">
            ${data.low.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mt-6 h-1 w-full bg-zinc-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            data.change >= 0 ? "bg-green-500" : "bg-red-500"
          }`}
          style={{
            width: `${Math.min(Math.abs(data.percentChange * 5), 100)}%`,
            minWidth: "5%",
          }}
        ></div>
      </div>
    </div>
  );
}