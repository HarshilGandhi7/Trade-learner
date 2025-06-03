"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChangePassword } from "../components/Settings/ChangePassword";
import { TransactionHistory } from "../components/Transactions/TransactionHistory";
import { Portpolio } from "../components/Portfolio/portfolio";

interface UserData {
  uid: string;
  email: string;
  username: string;
}

const DashboardPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      const userCookie = Cookies.get("user");

      if (!userCookie) {
        toast.error("Please sign in to access your dashboard");
        router.push("/sign-in");
        return;
      }

      try {
        const parsedUser = JSON.parse(userCookie);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        toast.error("Authentication error");
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="animate-pulse text-amber-500 text-xl">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-zinc-700 pb-5">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-zinc-400">
            Welcome back, {userData?.username || "Trader"}
          </p>
        </div>

        {/* Dashboard navigation tabs */}
        <div className="mt-6 border-b border-zinc-700">
          <div className="flex space-x-8">
            {["overview", "portfolio", "transactions", "settings"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 text-sm font-medium ${
                    activeTab === tab
                      ? "text-amber-500 border-b-2 border-amber-500"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Main content area */}
        <div className="mt-8">
          {activeTab === "overview" && (
            <>
              {/* Account Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
                  <h3 className="text-zinc-400 text-sm mb-2">
                    Portfolio Value
                  </h3>
                  <div className="text-3xl text-white font-bold">
                    $15,245.65
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-green-500 text-sm font-medium">
                      +2.45%
                    </span>
                    <span className="text-zinc-500 text-xs ml-2">Last 24h</span>
                  </div>
                </div>

                <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
                  <h3 className="text-zinc-400 text-sm mb-2">Available Cash</h3>
                  <div className="text-3xl text-white font-bold">$4,210.00</div>
                  <div className="mt-2">
                    <span className="text-zinc-500 text-xs">
                      Ready to invest
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
                  <h3 className="text-zinc-400 text-sm mb-2">
                    Total Profit/Loss
                  </h3>
                  <div className="text-3xl text-green-500 font-bold">
                    +$1,456.22
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-green-500 text-sm font-medium">
                      +10.3%
                    </span>
                    <span className="text-zinc-500 text-xs ml-2">All time</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-zinc-800 rounded-lg border border-zinc-700 mb-8">
                <div className="p-6 border-b border-zinc-700">
                  <h2 className="text-lg font-medium text-white">
                    Recent Activity
                  </h2>
                </div>
                <div className="divide-y divide-zinc-700">
                  {[
                    {
                      type: "buy",
                      asset: "Bitcoin (BTC)",
                      amount: "0.025",
                      value: "$750.00",
                      date: "Today, 10:45 AM",
                    },
                    {
                      type: "sell",
                      asset: "Ethereum (ETH)",
                      amount: "1.5",
                      value: "$1,250.75",
                      date: "Yesterday, 3:30 PM",
                    },
                    {
                      type: "deposit",
                      asset: "USD",
                      amount: "$2,000.00",
                      value: "$2,000.00",
                      date: "May 30, 2025",
                    },
                  ].map((activity, i) => (
                    <div
                      key={i}
                      className="p-6 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === "buy"
                              ? "bg-green-500/20"
                              : activity.type === "sell"
                              ? "bg-red-500/20"
                              : "bg-blue-500/20"
                          }`}
                        >
                          <span
                            className={`text-lg ${
                              activity.type === "buy"
                                ? "text-green-500"
                                : activity.type === "sell"
                                ? "text-red-500"
                                : "text-blue-500"
                            }`}
                          >
                            {activity.type === "buy"
                              ? "+"
                              : activity.type === "sell"
                              ? "-"
                              : "$"}
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="text-white font-medium">
                            {activity.type === "deposit"
                              ? "Deposited Funds"
                              : `${
                                  activity.type === "buy" ? "Bought" : "Sold"
                                } ${activity.asset}`}
                          </p>
                          <p className="text-zinc-500 text-sm">
                            {activity.amount}{" "}
                            {activity.type !== "deposit" &&
                              `@ ${activity.value}`}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-zinc-400 text-sm text-right">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 text-center">
                  <button className="text-amber-500 hover:text-amber-400 text-sm font-medium">
                    View All Activity
                  </button>
                </div>
              </div>

              {/* Portfolio Distribution */}
              <div className="bg-zinc-800 rounded-lg border border-zinc-700">
                <div className="p-6 border-b border-zinc-700">
                  <h2 className="text-lg font-medium text-white">
                    Portfolio Distribution
                  </h2>
                </div>
                <div className="p-6">
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64 bg-zinc-900 rounded-lg flex items-center justify-center">
                      <p className="text-zinc-500">Asset Distribution Chart</p>
                    </div>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Bitcoin (BTC)",
                          value: "45%",
                          color: "bg-amber-500",
                        },
                        {
                          name: "Ethereum (ETH)",
                          value: "30%",
                          color: "bg-blue-500",
                        },
                        {
                          name: "Solana (SOL)",
                          value: "15%",
                          color: "bg-purple-500",
                        },
                        { name: "Cash", value: "10%", color: "bg-green-500" },
                      ].map((asset, i) => (
                        <div key={i} className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${asset.color}`}
                          ></div>
                          <span className="ml-2 text-white">{asset.name}</span>
                          <span className="ml-auto text-zinc-400">
                            {asset.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "portfolio" && userData &&  (
            <Portpolio userId={userData?.uid.toString()} />
          )}

          {activeTab === "transactions" && userData && (
            <TransactionHistory userId={userData.uid.toString()} />
          )}

          {activeTab === "settings" && userData && (
            <ChangePassword userData={userData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
