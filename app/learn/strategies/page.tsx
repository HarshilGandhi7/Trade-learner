"use client";

import { useState } from "react";
import Link from "next/link";

export default function TradingStrategies() {
  const [activeTab, setActiveTab] = useState("time-based");

  // Reusable components
  const Icon = ({ className, children }: { className: string; children: React.ReactNode }) => (
    <div className={`flex-shrink-0 h-10 w-10 rounded-md ${className} flex items-center justify-center mr-4`}>{children}</div>
  );
  
  const MetricBox = ({ title, value }: { title: string; value: string }) => (
    <div className="bg-zinc-900/50 px-4 py-3 rounded-md">
      <dt className="text-sm font-medium text-zinc-500">{title}</dt>
      <dd className="mt-1 text-sm text-zinc-300">{value}</dd>
    </div>
  );
  
  const ProsConsItem = ({ type, text }: { type: 'green' | 'red'; text: string }) => (
    <li className="flex items-start">
      <svg className={`h-4 w-4 text-${type}-500 mt-0.5 mr-2`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d={type === 'green' ? "M4.5 12.75l6 6 9-13.5" : "M6 18L18 6M6 6l12 12"} />
      </svg>
      {text}
    </li>
  );

  const TabButton = ({ id, label }: { id: string; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
        activeTab === id
          ? "border-amber-500 text-amber-500"
          : "border-transparent text-zinc-400 hover:text-zinc-300 hover:border-zinc-500"
      }`}
    >
      {label}
    </button>
  );

  const StrategyBlock = ({ icon, color, title, description, timeframe, bestFor, pros, cons, example }: {
    icon: React.ReactNode;
    color: string;
    title: string;
    description: string;
    timeframe: string;
    bestFor: string;
    pros: string[];
    cons: string[];
    example: React.ReactNode;
  }) => (
    <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-amber-500/50 transition-colors duration-300">
      <div className="flex items-start">
        <Icon className={`bg-${color}-500/20`}>{icon}</Icon>
        <div>
          <h4 className="text-lg font-medium text-white">{title}</h4>
          <p className="mt-1 text-zinc-300">{description}</p>
          
          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <MetricBox title="Timeframe" value={timeframe} />
            <MetricBox title="Best For" value={bestFor} />
          </dl>
          
          <div className="mt-6">
            <h5 className="font-medium text-white mb-2">Advantages</h5>
            <ul className="space-y-1 text-sm text-zinc-300">{pros.map((pro, i) => <ProsConsItem key={i} type="green" text={pro} />)}</ul>
          </div>

          <div className="mt-4">
            <h5 className="font-medium text-white mb-2">Disadvantages</h5>
            <ul className="space-y-1 text-sm text-zinc-300">{cons.map((con, i) => <ProsConsItem key={i} type="red" text={con} />)}</ul>
          </div>
          
          <div className="mt-6 p-4 bg-zinc-900/50 rounded-md">
            <h5 className="text-sm font-medium text-white mb-2">Example Strategy</h5>
            <p className="text-sm text-zinc-400">{example}</p>
          </div>
        </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>
            <h1 className="text-2xl font-bold text-white tracking-tight">Trading Strategies</h1>
          </div>
          <p className="mt-1 text-zinc-400 text-sm">Learn different approaches to trade financial markets effectively</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-amber-500/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">What Are Trading Strategies?</h2>
              <p className="mt-2 text-zinc-300">
                Trading strategies are systematic approaches to buying and selling assets in financial markets. The right strategy can help you make consistent profits while managing risks effectively.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-zinc-700 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <TabButton id="time-based" label="Time-Based Strategies" />
            <TabButton id="technical" label="Technical Analysis" />
            <TabButton id="fundamental" label="Fundamental Analysis" />
            <TabButton id="risk" label="Risk Management" />
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "time-based" && (
          <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-amber-500 mr-2">⏱️</span> Time-Based Trading Strategies
            </h3>

            <StrategyBlock
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
              color="blue"
              title="Day Trading"
              description="Day trading involves entering and exiting positions within the same trading day, with no positions held overnight."
              timeframe="Minutes to hours"
              bestFor="Full-time traders with focus and discipline"
              pros={["No overnight risk exposure", "Multiple profit opportunities daily", "Quick feedback on trading decisions"]}
              cons={["Time-intensive and stressful", "Higher transaction costs from frequent trading", "Risk of overtrading"]}
              example={<span><span className="text-amber-500 font-medium">Scalping:</span> Taking advantage of small price moves by making dozens or hundreds of trades in a single day, aiming for small profits on each trade that add up over time.</span>}
            />

            <StrategyBlock
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>}
              color="purple"
              title="Swing Trading"
              description="Swing trading aims to capture short- to medium-term gains in a stock or financial instrument over a period of days to weeks."
              timeframe="Days to weeks"
              bestFor="Part-time traders with other commitments"
              pros={["Less time-intensive than day trading", "Captures larger price moves than day trading", "Lower transaction costs compared to day trading"]}
              cons={["Overnight and weekend market risk", "May miss intraday opportunities", "Requires patience and discipline"]}
              example={<span><span className="text-amber-500 font-medium">Breakout Trading:</span> Identifying stocks that are breaking out of established patterns or price ranges, then entering a position in the direction of the breakout, planning to hold for several days to capture the momentum.</span>}
            />

            <StrategyBlock
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>}
              color="green"
              title="Position Trading"
              description="Position trading is a long-term strategy where positions are held for months to years, focusing on long-term trends and fundamental factors."
              timeframe="Months to years"
              bestFor="Busy individuals with a long-term outlook"
              pros={["Minimal time commitment for monitoring", "Lowest transaction costs", "Potential to capture major market moves"]}
              cons={["Capital tied up for extended periods", "Exposed to long-term market downturns", "Requires strong conviction to withstand volatility"]}
              example={<span><span className="text-amber-500 font-medium">Trend Following:</span> Identifying assets in strong long-term uptrends and holding positions for months or even years to capture major market moves, using weekly or monthly charts for analysis.</span>}
            />

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h4 className="text-lg font-medium text-white mb-4">Choosing the Right Time-Based Strategy</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-700">
                  <thead className="bg-zinc-900">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Factor</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Day Trading</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Swing Trading</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Position Trading</th>
                    </tr>
                  </thead>
                  <tbody className="bg-zinc-800 divide-y divide-zinc-700">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-white">Time Required</td>
                      <td className="px-4 py-3 text-sm text-zinc-300">6+ hours daily</td>
                      <td className="px-4 py-3 text-sm text-zinc-300">1-2 hours daily</td>
                      <td className="px-4 py-3 text-sm text-zinc-300">A few hours weekly</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-white">Capital Requirements</td>
                      <td className="px-4 py-3 text-sm text-zinc-300">Higher</td>
                      <td className="px-4 py-3 text-sm text-zinc-300">Moderate</td>
                      <td className="px-4 py-3 text-sm text-zinc-300">Moderate to low</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-white">Stress Level</td>
                      <td className="px-4 py-3 text-sm text-zinc-300">Very high</td>
                      <td className="px-4 py-3 text-sm text-zinc-300">Moderate</td>
                      <td className="px-4 py-3 text-sm text-zinc-300">Lower</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-white">Profit Potential</td>
                      <td className="px-4 py-3 text-sm text-zinc-300">High but inconsistent</td>
                      <td className="px-4 py-3 text-sm text-zinc-300">Moderate and more consistent</td>
                      <td className="px-4 py-3 text-sm text-zinc-300">Potentially highest over time</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "technical" && (
          <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-amber-500 mr-2">📊</span> Technical Analysis Strategies
            </h3>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-teal-500/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-teal-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Trend Following</h4>
                  <p className="mt-1 text-zinc-300">
                    Trend following is based on the premise that markets tend to move in sustained trends over time. This strategy aims to identify and follow established trends.
                  </p>
                  
                  <div className="mt-6">
                    <h5 className="font-medium text-white mb-2">Key Indicators</h5>
                    <ul className="space-y-3 text-sm text-zinc-300">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 mr-2">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <span><strong className="text-zinc-200">Moving Averages:</strong> Used to identify the direction and strength of trends</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 mr-2">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <span><strong className="text-zinc-200">MACD:</strong> Helps detect changes in the strength, direction, and momentum of a trend</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 mr-2">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <span><strong className="text-zinc-200">ADX:</strong> Measures trend strength</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-zinc-900/50 p-4 rounded-md">
                      <h5 className="text-sm font-medium text-white mb-2">Bullish Strategy</h5>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-zinc-300 ml-1">
                        <li>Wait for price to close above 50-day moving average</li>
                        <li>Confirm with MACD crossing above signal line</li>
                        <li>Enter long position with stop loss below swing low</li>
                        <li>Trail stop or exit when price closes below 50-day MA</li>
                      </ol>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-md">
                      <h5 className="text-sm font-medium text-white mb-2">Bearish Strategy</h5>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-zinc-300 ml-1">
                        <li>Wait for price to close below 50-day moving average</li>
                        <li>Confirm with MACD crossing below signal line</li>
                        <li>Enter short position with stop loss above swing high</li>
                        <li>Trail stop or exit when price closes above 50-day MA</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-500/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Support and Resistance Trading</h4>
                  <p className="mt-1 text-zinc-300">
                    This strategy is based on identifying price levels where markets have historically shown a tendency to reverse. Support is where prices tend to stop falling, and resistance is where prices tend to stop rising.
                  </p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-zinc-900/50 p-4 rounded-md">
                      <h5 className="text-sm font-medium text-white mb-2">Support Bounce Strategy</h5>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-zinc-300 ml-1">
                        <li>Identify strong support with multiple touches</li>
                        <li>Wait for price to approach the support</li>
                        <li>Look for confirmation (bullish pattern, divergence)</li>
                        <li>Enter long position slightly above support</li>
                        <li>Place stop loss just below support level</li>
                      </ol>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-md">
                      <h5 className="text-sm font-medium text-white mb-2">Resistance Rejection Strategy</h5>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-zinc-300 ml-1">
                        <li>Identify strong resistance with multiple touches</li>
                        <li>Wait for price to approach the resistance</li>
                        <li>Look for confirmation (bearish pattern, divergence)</li>
                        <li>Enter short position slightly below resistance</li>
                        <li>Place stop loss just above resistance level</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-pink-500/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Chart Pattern Trading</h4>
                  <p className="mt-1 text-zinc-300">
                    Chart patterns are specific formations on price charts that can signal potential trend continuations or reversals. They represent the psychology of market participants.
                  </p>
                  
                  <div className="mt-6">
                    <h5 className="font-medium text-white mb-2">Common Chart Patterns</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-zinc-900/50 p-4 rounded-md">
                        <h6 className="text-sm font-medium text-amber-500">Reversal Patterns</h6>
                        <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                          <li>• Head and Shoulders</li>
                          <li>• Double Top/Bottom</li>
                          <li>• Triple Top/Bottom</li>
                          <li>• Rounding Bottom</li>
                        </ul>
                      </div>
                      <div className="bg-zinc-900/50 p-4 rounded-md">
                        <h6 className="text-sm font-medium text-amber-500">Continuation Patterns</h6>
                        <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                          <li>• Flags and Pennants</li>
                          <li>• Triangles</li>
                          <li>• Rectangles</li>
                          <li>• Cup and Handle</li>
                        </ul>
                      </div>
                      <div className="bg-zinc-900/50 p-4 rounded-md">
                        <h6 className="text-sm font-medium text-amber-500">Candlestick Patterns</h6>
                        <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                          <li>• Doji</li>
                          <li>• Engulfing</li>
                          <li>• Hammer/Shooting Star</li>
                          <li>• Morning/Evening Star</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "fundamental" && (
          <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-amber-500 mr-2">📈</span> Fundamental Analysis Strategies
            </h3>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-500/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Value Investing</h4>
                  <p className="mt-1 text-zinc-300">
                    Value investing involves buying stocks that appear underpriced according to fundamental analysis. This approach focuses on finding companies trading below their intrinsic value.
                  </p>
                  
                  <div className="mt-6">
                    <h5 className="font-medium text-white mb-2">Key Metrics</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-zinc-900/50 p-4 rounded-md">
                        <h6 className="text-sm font-medium text-amber-500">Price Valuation Ratios</h6>
                        <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                          <li className="flex justify-between">
                            <span>Price-to-Earnings (P/E)</span>
                            <span className="text-zinc-400">Share price ÷ EPS</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Price-to-Book (P/B)</span>
                            <span className="text-zinc-400">Share price ÷ Book value per share</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Price-to-Sales (P/S)</span>
                            <span className="text-zinc-400">Market cap ÷ Annual revenue</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-zinc-900/50 p-4 rounded-md">
                        <h6 className="text-sm font-medium text-amber-500">Profitability Metrics</h6>
                        <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                          <li className="flex justify-between">
                            <span>Return on Equity (ROE)</span>
                            <span className="text-zinc-400">Net income ÷ Shareholders' equity</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Profit Margin</span>
                            <span className="text-zinc-400">Net income ÷ Revenue</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Dividend Yield</span>
                            <span className="text-zinc-400">Annual dividend ÷ Share price</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h5 className="font-medium text-white mb-2">Value Investing Strategy</h5>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-300 ml-1">
                      <li>Screen for stocks with low P/E, P/B, or P/S ratios relative to industry averages</li>
                      <li>Check for strong fundamentals (healthy balance sheet, consistent earnings)</li>
                      <li>Calculate the intrinsic value using DCF or other valuation models</li>
                      <li>Buy when market price is significantly below estimated intrinsic value</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-green-500/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Growth Investing</h4>
                  <p className="mt-1 text-zinc-300">
                    Growth investing focuses on companies that are expected to grow their earnings at an above-average rate compared to other companies in the market.
                  </p>
                  
                  <div className="mt-6">
                    <h5 className="font-medium text-white mb-2">Key Metrics</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-zinc-900/50 p-4 rounded-md">
                        <h6 className="text-sm font-medium text-amber-500">Growth Indicators</h6>
                        <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                          <li className="flex justify-between">
                            <span>Revenue Growth Rate</span>
                            <span className="text-zinc-400">Year-over-year increase</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Earnings Per Share Growth</span>
                            <span className="text-zinc-400">Annual EPS growth rate</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Return on Equity (ROE)</span>
                            <span className="text-zinc-400">Net income ÷ Shareholders' equity</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-zinc-900/50 p-4 rounded-md">
                        <h6 className="text-sm font-medium text-amber-500">Other Considerations</h6>
                        <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                          <li className="flex justify-between">
                            <span>PEG Ratio</span>
                            <span className="text-zinc-400">P/E ratio ÷ EPS growth rate</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Market Share Expansion</span>
                            <span className="text-zinc-400">Gaining share in industry</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Strong Product Pipeline</span>
                            <span className="text-zinc-400">Upcoming launches or innovations</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h5 className="font-medium text-white mb-2">Growth Investing Strategy</h5>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-300 ml-1">
                      <li>Identify companies with strong historical and projected revenue/earnings growth</li>
                      <li>Evaluate industry trends and competitive advantages</li>
                      <li>Assess valuation using PEG ratio and future growth prospects</li>
                      <li>Invest in companies with scalable business models and strong leadership</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "risk" && (
          <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-amber-500 mr-2">🛡️</span> Risk Management Strategies
            </h3>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-red-500/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Position Sizing</h4>
                  <p className="mt-1 text-zinc-300">
                    Position sizing determines how much of your capital to risk on any single trade. Proper position sizing is critical for long-term trading success.
                  </p>
                  
                  <div className="mt-6">
                    <h5 className="font-medium text-white mb-2">Position Sizing Methods</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-zinc-900/50 p-4 rounded-md">
                        <h6 className="text-sm font-medium text-amber-500">Fixed Percentage Risk</h6>
                        <p className="mt-2 text-sm text-zinc-300">
                          Risk a fixed percentage of your account on each trade (typically 1-2%).
                        </p>
                        <div className="mt-3 bg-zinc-800 p-3 rounded-md">
                          <p className="text-xs text-zinc-400">Example: With $10,000 account and 2% risk per trade</p>
                          <p className="text-sm text-zinc-300">Maximum risk = $200 per trade</p>
                        </div>
                      </div>
                      <div className="bg-zinc-900/50 p-4 rounded-md">
                        <h6 className="text-sm font-medium text-amber-500">Volatility-Based Sizing</h6>
                        <p className="mt-2 text-sm text-zinc-300">
                          Adjust position size based on the asset's volatility (ATR).
                        </p>
                        <div className="mt-3 bg-zinc-800 p-3 rounded-md">
                          <p className="text-xs text-zinc-400">Higher volatility = Smaller position</p>
                          <p className="text-xs text-zinc-400">Lower volatility = Larger position</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-amber-500/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Stop Loss Strategies</h4>
                  <p className="mt-1 text-zinc-300">
                    Stop losses limit potential losses by automatically closing positions when specific price levels are reached.
                  </p>
                  
                  <div className="mt-6">
                    <h5 className="font-medium text-white mb-2">Types of Stop Losses</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-zinc-900/50 p-4 rounded-md">
                        <h6 className="text-sm font-medium text-amber-500">Fixed Stop Loss</h6>
                        <p className="mt-2 text-sm text-zinc-300">
                          Set at a specific price level and doesn't move.
                        </p>
                        <p className="mt-2 text-xs text-zinc-400">
                          Example: Buy at $100, set stop at $95
                        </p>
                      </div>
                      <div className="bg-zinc-900/50 p-4 rounded-md">
                        <h6 className="text-sm font-medium text-amber-500">Trailing Stop Loss</h6>
                        <p className="mt-2 text-sm text-zinc-300">
                          Moves with the price to lock in profits as they accumulate.
                        </p>
                        <p className="mt-2 text-xs text-zinc-400">
                          Example: 10% below the highest price since entry
                        </p>
                      </div>
                      <div className="bg-zinc-900/50 p-4 rounded-md">
                        <h6 className="text-sm font-medium text-amber-500">Volatility Stop Loss</h6>
                        <p className="mt-2 text-sm text-zinc-300">
                          Based on the asset's volatility (ATR).
                        </p>
                        <p className="mt-2 text-xs text-zinc-400">
                          Example: 2x ATR below entry price
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h4 className="text-lg font-medium text-white mb-4">Risk-to-Reward Ratio</h4>
              <p className="text-zinc-300 mb-4">
                The risk-to-reward ratio compares your potential loss to your potential gain on a trade. A favorable ratio is essential for long-term profitability.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900/50 p-4 rounded-md">
                  <h5 className="text-sm font-medium text-white mb-2">Calculating Risk-to-Reward</h5>
                  <div className="text-sm text-zinc-300">
                    <p className="mb-2">Risk-to-Reward = Potential Loss ÷ Potential Profit</p>
                    <div className="mt-3 space-y-2">
                      <p><span className="text-amber-500">Example:</span> Buy at $100, stop at $95, target at $110</p>
                      <p>Risk = $5 per share</p>
                      <p>Reward = $10 per share</p>
                      <p>Risk-to-reward ratio = 1:2</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-zinc-900/50 p-4 rounded-md">
                  <h5 className="text-sm font-medium text-white mb-2">Recommended Ratios</h5>
                  <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                    <li className="flex justify-between">
                      <span>Day Trading</span>
                      <span className="text-zinc-400">Minimum 1:1.5</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Swing Trading</span>
                      <span className="text-zinc-400">Minimum 1:2</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Position Trading</span>
                      <span className="text-zinc-400">Minimum 1:3</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}