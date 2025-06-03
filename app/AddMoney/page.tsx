"use client";

import React, { useState, useEffect } from "react";
import { getCookie } from "@/utils/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddMoneyPage = () => {
  const [amount, setAmount] = useState<number>(400);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const user = getCookie();
    if (!user) {
      toast.error("Please log in to continue");
      router.push("/sign-in");
    }
  }, [router]);
  
  const getCreditsAmount = (paymentAmount: number) => {
    return Math.floor(paymentAmount * 1000 / 83);
  };
  
  const handlePurchase = async () => {
    // Implementation will be added after hosting
    toast.success("This feature will be available soon!");
  };

  return (
    <div className="bg-zinc-900 min-h-screen py-12">
      <div className="max-w-md mx-auto bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-white mb-6">Add Credits</h1>
          
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-amber-600/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-medium text-white">Purchase Credits</h2>
                <p className="text-zinc-400 text-sm">Get more credits to continue trading</p>
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
                        ? 'border-amber-500 bg-amber-600/20 text-white' 
                        : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                    }`}
                  >
                    <div className="font-medium">₹{value}</div>
                    <div className="text-xs">{getCreditsAmount(value)} credits</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-zinc-700/30 p-4 rounded-md border border-zinc-700">
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">You will receive:</span>
                <span className="font-medium text-white">{getCreditsAmount(amount)} credits</span>
              </div>
            </div>
            
            <div className="bg-blue-900/20 p-3 rounded-md border border-blue-800 text-blue-300 text-sm">
              <div className="font-medium mb-1">Coming Soon</div>
              <p>Payment processing will be available after deployment.</p>
            </div>
            
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : `Purchase ${getCreditsAmount(amount)} Credits`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMoneyPage;