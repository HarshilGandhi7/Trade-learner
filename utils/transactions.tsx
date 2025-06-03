import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const getTransactionHistory = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    if (!userData) {
      return [];
    }
    if (!userData || !userData.transactions) {
      return [];
    } else {
      return [...userData.transactions].sort(
        (a: any, b: any) => b.timestamp - a.timestamp
      );
    }
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return [];
  }
};


import { getCookie } from "@/utils/auth";
import toast from "react-hot-toast";

export interface TransactionParams {
  symbol: string;
  name: string;
  currentPrice: number;
  type: "buy" | "sell";
  quantity: string;
  setIsSubmitting?: (isSubmitting: boolean) => void;
}

export const executeTransaction = async ({
  symbol,
  name,
  currentPrice,
  type,
  quantity,
  setIsSubmitting
}: TransactionParams): Promise<boolean> => {
  if (
    !currentPrice ||
    !quantity ||
    isNaN(Number(quantity)) ||
    Number(quantity) <= 0
  ) {
    toast.error("Please enter a valid quantity.");
    return false;
  }

  if (setIsSubmitting) setIsSubmitting(true);
  const userCookie = getCookie();
  
  if (!userCookie?.uid) {
    toast.error("You must be logged in to make transactions.");
    if (setIsSubmitting) setIsSubmitting(false);
    return false;
  }

  try {
    const response = await fetch(`/api/transactions`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userCookie.uid,
        transactionType: type,
        asset: {
          symbol,
          name,
        },
        quantity,
        price: currentPrice,
      }),
    });

    if (setIsSubmitting) setIsSubmitting(false);

    if (!response.ok) {
      toast.error("Transaction failed. Please try again.");
      return false;
    }

    const responseData = await response.json();
    if (responseData.success) {
      toast.success(`Successfully ${type === 'buy' ? 'bought' : 'sold'} ${quantity} ${symbol}`);
      return true;
    } else {
      toast.error(responseData.message || "Transaction failed. Please try again.");
      return false;
    }
  } catch (error) {
    console.error("Transaction error:", error);
    toast.error("An error occurred while processing your transaction.");
    if (setIsSubmitting) setIsSubmitting(false);
    return false;
  }
};