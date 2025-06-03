"use client";

import { getCookie } from "@/utils/auth";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserData {
  uid: string;
  email: string;
  username: string;
}
export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null as UserData | null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      setLoading(true);
      const userCookie = getCookie();
      if (userCookie) {
        setUserData(userCookie);
      } else {
        toast.error("You are not logged in. Please sign in to continue.");
        router.push("/sign-in");
        return;
      }
      setLoading(false);
    };

    checkLogin();
  }, []);

  return loading ? (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <div className="bg-zinc-900 min-h-screen flex">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-30 transition duration-300 ease-in-out bg-zinc-800 w-64 overflow-y-auto border-r border-zinc-700`}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-700">
          <h2 className="text-xl font-semibold text-white">
            Trade<span className="text-amber-500">Learner</span>
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-5 px-4">
          <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3 px-2">
            Markets
          </h3>
          <div className="space-y-1">
            <Link
              href="/markets/invesco"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-zinc-300 hover:bg-zinc-700 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3 text-zinc-400 group-hover:text-zinc-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
              Nasdaq 100 ETF
            </Link>
            <Link
              href="/markets/gold-etf"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-zinc-300 hover:bg-zinc-700 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3 text-zinc-400 group-hover:text-zinc-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
              GOLD-ETF
            </Link>
            <Link
              href="/markets/sp500"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-zinc-300 hover:bg-zinc-700 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3 text-zinc-400 group-hover:text-zinc-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
              S&P 500
            </Link>
          </div>

          <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3 px-2 mt-6">
            Cryptocurrencies
          </h3>
          <div className="space-y-1">
            <Link
              href="/crypto/btc"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-zinc-300 hover:bg-zinc-700 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-3 text-amber-400 group-hover:text-amber-300"
              >
                <path d="M10.5 21l-.426-.426a.749.749 0 00-.765-.172l-4.562 1.72a.749.749 0 01-.935-.935l1.72-4.561a.749.749 0 00-.172-.764L5 15.5l-.36-.36a.2.2 0 01-.038-.238l3.26-6.929a.2.2 0 01.336-.067L12 12l3.803-4.064a.2.2 0 01.336.067l3.26 6.929a.2.2 0 01-.038.238l-.36.36.36.36c.203.203.271.5.172.764l-1.72 4.561a.749.749 0 01-.935.935l-4.562-1.72a.749.749 0 00-.765.172L10.5 21z" />
              </svg>
              Bitcoin (BTC)
            </Link>
            <Link
              href="/crypto/eth"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-zinc-300 hover:bg-zinc-700 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-3 text-blue-400 group-hover:text-blue-300"
              >
                <path d="M10.5 21l-.426-.426a.749.749 0 00-.765-.172l-4.562 1.72a.749.749 0 01-.935-.935l1.72-4.561a.749.749 0 00-.172-.764L5 15.5l-.36-.36a.2.2 0 01-.038-.238l3.26-6.929a.2.2 0 01.336-.067L12 12l3.803-4.064a.2.2 0 01.336.067l3.26 6.929a.2.2 0 01-.038.238l-.36.36.36.36c.203.203.271.5.172.764l-1.72 4.561a.749.749 0 01-.935.935l-4.562-1.72a.749.749 0 00-.765.172L10.5 21z" />
              </svg>
              Ethereum (ETH)
            </Link>
            <Link
              href="/crypto/sol"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-zinc-300 hover:bg-zinc-700 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-3 text-purple-400 group-hover:text-purple-300"
              >
                <path d="M10.5 21l-.426-.426a.749.749 0 00-.765-.172l-4.562 1.72a.749.749 0 01-.935-.935l1.72-4.561a.749.749 0 00-.172-.764L5 15.5l-.36-.36a.2.2 0 01-.038-.238l3.26-6.929a.2.2 0 01.336-.067L12 12l3.803-4.064a.2.2 0 01.336.067l3.26 6.929a.2.2 0 01-.038.238l-.36.36.36.36c.203.203.271.5.172.764l-1.72 4.561a.749.749 0 01-.935.935l-4.562-1.72a.749.749 0 00-.765.172L10.5 21z" />
              </svg>
              Solana (SOL)
            </Link>
          </div>

          <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3 px-2 mt-6">
            Account
          </h3>
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="group flex items-center px-3 py-2.5 text-base font-medium rounded-md transition-all duration-200 hover:bg-amber-600/20 bg-zinc-700/80 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3 text-amber-500 group-hover:text-amber-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
              Dashboard
            </Link>
            <Link
              href="/AddMoney"
              className="group flex items-center px-3 py-2.5 text-base font-medium rounded-md transition-all duration-200 hover:bg-amber-600/20 bg-zinc-700/80 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3 text-amber-500 group-hover:text-amber-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
              Add Credits
            </Link>
          </div>
        </nav>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="bg-zinc-800 border-b border-zinc-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700"
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
                <h1 className="text-xl font-semibold text-white">
                  Trade<span className="text-amber-500">Learner</span>
                </h1>
              </div>

              <nav className="hidden md:flex md:items-center md:space-x-8"></nav>

              {!userData ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/sign-in"
                    className="hidden md:inline-flex text-zinc-300 hover:text-white font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="hidden md:inline-flex px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-500 transition-colors font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-zinc-300 font-medium">
                    Welcome, {userData.username}
                  </span>
                  <button
                    onClick={() => {
                      Cookies.remove("user");
                      toast.success("Successfully logged out");
                      router.push("/sign-in");
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors font-medium"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center md:text-left md:flex md:items-center md:justify-between">
              <div className="md:max-w-xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Learn to Trade with{" "}
                  <span className="text-amber-500">Confidence</span>
                </h1>
                <p className="mt-4 text-xl text-zinc-300">
                  Practice trading strategies in a risk-free environment and
                  build your skills before entering the real market.
                </p>
                {!userData && (
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link
                      href="/sign-up"
                      className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-500 transition-colors font-medium"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/sign-in"
                      className="px-6 py-3 bg-zinc-800 text-white rounded-md border border-zinc-700 hover:bg-zinc-700 transition-colors font-medium"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
              <div className="hidden md:block md:w-96 lg:w-[450px]">
                <Image
                  src="/trading-chart.png"
                  alt="Trading chart"
                  width={450}
                  height={300}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6">
                <div className="h-12 w-12 rounded-full bg-amber-900/30 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-amber-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">
                  Market Simulation
                </h3>
                <p className="mt-2 text-center text-zinc-400">
                  Practice with real market data without any financial risk.
                </p>
              </div>

              <div className="flex flex-col items-center p-6">
                <div className="h-12 w-12 rounded-full bg-amber-900/30 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-amber-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">
                  Learn Strategies
                </h3>
                <p className="mt-2 text-center text-zinc-400">
                  Master proven trading techniques through hands-on practice.
                </p>
              </div>

              <div className="flex flex-col items-center p-6">
                <div className="h-12 w-12 rounded-full bg-amber-900/30 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-amber-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">
                  Track Progress
                </h3>
                <p className="mt-2 text-center text-zinc-400">
                  Monitor your performance and improve your trading skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">
                <span className="text-amber-500">Credits System</span>
              </h2>
              <p className="mt-4 text-lg text-zinc-300 max-w-3xl mx-auto">
                Trade with virtual credits that simulate real-world trading
                without any financial risk.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 transition-all hover:border-amber-600 hover:shadow-md hover:shadow-amber-900/20">
                <div className="h-16 w-16 rounded-full bg-amber-900/30 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-amber-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white text-center">
                  Free Credits
                </h3>
                <div className="text-3xl font-bold text-amber-500 text-center mt-2">
                  10,000
                </div>
                <p className="mt-4 text-center text-zinc-300">
                  Start with 10,000 free credits when you sign up. Equivalent to
                  $10,000 in the real world.
                </p>
              </div>

              <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 transition-all hover:border-amber-600 hover:shadow-md hover:shadow-amber-900/20">
                <div className="h-16 w-16 rounded-full bg-amber-900/30 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-amber-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white text-center">
                  Credit Value
                </h3>
                <div className="text-3xl font-bold text-amber-500 text-center mt-2">
                  1:1
                </div>
                <p className="mt-4 text-center text-zinc-300">
                  Each credit is equivalent to $1 in real-world value, making it
                  easy to understand your simulated performance.
                </p>
              </div>

              <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 transition-all hover:border-amber-600 hover:shadow-md hover:shadow-amber-900/20">
                <div className="h-16 w-16 rounded-full bg-amber-900/30 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-amber-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white text-center">
                  Additional Credits
                </h3>
                <div className="text-3xl font-bold text-amber-500 text-center mt-2">
                  1,000:$1
                </div>
                <p className="mt-4 text-center text-zinc-300">
                  Need more practice? Get 1,000 additional credits for each $1
                  spent. Boost your trading portfolio anytime.
                </p>
              </div>
            </div>

            {!userData && (
              <div className="mt-12 text-center">
                <Link
                  href="/sign-up"
                  className="px-8 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-500 transition-colors font-medium text-lg"
                >
                  Start Trading with Free Credits
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">
                Understanding{" "}
                <span className="text-amber-500">Stock Markets</span>
              </h2>
              <p className="mt-4 text-lg text-zinc-300 max-w-3xl mx-auto">
                Learn the essentials of trading before you start your journey in
                the financial markets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Stock Market Basics
                </h3>
                <div className="space-y-4 text-zinc-300">
                  <p>
                    The stock market is a marketplace where investors buy and
                    sell shares of publicly traded companies. It provides
                    companies with access to capital and investors with the
                    opportunity for financial returns through capital gains and
                    dividends.
                  </p>
                  <p>
                    <span className="text-amber-500 font-medium">
                      Major Stock Indices:
                    </span>{" "}
                    Indices like the NASDAQ, S&P 500, and Dow Jones Industrial
                    Average track the performance of groups of stocks, serving
                    as benchmarks for the overall market.
                  </p>
                  <p>
                    <span className="text-amber-500 font-medium">
                      Trading Sessions:
                    </span>{" "}
                    Most stock markets operate during specific hours. For
                    example, the New York Stock Exchange (NYSE) operates from
                    9:30 AM to 4:00 PM Eastern Time on weekdays.
                  </p>
                </div>
                <Link
                  href="/learn/basics"
                  className="mt-6 inline-flex items-center text-amber-500 hover:text-amber-400"
                >
                  Learn more about stock market basics
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Trading Strategies
                </h3>
                <div className="space-y-4 text-zinc-300">
                  <p>
                    <span className="text-amber-500 font-medium">
                      Day Trading:
                    </span>{" "}
                    Involves buying and selling securities within the same
                    trading day, capitalizing on small price movements with no
                    positions held overnight.
                  </p>
                  <p>
                    <span className="text-amber-500 font-medium">
                      Swing Trading:
                    </span>{" "}
                    Takes advantage of price "swings" over several days or
                    weeks, capturing larger movements than day trading.
                  </p>
                  <p>
                    <span className="text-amber-500 font-medium">
                      Position Trading:
                    </span>{" "}
                    Long-term strategy where traders hold positions for months
                    or years, focusing on fundamental factors and long-term
                    trends.
                  </p>
                </div>
                <Link
                  href="/learn/strategies"
                  className="mt-6 inline-flex items-center text-amber-500 hover:text-amber-400"
                >
                  Explore trading strategies
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Technical Analysis
                </h3>
                <div className="space-y-4 text-zinc-300">
                  <p>
                    Technical analysis involves studying price movements and
                    trading volumes to forecast future price trends. Traders use
                    charts, patterns, and indicators to make informed decisions.
                  </p>
                  <p>
                    <span className="text-amber-500 font-medium">
                      Key Indicators:
                    </span>{" "}
                    Moving averages, Relative Strength Index (RSI), MACD, and
                    Bollinger Bands help traders identify potential entry and
                    exit points.
                  </p>
                  <p>
                    <span className="text-amber-500 font-medium">
                      Chart Patterns:
                    </span>{" "}
                    Recognizable patterns like head and shoulders, double tops,
                    triangles, and flags can signal potential trend reversals or
                    continuations.
                  </p>
                </div>
                <Link
                  href="/learn/technical-analysis"
                  className="mt-6 inline-flex items-center text-amber-500 hover:text-amber-400"
                >
                  Dive into technical analysis
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Risk Management
                </h3>
                <div className="space-y-4 text-zinc-300">
                  <p>
                    Successful trading isn't just about picking winners—it's
                    about managing risk effectively to protect your capital and
                    ensure long-term success.
                  </p>
                  <p>
                    <span className="text-amber-500 font-medium">
                      Position Sizing:
                    </span>{" "}
                    Never risk more than a small percentage (typically 1-2%) of
                    your trading capital on any single trade.
                  </p>
                  <p>
                    <span className="text-amber-500 font-medium">
                      Stop-Loss Orders:
                    </span>{" "}
                    Automatically close positions at predetermined price levels
                    to limit potential losses.
                  </p>
                  <p>
                    <span className="text-amber-500 font-medium">
                      Risk-Reward Ratio:
                    </span>{" "}
                    Aim for trades where the potential reward is at least twice
                    the risk you're taking.
                  </p>
                </div>
                <Link
                  href="/learn/strategies"
                  className="mt-6 inline-flex items-center text-amber-500 hover:text-amber-400"
                >
                  Master risk management
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {!userData && (
          <section className="py-16 bg-zinc-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Ready to start your trading journey?
              </h2>
              <p className="mt-4 text-lg text-zinc-300">
                Join thousands of traders who are learning and practicing with
                our platform.
              </p>
              <div className="mt-8">
                <Link
                  href="/sign-up"
                  className="px-8 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-500 transition-colors font-medium text-lg"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </section>
        )}

        <footer className="bg-zinc-900 border-t border-zinc-800 mt-auto">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-1">
                <h3 className="text-xl font-semibold text-white">
                  Trade<span className="text-amber-500">Learner</span>
                </h3>
                <p className="mt-4 text-zinc-400 text-sm">
                  A comprehensive trading education platform where you can
                  learn, practice, and master trading strategies in a risk-free
                  environment.
                </p>
                <div className="mt-6 flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/harshilgandhi77/"
                    className="text-zinc-400 hover:text-white"
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
                    href="https://github.com/HarshilGandhi7"
                    className="text-zinc-400 hover:text-white"
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
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
