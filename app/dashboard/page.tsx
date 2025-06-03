"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChangePassword } from "../components/Settings/ChangePassword";
import { TransactionHistory } from "../components/Transactions/TransactionHistory";
import { Portpolio } from "../components/Portfolio/portfolio";
import { Overview } from "../components/Overview/overview";

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
          {activeTab === "overview" && userData &&  (
          <Overview userId={userData?.uid.toString()}/>
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
