"use client";

import { useState, ReactElement } from "react";
import Link from "next/link";

// Type definitions
type TabId = "chart-patterns" | "indicators" | "candlesticks" | "timeframes";
type ListItemProps = { text: string };
type TabButtonProps = { id: TabId; label: string; active: boolean; onClick: (id: TabId) => void };
type SectionCardProps = { title: string; description: string; children: React.ReactNode };
type PatternCardProps = {
  name: string;
  type: string;
  description: string;
  signals: string;
  reliability: string;
};
type IndicatorCardProps = {
  name: string;
  category: string;
  description: string;
  signals: string;
};

export default function TechnicalAnalysis(): ReactElement {
  const [activeTab, setActiveTab] = useState<TabId>("chart-patterns");

  // Reusable components
  const ListItem = ({ text }: ListItemProps): ReactElement => (
    <li className="flex items-start">
      <svg className="h-5 w-5 text-amber-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      {text}
    </li>
  );

  const TabButton = ({ id, label, active, onClick }: TabButtonProps): ReactElement => (
    <button
      onClick={() => onClick(id)}
      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
        active
          ? "border-amber-500 text-amber-500"
          : "border-transparent text-zinc-400 hover:text-zinc-300 hover:border-zinc-500"
      }`}
    >
      {label}
    </button>
  );

  const SectionCard = ({ title, description, children }: SectionCardProps): ReactElement => (
    <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 mb-8">
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-zinc-300">{description}</p>
      <div className="mt-4">{children}</div>
    </div>
  );

  const PatternCard = ({ name, type, description, signals, reliability }: PatternCardProps): ReactElement => (
    <div className="bg-zinc-800 rounded-lg p-5 border border-zinc-700">
      <div className="flex items-start mb-3">
        <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        </div>
        <div>
          <h4 className="text-md font-medium text-white">{name}</h4>
          <p className="text-xs text-amber-500">{type}</p>
        </div>
      </div>
      <p className="text-sm text-zinc-300 mb-3">{description}</p>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="bg-zinc-900/50 p-3 rounded-md">
          <p className="text-xs font-medium text-zinc-500">Signals</p>
          <p className="text-xs text-zinc-300">{signals}</p>
        </div>
        <div className="bg-zinc-900/50 p-3 rounded-md">
          <p className="text-xs font-medium text-zinc-500">Reliability</p>
          <p className="text-xs text-zinc-300">{reliability}</p>
        </div>
      </div>
    </div>
  );

  const IndicatorCard = ({ name, category, description, signals }: IndicatorCardProps): ReactElement => (
    <div className="bg-zinc-800 rounded-lg p-5 border border-zinc-700">
      <h4 className="text-md font-medium text-white">{name}</h4>
      <p className="text-xs text-amber-500 mb-2">{category}</p>
      <p className="text-sm text-zinc-300 mb-3">{description}</p>
      <div className="bg-zinc-900/50 p-3 rounded-md">
        <p className="text-xs font-medium text-zinc-500">Trading Signals</p>
        <p className="text-xs text-zinc-300">{signals}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-zinc-900 min-h-screen">
      {/* Header */}
      <div className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
            <h1 className="text-2xl font-bold text-white tracking-tight">Technical Analysis</h1>
          </div>
          <p className="mt-1 text-zinc-400 text-sm">Learn to analyze charts and identify trading opportunities</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <SectionCard
          title="What is Technical Analysis?"
          description="Technical analysis is a trading methodology that analyzes statistical trends gathered from trading activity, such as price movement and volume. Unlike fundamental analysis, which looks at a company's business performance, technical analysis focuses on patterns of price movements, trading signals, and various analytical charting tools."
        >
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <ListItem text="Analyzes price movements and chart patterns to predict future price action" />
            <ListItem text="Based on the premise that market prices reflect all available information" />
            <ListItem text="Assumes price patterns and market trends tend to repeat over time" />
            <ListItem text="Used for timing entry and exit points in the market" />
          </ul>
        </SectionCard>

        {/* Tabs Navigation */}
        <div className="border-b border-zinc-700 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <TabButton id="chart-patterns" label="Chart Patterns" active={activeTab === "chart-patterns"} onClick={setActiveTab} />
            <TabButton id="indicators" label="Technical Indicators" active={activeTab === "indicators"} onClick={setActiveTab} />
            <TabButton id="candlesticks" label="Candlestick Patterns" active={activeTab === "candlesticks"} onClick={setActiveTab} />
            <TabButton id="timeframes" label="Trading Timeframes" active={activeTab === "timeframes"} onClick={setActiveTab} />
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "chart-patterns" && (
          <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-amber-500 mr-2">📊</span> Chart Patterns
            </h3>
            
            <SectionCard
              title="Reversal Patterns"
              description="Reversal patterns indicate that a prior trend is likely to change direction. They form after extended trends and signal potential turning points in the market."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <PatternCard
                  name="Head and Shoulders"
                  type="Reversal Pattern"
                  description="A formation with three peaks where the middle peak (head) is higher than the other two peaks (shoulders)."
                  signals="Signals a reversal from bullish to bearish when price breaks below the neckline"
                  reliability="High when volume confirms the breakdown"
                />
                <PatternCard
                  name="Double Top/Bottom"
                  type="Reversal Pattern"
                  description="Two peaks/troughs at approximately the same price level with a moderate decline/rally between them."
                  signals="Double top signals bearish reversal; double bottom signals bullish reversal"
                  reliability="Medium to high depending on timeframe"
                />
              </div>
            </SectionCard>
            
            <SectionCard
              title="Continuation Patterns"
              description="Continuation patterns suggest that the current trend will continue after a period of consolidation. They represent temporary pauses in the prevailing trend."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <PatternCard
                  name="Flags & Pennants"
                  type="Continuation Pattern"
                  description="Short-term consolidation patterns that form after a sharp price movement, resembling a flag on a pole."
                  signals="Signals continuation of prior trend when price breaks out of the pattern"
                  reliability="High, especially in strong trends"
                />
                <PatternCard
                  name="Triangles"
                  type="Continuation Pattern"
                  description="Patterns formed by converging trendlines, classified as symmetrical, ascending, or descending."
                  signals="Breakout direction indicates next price movement"
                  reliability="Medium, higher if aligned with main trend"
                />
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === "indicators" && (
          <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-amber-500 mr-2">📈</span> Technical Indicators
            </h3>
            
            <SectionCard
              title="Trend Indicators"
              description="Trend indicators help identify the direction of the market trend and whether a trend exists. They often use price averaging methods to determine direction."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <IndicatorCard
                  name="Moving Averages"
                  category="Trend Indicator"
                  description="Calculates the average price over a specified period, smoothing price data to identify trends."
                  signals="Price above MA: bullish; Price below MA: bearish; MA crossovers signal trend changes"
                />
                <IndicatorCard
                  name="MACD (Moving Average Convergence Divergence)"
                  category="Trend & Momentum Indicator"
                  description="Shows relationship between two moving averages of a security's price."
                  signals="MACD crossing signal line, zero line crossovers, and divergence"
                />
              </div>
            </SectionCard>
            
            <SectionCard
              title="Oscillators"
              description="Oscillators are momentum indicators that help identify overbought or oversold conditions in the market. They typically fluctuate between a range or around a centerline."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <IndicatorCard
                  name="Relative Strength Index (RSI)"
                  category="Momentum Oscillator"
                  description="Measures the speed and change of price movements on a scale from 0 to 100."
                  signals="Above 70: overbought; Below 30: oversold; Divergence signals potential reversals"
                />
                <IndicatorCard
                  name="Stochastic Oscillator"
                  category="Momentum Oscillator"
                  description="Compares a closing price to its price range over a specific period."
                  signals="Above 80: overbought; Below 20: oversold; %K crossing %D signals entry/exit"
                />
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === "candlesticks" && (
          <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-amber-500 mr-2">🕯️</span> Candlestick Patterns
            </h3>
            
            <SectionCard
              title="Single Candlestick Patterns"
              description="Individual candlesticks that provide insights into market psychology and potential price movements based on their shape and size."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <h4 className="font-medium text-white">Doji</h4>
                  <p className="text-sm text-zinc-300 mt-2">Candlestick with a very small body, indicating indecision in the market. Often signals potential reversal when appearing after a strong trend.</p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <h4 className="font-medium text-white">Hammer/Shooting Star</h4>
                  <p className="text-sm text-zinc-300 mt-2">Hammer has a small body at the top and long lower wick, signaling potential bullish reversal. Shooting star is the inverted version, signaling bearish reversal.</p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <h4 className="font-medium text-white">Marubozu</h4>
                  <p className="text-sm text-zinc-300 mt-2">Candlestick with no wicks, showing strong conviction. Bullish (white) marubozu signals strong buying pressure, bearish (black) signals strong selling.</p>
                </div>
              </div>
            </SectionCard>
            
            <SectionCard
              title="Multi-Candlestick Patterns"
              description="Combinations of multiple candlesticks that form recognizable patterns, providing stronger signals than individual candlesticks."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <h4 className="font-medium text-white">Engulfing Pattern</h4>
                  <p className="text-sm text-zinc-300 mt-2">Two-candle pattern where the second candle completely engulfs the body of the first. Bullish engulfing is a potential buy signal, bearish engulfing a sell signal.</p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <h4 className="font-medium text-white">Morning/Evening Star</h4>
                  <p className="text-sm text-zinc-300 mt-2">Three-candle pattern showing a potential trend reversal. Morning star is bullish after a downtrend, evening star is bearish after an uptrend.</p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <h4 className="font-medium text-white">Harami</h4>
                  <p className="text-sm text-zinc-300 mt-2">Two-candle pattern where the second candle is contained within the body of the first, signaling a potential trend change or consolidation.</p>
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === "timeframes" && (
          <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-amber-500 mr-2">⏱️</span> Trading Timeframes
            </h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-700 border border-zinc-700 rounded-lg">
                <thead className="bg-zinc-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Timeframe</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Best For</th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-900 divide-y divide-zinc-800">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">1-minute to 5-minute</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">Very short-term price movements</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">Scalping, day trading</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">15-minute to 1-hour</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">Intraday trends and patterns</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">Day trading, short-term swing trading</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">4-hour to Daily</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">Medium-term market movements</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">Swing trading</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Weekly to Monthly</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">Long-term trends and major levels</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">Position trading, investing</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <SectionCard
              title="Multiple Timeframe Analysis"
              description="Using multiple timeframes provides a more comprehensive view of the market and helps confirm signals across different time horizons."
            >
              <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-300 ml-2 mt-3">
                <li>Start with higher timeframes to identify the overall trend direction</li>
                <li>Move to intermediate timeframes to find potential trading opportunities</li>
                <li>Use lower timeframes for precise entry and exit points</li>
                <li>Confirm signals across multiple timeframes for stronger trading decisions</li>
              </ol>
            </SectionCard>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-lg p-6 border border-amber-500/30 mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <h4 className="text-lg font-medium text-white">Ready to Apply These Technical Analysis Skills?</h4>
              <p className="text-sm text-zinc-300 mt-1">
                Start trading in our risk-free environment and put your knowledge to practice.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-amber-500 hover:bg-amber-400 focus:outline-none transition-colors duration-200"
            >
              Start Trading Now
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}