"use client";

import { getCookie } from "@/utils/auth";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { UserData } from "./types";
import { CRYPTO_MARKETS, STOCK_MARKETS } from "./constants";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null as UserData | null);
  const [loading, setLoading] = useState(false);
  const [marketDropdownOpen, setMarketDropdownOpen] = useState(false);
  const [cryptoDropdownOpen, setCryptoDropdownOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const checkLogin = async () => {
      setLoading(true);
      const userCookie = getCookie();
      if (userCookie) {
        setUserData(userCookie);
      }
      setLoading(false);
    };

    checkLogin();
  }, []);

  return loading ? (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <svg
          aria-hidden="true"
          className="w-16 h-16 text-gray-600 animate-spin fill-amber-500"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
        <span className="mt-4 text-lg text-zinc-300">
          Loading your dashboard...
        </span>
      </div>
    </div>
  ) : (
    <div className="bg-zinc-900 min-h-screen flex">
      {/* Sidebar backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-30 transition duration-300 ease-in-out bg-gradient-to-b from-zinc-800 to-zinc-900 w-80 overflow-y-auto border-r border-zinc-700/50 shadow-xl`}
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-700/50">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Trade<span className="text-amber-500">Learner</span>
            </h2>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {userData && (
          <div className="px-6 py-4 border-b border-zinc-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white font-bold">
                {userData.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium">{userData.username}</p>
                <p className="text-zinc-400 text-sm">Trading Account</p>
              </div>
            </div>
          </div>
        )}

        <nav className="mt-6 px-6">
          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-3 mb-4 text-base font-medium rounded-xl transition-all duration-200 text-white bg-gradient-to-r from-amber-700/40 to-amber-700/20 hover:from-amber-700/60 hover:to-amber-700/40 border border-amber-700/50 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-3 text-amber-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
              />
            </svg>
            Dashboard
          </Link>

          {/* Markets Section */}
          <div className="mb-4">
            <button
              onClick={() => setMarketDropdownOpen(!marketDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-colors text-white hover:bg-zinc-800"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-3 text-zinc-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>
                <span>Stock Markets</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-4 h-4 transition-transform duration-200 ${
                  marketDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            <div
              className={`mt-1 ml-6 pl-2 border-l border-zinc-700/50 space-y-1 ${
                marketDropdownOpen ? "block" : "hidden"
              }`}
            >
              {STOCK_MARKETS.map((market) => (
                <Link
                  key={market.symbol}
                  href={`/markets/${market.symbol}`}
                  className="flex items-center px-4 py-2.5 text-base font-medium rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-3"></span>
                  {market.description}
                </Link>
              ))}
            </div>
          </div>

          {/* Crypto Section */}
          <div className="mb-4">
            <button
              onClick={() => setCryptoDropdownOpen(!cryptoDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-colors text-white hover:bg-zinc-800"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-3 text-zinc-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
                <span>Cryptocurrencies</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-4 h-4 transition-transform duration-200 ${
                  cryptoDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            <div
              className={`mt-1 ml-6 pl-2 border-l border-zinc-700/50 space-y-1 ${
                cryptoDropdownOpen ? "block" : "hidden"
              }`}
            >
              {CRYPTO_MARKETS.map((crypto) => (
                <Link
                  key={crypto.symbol}
                  href={`/crypto/${crypto.symbol}`}
                  className="flex items-center px-4 py-2.5 text-base font-medium rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${crypto.color} mr-3`}
                  ></span>
                  {crypto.name} ({crypto.symbol})
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-1 mb-4">
            <Link
              href="/learn"
              className="flex items-center px-4 py-3 text-base font-medium rounded-lg text-white hover:bg-zinc-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3 text-zinc-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
              Learning Center
            </Link>

            <Link
              href="/news"
              className="flex items-center px-4 py-3 text-base font-medium rounded-lg text-white hover:bg-zinc-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3 text-zinc-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>
              News
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center px-4 py-3 text-base font-medium rounded-lg text-white hover:bg-zinc-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3 text-zinc-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                />
              </svg>
              Portfolio
            </Link>
          </div>

          {/* Account Section */}
          <div className="pt-4 border-t border-zinc-700/50">
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3 px-2">
              Account
            </h3>
            <Link
              href="/AddMoney"
              className="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors text-white hover:bg-zinc-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3 text-zinc-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
              Add Credits
            </Link>

            <Link
              href="/settings"
              className="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors text-white hover:bg-zinc-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3 text-zinc-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </Link>

            {userData && (
              <button
                onClick={() => {
                  Cookies.remove("user");
                  toast.success("Successfully logged out");
                  router.push("/sign-in");
                }}
                className="w-full flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors text-white hover:bg-red-800/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-3 text-red-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                Log Out
              </button>
            )}
          </div>
        </nav>
      </div>

      <div className="flex-1 md:ml-80 flex flex-col min-h-screen">
        <header className="bg-zinc-800/80 border-b border-zinc-700/50 sticky top-0 z-10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex-shrink-0 flex items-center md:hidden">
                <h1 className="text-xl font-bold text-white">
                  Trade<span className="text-amber-500">Learner</span>
                </h1>
              </div>

              {!userData ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/sign-in"
                    className="text-zinc-300 hover:text-white font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-500 hover:to-amber-600 transition-colors font-medium shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="hidden md:block text-right">
                    <p className="text-white font-medium">
                      {userData.username}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white font-bold">
                    {userData.username.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/trading-pattern.png')] opacity-10 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/0 via-zinc-900/80 to-zinc-900 z-0"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center md:text-left md:flex md:items-center md:justify-between">
              <div className="md:max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Master Trading in a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-400">
                    Risk-Free
                  </span>{" "}
                  Environment
                </h1>
                <p className="mt-6 text-xl text-zinc-300 leading-relaxed">
                  Practice trading strategies with real-time market data and
                  virtual credits. Build your skills and confidence before
                  entering the real market.
                </p>
                {!userData && (
                  <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link
                      href="/sign-up"
                      className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all font-medium text-lg shadow-lg shadow-amber-900/20"
                    >
                      Start Trading Now
                    </Link>
                    <Link
                      href="/learn"
                      className="px-8 py-4 bg-zinc-800 text-white rounded-xl border border-zinc-700 hover:bg-zinc-700 transition-all font-medium text-lg flex items-center justify-center"
                    >
                      <span>Learn More</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Link>
                  </div>
                )}

                {userData && (
                  <div className="mt-8 inline-flex p-4 bg-zinc-800/80 border border-zinc-700 rounded-xl items-center">
                    <div className="h-12 w-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-zinc-400 text-sm">
                        Your trading account is active
                      </p>
                      <p className="text-white font-medium">
                        Continue where you left off
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="ml-4 p-2 text-amber-500 hover:text-amber-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
              <div className="hidden md:block md:w-96 lg:w-[500px] mt-10 md:mt-0">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur opacity-30"></div>
                  <div className="relative bg-zinc-800 p-1 rounded-2xl border border-zinc-700">
                    <Image
                      src="/trading-chart.png"
                      alt="Trading chart"
                      width={500}
                      height={350}
                      className="rounded-xl shadow-xl"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-zinc-800 border border-zinc-700 rounded-xl p-3 shadow-lg">
                    <div className="text-white font-medium">Market And Cryptos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-zinc-800/50 backdrop-blur-sm border-y border-zinc-700/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6 bg-zinc-800/80 rounded-xl border border-zinc-700/50 shadow-lg">
                <div className="h-14 w-14 rounded-xl bg-amber-600/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-amber-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Real-Time Simulation
                </h3>
                <p className="mt-2 text-center text-zinc-300">
                  Practice with real market data and live prices without risking
                  actual capital.
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-zinc-800/80 rounded-xl border border-zinc-700/50 shadow-lg">
                <div className="h-14 w-14 rounded-xl bg-amber-600/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-amber-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Learning Resources
                </h3>
                <p className="mt-2 text-center text-zinc-300">
                  Access expert trading guides, strategies, and analysis
                  techniques through interactive lessons.
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-zinc-800/80 rounded-xl border border-zinc-700/50 shadow-lg">
                <div className="h-14 w-14 rounded-xl bg-amber-600/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-amber-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Performance Analytics
                </h3>
                <p className="mt-2 text-center text-zinc-300">
                  Track your trading performance with detailed analytics and
                  insights to improve your strategy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-400">
                  Virtual Credits
                </span>{" "}
                System
              </h2>
              <p className="mt-4 text-lg text-zinc-300 max-w-3xl mx-auto">
                Trade with virtual credits that simulate real-world trading
                without any financial risk.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-b from-zinc-800 to-zinc-800/40 p-8 rounded-xl border border-zinc-700/50 transition-all hover:border-amber-600/50 hover:shadow-lg hover:shadow-amber-900/10 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <div className="h-16 w-16 rounded-full bg-amber-900/30 flex items-center justify-center mb-6 mx-auto relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-amber-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white text-center relative">
                  Free Credits
                </h3>
                <div className="text-3xl font-bold text-amber-500 text-center mt-2 relative">
                  10,000
                </div>
                <p className="mt-4 text-center text-zinc-300 relative">
                  Start with 10,000 free credits when you sign up, equivalent to
                  $10,000 in the real market.
                </p>
              </div>

              <div className="bg-gradient-to-b from-zinc-800 to-zinc-800/40 p-8 rounded-xl border border-zinc-700/50 transition-all hover:border-amber-600/50 hover:shadow-lg hover:shadow-amber-900/10 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <div className="h-16 w-16 rounded-full bg-amber-900/30 flex items-center justify-center mb-6 mx-auto relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-amber-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white text-center relative">
                  Credit Value
                </h3>
                <div className="text-3xl font-bold text-amber-500 text-center mt-2 relative">
                  1:1
                </div>
                <p className="mt-4 text-center text-zinc-300 relative">
                  Each credit equals $1 in market value, making it easy to
                  understand your simulated performance.
                </p>
              </div>

              <div className="bg-gradient-to-b from-zinc-800 to-zinc-800/40 p-8 rounded-xl border border-zinc-700/50 transition-all hover:border-amber-600/50 hover:shadow-lg hover:shadow-amber-900/10 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <div className="h-16 w-16 rounded-full bg-amber-900/30 flex items-center justify-center mb-6 mx-auto relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-amber-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white text-center relative">
                  Additional Credits
                </h3>
                <div className="text-3xl font-bold text-amber-500 text-center mt-2 relative">
                  1,000:$1
                </div>
                <p className="mt-4 text-center text-zinc-300 relative">
                  Need more practice? Get 1,000 additional credits for each $1
                  spent to boost your trading portfolio.
                </p>
              </div>
            </div>

            {!userData && (
              <div className="mt-12 text-center">
                <Link
                  href="/sign-up"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all font-medium text-lg shadow-lg shadow-amber-900/20"
                >
                  Start Trading with Free Credits
                </Link>
              </div>
            )}
          </div>
        </section>

        {!userData && (
          <section className="py-16 bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 border-t border-zinc-700/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white">
                Ready to start your trading journey?
              </h2>
              <p className="mt-4 text-lg text-zinc-300">
                Join thousands of traders who are learning and practicing with
                our platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/sign-up"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all font-medium text-lg shadow-lg shadow-amber-900/20"
                >
                  Create Free Account
                </Link>
                <Link
                  href="/sign-in"
                  className="px-8 py-4 bg-zinc-800 text-white rounded-xl border border-zinc-700 hover:bg-zinc-700 transition-all font-medium text-lg"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </section>
        )}

        <footer className="bg-zinc-900 border-t border-zinc-800 mt-auto">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Trade<span className="text-amber-500">Learner</span>
                  </h3>
                </div>
                <p className="mt-4 text-zinc-400 text-sm">
                  A comprehensive trading education platform where you can
                  learn, practice, and master trading strategies in a risk-free
                  environment.
                </p>
                <div className="mt-6 flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/harshilgandhi77/"
                    className="text-zinc-500 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/HarshilGandhi7/"
                    className="text-zinc-500 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="col-span-1">
                <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                  Markets
                </h4>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      href="/markets/QQQ"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      QQQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/markets/AAPL"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      AAPL
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/markets/MSFT"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      MSFT
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-1">
                <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                  Crypto
                </h4>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      href="/crypto/BTC"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      Bitcoin
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/crypto/ETH"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      Ethereum
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/crypto/SOL"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      Solana
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-1">
                <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                  Account
                </h4>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      href="/dashboard"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/learn"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      Learning Center
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
