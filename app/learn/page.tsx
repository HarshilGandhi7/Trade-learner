"use client";
import React from "react";
import Link from "next/link";

const Learn = () => {
  return (
    <div className="min-h-screen bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Trading Knowledge Center
          </h1>
          <p className="max-w-3xl mx-auto text-zinc-400 text-lg">
            Enhance your trading skills with our comprehensive learning
            resources. Whether you're just starting out or looking to refine
            your strategies, we have the knowledge you need.
          </p>
        </div>

        <div className="bg-zinc-800 rounded-2xl p-8 mb-12 border border-zinc-700 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold text-white mb-4">
                Why Learn Trading?
              </h2>
              <p className="text-zinc-400 mb-4">
                Trading in financial markets offers opportunities for financial
                growth, but requires knowledge and skill. Understanding market
                dynamics, developing effective strategies, and mastering
                technical analysis are essential components of successful
                trading.
              </p>
              <p className="text-zinc-400">
                Our learning resources are designed to guide you through your
                trading journey, from basic concepts to advanced techniques.
                Choose a learning path below to start or continue your
                education.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-700/20 p-8 border border-amber-600/30">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-900/80 p-4 rounded-lg border border-zinc-700 text-center">
                    <h3 className="text-amber-500 font-semibold">Learning</h3>
                    <p className="text-4xl font-bold text-white mt-2">+65%</p>
                    <p className="text-zinc-500 text-sm mt-1">
                      Trading Success
                    </p>
                  </div>
                  <div className="bg-zinc-900/80 p-4 rounded-lg border border-zinc-700 text-center">
                    <h3 className="text-amber-500 font-semibold">Strategy</h3>
                    <p className="text-4xl font-bold text-white mt-2">+42%</p>
                    <p className="text-zinc-500 text-sm mt-1">Return Rate</p>
                  </div>
                  <div className="bg-zinc-900/80 p-4 rounded-lg border border-zinc-700 text-center">
                    <h3 className="text-amber-500 font-semibold">Analysis</h3>
                    <p className="text-4xl font-bold text-white mt-2">-58%</p>
                    <p className="text-zinc-500 text-sm mt-1">Risk Reduction</p>
                  </div>
                  <div className="bg-zinc-900/80 p-4 rounded-lg border border-zinc-700 text-center">
                    <h3 className="text-amber-500 font-semibold">Practice</h3>
                    <p className="text-4xl font-bold text-white mt-2">+80%</p>
                    <p className="text-zinc-500 text-sm mt-1">Confidence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">
          Choose Your Learning Path
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link href="/learn/basics" className="block group">
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/10 hover:border-amber-600/50 h-full">
              <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mb-4 border border-green-500/30 group-hover:border-green-500/50 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-500 transition-colors">
                  Trading Basics
                </h3>
                <p className="text-zinc-400 mb-4">
                  Learn the fundamentals of trading, including market structure,
                  key terminology, types of assets, and essential concepts every
                  trader should know.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm group-hover:text-white transition-colors flex items-center">
                    Explore
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/learn/strategies" className="block group">
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/10 hover:border-amber-600/50 h-full">
              <div className="h-3 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/30 group-hover:border-blue-500/50 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">
                  Trading Strategies
                </h3>
                <p className="text-zinc-400 mb-4">
                  Discover various trading strategies, from day trading to swing
                  trading, position trading, and long-term investing approaches
                  suitable for different market conditions.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm group-hover:text-white transition-colors flex items-center">
                    Explore
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/learn/technical-analysis" className="block group">
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/10 hover:border-amber-600/50 h-full">
              <div className="h-3 bg-gradient-to-r from-purple-500 to-pink-600"></div>
              <div className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center mb-4 border border-purple-500/30 group-hover:border-purple-500/50 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-500 transition-colors">
                  Technical Analysis
                </h3>
                <p className="text-zinc-400 mb-4">
                  Master the art of reading charts, identifying patterns, using
                  technical indicators, and making data-driven trading decisions
                  based on price action.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm group-hover:text-white transition-colors flex items-center">
                    Explore
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-amber-600/20 to-amber-800/20 rounded-2xl p-8 border border-amber-700/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Ready to start learning?
              </h2>
              <p className="text-zinc-300">
                We recommend beginning with the Trading Basics if you're new to
                trading.
              </p>
            </div>
            <Link
              href="/learn/basics"
              className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-amber-600/25 flex items-center space-x-2 whitespace-nowrap"
            >
              <span>Start Learning</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
