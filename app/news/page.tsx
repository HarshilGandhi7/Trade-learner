"use client";
import React, { useState, useEffect } from "react";
import { STOCK_MARKETS } from "../constants";
import { NewsArticle } from "../types";

const NewsPage = () => {
  // Update the type to match your actual API response format
  const [newsData, setNewsData] = useState<
    Record<string, { success: boolean; articles: NewsArticle[] }>
  >({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async (symbol: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/news/${symbol}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch news for ${symbol}`);
        }
        const data = await response.json();
        return data.success ? data : null;
      } catch (error) {
        console.error(`Error fetching news for ${symbol}:`, error);
        return null;
      }
    };

    const fetchAllNews = async () => {
      try {
        const results: Record<
          string,
          { success: boolean; articles: NewsArticle[] }
        > = {};

        const promises = STOCK_MARKETS.map(async (market) => {
          const data = await fetchNews(market.symbol);
          if (data) {
            return { symbol: market.symbol, data };
          }
          return null;
        });

        const newsResults = await Promise.all(promises);

        newsResults.forEach((result) => {
          if (result) {
            results[result.symbol] = result.data;
          }
        });

        setNewsData(results);
      } catch (error) {
        console.error("Failed to fetch all news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
            Market News & Analysis
          </h1>
          <p className="text-zinc-400 mt-2">
            Stay informed with the latest financial market updates
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-80 bg-zinc-800/20 rounded-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mb-4"></div>
            <p className="text-zinc-400">Loading market news...</p>
          </div>
        ) : Object.keys(newsData).length > 0 ? (
          <div className="space-y-10">
            {Object.entries(newsData).map(([symbol, news]) => (
              <section
                key={symbol}
                className="bg-zinc-800/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-zinc-700/30"
              >
                <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 p-4 sm:p-6">
                  <h2 className="text-2xl font-semibold flex items-center">
                    <span className="text-blue-400 mr-2">{symbol}</span>
                    <span className="text-zinc-300">-</span>
                    <span className="ml-2 text-zinc-100">
                      {STOCK_MARKETS.find((m) => m.symbol === symbol)?.name ||
                        "Market"}
                    </span>
                  </h2>
                  <div className="flex items-center text-xs text-zinc-500 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Last updated: {new Date().toLocaleString()}
                  </div>
                </div>

                <div className="px-4 sm:px-6 py-4">
                  {news.articles && news.articles.length > 0 ? (
                    <div className="grid gap-4">
                      {news.articles.map((article: NewsArticle) => (
                        <article
                          key={article.uuid}
                          className="bg-zinc-800/70 rounded-lg p-4 hover:bg-zinc-700/80 transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600/70 shadow-md hover:shadow-lg"
                        >
                          <div className="flex flex-col md:flex-row gap-5">
                            {article.image_url && (
                              <div className="md:w-1/4 flex-shrink-0">
                                <div className="relative h-40 rounded-md overflow-hidden">
                                  <img
                                    src={article.image_url}
                                    alt={article.title}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                      (
                                        e.target as HTMLImageElement
                                      ).style.display = "none";
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                              </div>
                            )}
                            <div
                              className={
                                article.image_url ? "md:w-3/4" : "w-full"
                              }
                            >
                              <h3 className="text-lg font-medium mb-2 leading-tight">
                                <a
                                  href={article.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-300 hover:text-blue-200 transition-colors"
                                >
                                  {article.title}
                                </a>
                              </h3>
                              <p className="text-zinc-300 mb-3 line-clamp-3 text-sm">
                                {article.description || article.snippet}
                              </p>
                              <div className="flex justify-between items-center text-xs text-zinc-400 pt-2 border-t border-zinc-700/50">
                                <div className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5M8 19h7"
                                    />
                                  </svg>
                                  <span>{article.source}</span>
                                </div>
                                <div className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <span>
                                    {new Date(
                                      article.published_at
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-zinc-800/50 rounded-lg p-8 text-center border border-dashed border-zinc-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-zinc-600 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5M8 19h7"
                        />
                      </svg>
                      <p className="text-zinc-400">
                        No news articles available for {symbol} at this time.
                      </p>
                      <p className="text-zinc-500 text-sm mt-2">
                        Please check back later for updates.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-800/30 backdrop-blur-sm rounded-xl p-10 text-center border border-zinc-700/30 shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-zinc-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-zinc-400 mb-2">
              No Market Data Available
            </h3>
            <p className="text-zinc-500 max-w-md mx-auto">
              We couldn't retrieve the latest market news at this time. Please
              check your connection and try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Refresh Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
