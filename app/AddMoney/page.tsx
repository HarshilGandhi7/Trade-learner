"use client";

import React, { useState, useEffect } from "react";
import { getCookie } from "@/utils/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserData } from "../types";
import Script from "next/script";
import { addCreditsToUser } from "@/utils/addCredits";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const AddMoneyPage = () => {
  const [amount, setAmount] = useState<number>(400);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState(null as UserData | null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handleScriptLoad = () => {
    if (scriptLoaded) return;
    setScriptLoaded(true);
  };

  useEffect(() => {
    const user = getCookie();
    if (!user) {
      toast.error("Please log in to continue");
      router.push("/sign-in");
    }
    setUserData(user);
    handleScriptLoad();
  }, [router]);

  const getCreditsAmount = (paymentAmount: number) => {
    return Math.floor((paymentAmount * 1000) / 83);
  };

  const handlePurchase = async () => {
    const amountPaisa = amount * 100;
    try {
      const orderResponse = await fetch("/api/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountPaisa,
          currency: "INR",
          receipt: "order-receipt_" + Date.now(),
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderData.success) {
        toast.error("Failure in payment procedure. Please try again later. ");
        return;
      }

      var options = {
        key: process.env.NEXT_PUBLIC_KEY_ID,
        amount: amountPaisa,
        currency: "INR",
        name: "Trade Learner",
        description: `Purchase ${getCreditsAmount(amount)} Credits`,
        image: "logo.png",
        order_id: orderData.data.id,
        handler: function (response: any) {
          addCredits(response);
        },
        prefill: {
          name: userData?.username,
          email: userData?.email,
        },
        theme: {
          color: "#F59E0B",
        },
      };

      var rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response: any) {
        toast.error(` ${response.error.description}`);
        return;
      });

      async function addCredits(response: any) {
        setIsProcessing(true);
        const success = await addCreditsToUser({
          uid: userData?.uid || "",
          credits: getCreditsAmount(amount),
        });
        if (success) {
          toast.success(
            `Successfully added ${getCreditsAmount(amount)} credits!`
          );
          router.push("/dashboard");
        } else {
          toast.error("Failed to add credits. Please try again later.");
        }
        setIsProcessing(false);
      }
      rzp1.open();
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate payment. Please try again later.");
      return;
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen py-12">
      <div className="max-w-md mx-auto bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-white mb-6">Add Credits</h1>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-amber-600/20 flex items-center justify-center mr-3">
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
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-medium text-white">
                  Purchase Credits
                </h2>
                <p className="text-zinc-400 text-sm">
                  Get more credits to continue trading
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Select Amount (INR)
              </label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[400, 800, 2000, 4000, 8000].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value)}
                    className={`py-3 px-4 rounded-md border ${
                      amount === value
                        ? "border-amber-500 bg-amber-600/20 text-white"
                        : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                    }`}
                  >
                    <div className="font-medium">₹{value}</div>
                    <div className="text-xs">
                      {getCreditsAmount(value)} credits
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-700/30 p-4 rounded-md border border-zinc-700">
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">You will receive:</span>
                <span className="font-medium text-white">
                  {getCreditsAmount(amount)} credits
                </span>
              </div>
            </div>


            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {isProcessing
                ? "Processing..."
                : `Purchase ${getCreditsAmount(amount)} Credits`}
            </button>
          </div>
        </div>
      </div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={handleScriptLoad}
      />
    </div>
  );
};

export default AddMoneyPage;
