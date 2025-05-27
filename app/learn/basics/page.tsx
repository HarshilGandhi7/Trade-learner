"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function StockMarketBasics() {
  const [activeTab, setActiveTab] = useState("indices");

  return (
    <div className="bg-zinc-900 min-h-screen">
      {/* Header */}
      <div className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6 text-amber-500"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <h1 className="text-2xl font-bold text-white tracking-tight">Stock Market Basics</h1>
          </div>
          <p className="mt-1 text-zinc-400 text-sm">Learn the fundamentals of US indices and cryptocurrency markets</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-amber-500/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">What Are Stock Market Indices?</h2>
              <p className="mt-2 text-zinc-300">
                A stock market index tracks the performance of a group of selected stocks. It helps investors understand how the overall market or a specific sector is performing.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-zinc-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("indices")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "indices"
                  ? "border-amber-500 text-amber-500"
                  : "border-transparent text-zinc-400 hover:text-zinc-300 hover:border-zinc-500"
              }`}
            >
              US Market Indices
            </button>
            <button
              onClick={() => setActiveTab("crypto")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "crypto"
                  ? "border-amber-500 text-amber-500"
                  : "border-transparent text-zinc-400 hover:text-zinc-300 hover:border-zinc-500"
              }`}
            >
              Cryptocurrency
            </button>
            <button
              onClick={() => setActiveTab("concepts")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "concepts"
                  ? "border-amber-500 text-amber-500"
                  : "border-transparent text-zinc-400 hover:text-zinc-300 hover:border-zinc-500"
              }`}
            >
              Key Trading Concepts
            </button>
            <button
              onClick={() => setActiveTab("examples")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "examples"
                  ? "border-amber-500 text-amber-500"
                  : "border-transparent text-zinc-400 hover:text-zinc-300 hover:border-zinc-500"
              }`}
            >
              Example Trades
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "indices" && (
          <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-amber-500 mr-2">🇺🇸</span> Key US Market Indices
            </h3>

            {/* S&P 500 */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-amber-500/50 transition-colors duration-300">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-green-500/20 flex items-center justify-center mr-4">
                  <span className="text-green-500 font-bold">S&P</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">S&P 500</h4>
                  <p className="mt-1 text-zinc-300">
                    Tracks the top 500 largest US companies.
                  </p>
                  
                  <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-zinc-900/50 px-4 py-3 rounded-md">
                      <dt className="text-sm font-medium text-zinc-500">Example Companies</dt>
                      <dd className="mt-1 text-sm text-zinc-300">Apple, Microsoft, Amazon</dd>
                    </div>
                    <div className="bg-zinc-900/50 px-4 py-3 rounded-md">
                      <dt className="text-sm font-medium text-zinc-500">Trade Via</dt>
                      <dd className="mt-1 text-sm text-white font-semibold">SPY ETF</dd>
                    </div>
                    <div className="col-span-2 bg-zinc-900/50 px-4 py-3 rounded-md">
                      <dt className="text-sm font-medium text-zinc-500">Why It Matters</dt>
                      <dd className="mt-1 text-sm text-zinc-300">Reflects the overall health of the US economy</dd>
                    </div>
                  </dl>
                  
                  <div className="mt-6 p-4 bg-zinc-900/50 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-green-500">SPY (S&P 500 ETF) </p>
                      </div>
                      <div className="bg-zinc-800 p-2 rounded-md">
                        <svg className="w-16 h-10" viewBox="0 0 100 40">
                          <path 
                            d="M0,20 L10,18 L20,22 L30,10 L40,15 L50,12 L60,25 L70,20 L80,15 L90,7 L100,10" 
                            fill="none" 
                            stroke="#22c55e" 
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NASDAQ-100 */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-amber-500/50 transition-colors duration-300">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-500/20 flex items-center justify-center mr-4">
                  <span className="text-blue-500 font-bold">NDX</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">NASDAQ-100</h4>
                  <p className="mt-1 text-zinc-300">
                    Focuses on 100 leading tech and growth companies listed on NASDAQ.
                  </p>
                  
                  <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-zinc-900/50 px-4 py-3 rounded-md">
                      <dt className="text-sm font-medium text-zinc-500">Example Companies</dt>
                      <dd className="mt-1 text-sm text-zinc-300">Tesla, Nvidia, Meta, Google</dd>
                    </div>
                    <div className="bg-zinc-900/50 px-4 py-3 rounded-md">
                      <dt className="text-sm font-medium text-zinc-500">Trade Via</dt>
                      <dd className="mt-1 text-sm text-white font-semibold">QQQ ETF</dd>
                    </div>
                    <div className="col-span-2 bg-zinc-900/50 px-4 py-3 rounded-md">
                      <dt className="text-sm font-medium text-zinc-500">Why It Matters</dt>
                      <dd className="mt-1 text-sm text-zinc-300">Represents the tech-heavy segment of the market</dd>
                    </div>
                  </dl>
                  
                  <div className="mt-6 p-4 bg-zinc-900/50 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-green-500">QQQ (NASDAQ-100 ETF)</p>
                      </div>
                      <div className="bg-zinc-800 p-2 rounded-md">
                        <svg className="w-16 h-10" viewBox="0 0 100 40">
                          <path 
                            d="M0,20 L10,23 L20,25 L30,18 L40,12 L50,15 L60,8 L70,5 L80,7 L90,10 L100,5" 
                            fill="none" 
                            stroke="#22c55e" 
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dow Jones */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-amber-500/50 transition-colors duration-300">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-amber-500/20 flex items-center justify-center mr-4">
                  <span className="text-amber-500 font-bold">DJI</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Dow Jones Industrial Average (DJIA)</h4>
                  <p className="mt-1 text-zinc-300">
                    Tracks 30 major blue-chip US companies.
                  </p>
                  
                  <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-zinc-900/50 px-4 py-3 rounded-md">
                      <dt className="text-sm font-medium text-zinc-500">Example Companies</dt>
                      <dd className="mt-1 text-sm text-zinc-300">Coca-Cola, Boeing, Goldman Sachs</dd>
                    </div>
                    <div className="bg-zinc-900/50 px-4 py-3 rounded-md">
                      <dt className="text-sm font-medium text-zinc-500">Trade Via</dt>
                      <dd className="mt-1 text-sm text-white font-semibold">DIA ETF</dd>
                    </div>
                    <div className="col-span-2 bg-zinc-900/50 px-4 py-3 rounded-md">
                      <dt className="text-sm font-medium text-zinc-500">Why It Matters</dt>
                      <dd className="mt-1 text-sm text-zinc-300">Shows performance of well-established industry leaders</dd>
                    </div>
                  </dl>
                  
                  <div className="mt-6 p-4 bg-zinc-900/50 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-red-500">DIA (Dow Jones ETF)</p>
                      </div>
                      <div className="bg-zinc-800 p-2 rounded-md">
                        <svg className="w-16 h-10" viewBox="0 0 100 40">
                          <path 
                            d="M0,15 L10,20 L20,18 L30,25 L40,30 L50,28 L60,35 L70,32 L80,35 L90,30 L100,35" 
                            fill="none" 
                            stroke="#ef4444" 
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "crypto" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🪙</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">What is Cryptocurrency Trading?</h3>
                <p className="mt-2 text-zinc-300">
                  Cryptocurrency is digital money built on blockchain technology. Unlike stocks, cryptos trade 24/7.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-700">
                <thead className="bg-zinc-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Symbol</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-900 divide-y divide-zinc-800">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold text-white">₿</span>
                        </div>
                        <div className="font-medium text-white">BTC/USD</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">Bitcoin</td>
                    <td className="px-6 py-4 text-sm text-zinc-400">First and most valuable cryptocurrency</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold text-white">Ξ</span>
                        </div>
                        <div className="font-medium text-white">ETH/USD</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">Ethereum</td>
                    <td className="px-6 py-4 text-sm text-zinc-400">Popular for smart contracts & DeFi applications</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold text-white">S</span>
                        </div>
                        <div className="font-medium text-white">SOL/USD</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">Solana</td>
                    <td className="px-6 py-4 text-sm text-zinc-400">High-speed blockchain platform</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-zinc-600 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold text-white">X</span>
                        </div>
                        <div className="font-medium text-white">XRP/USD</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">Ripple</td>
                    <td className="px-6 py-4 text-sm text-zinc-400">Used for fast cross-border payments</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 mt-8">
              <h4 className="text-lg font-medium text-white mb-4">Key Differences Between Crypto and Stock Trading</h4>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span><strong className="text-amber-500">24/7 Trading:</strong> Unlike stocks that trade during market hours, crypto markets never close.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span><strong className="text-amber-500">Volatility:</strong> Crypto prices can fluctuate dramatically in short periods.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span><strong className="text-amber-500">Decentralization:</strong> Most cryptocurrencies operate without a central authority.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span><strong className="text-amber-500">Custody:</strong> You can self-custody your crypto assets, unlike stocks held by brokerages.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "concepts" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Key Trading Concepts</h3>
                <p className="mt-2 text-zinc-300">
                  Understanding these fundamental terms will help you navigate the trading world.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-700">
                <thead className="bg-zinc-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Term</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Meaning</th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-900 divide-y divide-zinc-800">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Buy/Sell</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">Buy when you expect the price to rise, sell when you think it'll fall</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Price</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">The current market value of an asset (e.g., SPY = $495.23)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">PnL</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">Profit and Loss = (Sell Price – Buy Price) × Quantity</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Intraday</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">Buying and selling within the same day</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Long-term</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">Holding your position over days, weeks, or years</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Volume</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">Number of shares/contracts traded</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                <h4 className="flex items-center text-lg font-medium text-white">
                  <span className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                  </span>
                  Going Long
                </h4>
                <p className="mt-2 text-zinc-300">
                  When you "go long," you're buying an asset with the expectation that its price will rise over time. This is the most common way people invest.
                </p>
                <div className="mt-4 p-3 bg-zinc-900 rounded-md text-sm">
                  <span className="text-zinc-400">Example: </span>
                  <span className="text-zinc-300">Buying 10 shares of Apple at $170, hoping to sell when the price reaches $200.</span>
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                <h4 className="flex items-center text-lg font-medium text-white">
                  <span className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                  </span>
                  Going Short
                </h4>
                <p className="mt-2 text-zinc-300">
                  When you "go short," you're selling an asset with the expectation that its price will fall. You'll profit from the price decrease.
                </p>
                <div className="mt-4 p-3 bg-zinc-900 rounded-md text-sm">
                  <span className="text-zinc-400">Example: </span>
                  <span className="text-zinc-300">Shorting 10 shares of Tesla at $250, hoping to buy them back when the price falls to $200.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "examples" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Example Trades</h3>
                <p className="mt-2 text-zinc-300">
                  See how actual trades work and how profit and loss are calculated.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-700">
                <thead className="bg-zinc-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">You Trade</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Buy Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Sell Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">PnL</th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-900 divide-y divide-zinc-800">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">SPY</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">$490</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">$500</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-500">$20 profit</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">BTC/USD</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">$60,000</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">$58,000</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">0.1 BTC</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-500">$200 loss</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 mt-8">
              <h4 className="text-lg font-medium text-white mb-4">Trade Calculation Example</h4>
              
              <div className="bg-zinc-900 p-4 rounded-md">
                <p className="text-zinc-300 mb-4"><span className="text-amber-500 font-medium">Scenario:</span> You bought 5 shares of QQQ at $400 and sold them at $420.</p>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-500/20 text-amber-500 px-2 py-1 rounded text-xs font-medium">Step 1</span>
                    <span className="text-zinc-300">Calculate the price difference: $420 - $400 = $20 per share</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-500/20 text-amber-500 px-2 py-1 rounded text-xs font-medium">Step 2</span>
                    <span className="text-zinc-300">Multiply by quantity: $20 × 5 shares = $100 profit</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-md">
                  <p className="text-green-500 font-medium">Total Profit: $100</p>
                  <p className="text-xs text-zinc-400 mt-1">Excluding any commission or fees</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="mt-12 bg-amber-500/10 rounded-lg p-6 border border-amber-500/20">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <div className="ml-4">
              <h5 className="text-lg font-medium text-white">Ready to learn more?</h5>
              <p className="mt-1 text-zinc-300">
                Now that you understand the basics, it's time to learn about trading strategies that can help you make informed decisions.
              </p>
              <div className="mt-4">
                <Link 
                  href="/learn/strategies" 
                  className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-500 transition-colors"
                >
                  Continue to Trading Strategies
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}