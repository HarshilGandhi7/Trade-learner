"use client";
import { CryptoChartProps } from "@/app/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";



export default function CryptoChart({
  chartData,
  timeframe,
  isChartLoading,
  chartError,
  change24h,
  onTimeframeChange,
}: CryptoChartProps) {
  const isChartPositive =
    chartData.length > 1
      ? chartData[chartData.length - 1].value >= chartData[0].value
      : Boolean(change24h && change24h >= 0);

  const chartColor = isChartPositive ? "#22c55e" : "#ef4444";
  const gradientId = isChartPositive ? "greenGradient" : "redGradient";

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Price Chart</h3>
        <div className="bg-zinc-800 rounded-full p-1 flex flex-wrap gap-1">
          {["1D", "1W", "1M", "1Y"].map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                timeframe === tf
                  ? "bg-zinc-700 text-white"
                  : "text-zinc-400 hover:bg-zinc-700/50"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-zinc-800/50 rounded-lg h-64 md:h-80 overflow-hidden border border-zinc-700/50">
        {isChartLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin h-8 w-8 border-4 border-zinc-600 rounded-full border-t-zinc-200"></div>
          </div>
        ) : chartError ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-red-400 text-center px-4">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>{chartError}</p>
              <button
                onClick={() => onTimeframeChange(timeframe)}
                className="mt-3 px-3 py-1 bg-zinc-700 text-white rounded-md text-sm hover:bg-zinc-600"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="time"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(unixTime) => {
                  const date = new Date(unixTime);
                  if (timeframe === "1D") {
                    return date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  } else if (timeframe === "1W") {
                    return date.toLocaleDateString([], {
                      weekday: "short",
                      month: "numeric",
                      day: "numeric",
                    });
                  } else if (timeframe === "1M") {
                    return date.toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                    });
                  } else {
                    return date.toLocaleDateString([], {
                      month: "short",
                      year: timeframe === "MAX" ? "2-digit" : "numeric",
                    });
                  }
                }}
                tick={{ fontSize: 10, fill: "#71717a" }}
                axisLine={{ stroke: "#3f3f46" }}
                tickLine={{ stroke: "#3f3f46" }}
              />

              <YAxis
                domain={["auto", "auto"]}
                tick={{ fontSize: 10, fill: "#71717a" }}
                axisLine={{ stroke: "#3f3f46" }}
                tickLine={{ stroke: "#3f3f46" }}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fillOpacity={1}
                fill={`url(#${gradientId})`}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 4, stroke: "#18181b", strokeWidth: 1 }}
              />

              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleString()}
                formatter={(value: any) => [
                  `$${Number(value).toFixed(2)}`,
                  "Price",
                ]}
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                }}
                itemStyle={{ color: "#e4e4e7" }}
              />

            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-500">No chart data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
