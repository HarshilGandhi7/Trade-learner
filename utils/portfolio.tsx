import { PortfolioData } from "@/app/types";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const getPortfolio = async (userId: string) => {
  const useRef = doc(db, "users", userId);
  const userSnap = await getDoc(useRef);
  const userData = userSnap.data();
  if (!userData) {
    return [];
  }
  if (!userData.portfolio || userData.portfolio.length === 0) {
    return [];
  } else {
    return userData.portfolio.sort(
      (a: any, b: any) => b.lastUpdated - a.lastUpdated
    );
  }
};

export const getAmountLeft = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  return (parseFloat(userData?.credits) || 0).toFixed(2);
};


export const getTotals = async ({ userId }: { userId: string }) => {
  const portfolio = await getPortfolio(userId);
  const Price = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/current/data/all`
  );
  const priceData = await Price.json();
  let totalInvested = 0;
  let totalCurrentValue = 0;
 await portfolio.forEach((asset: PortfolioData) => {
    const price = priceData.data[asset.symbol] || asset.avgPrice;
    totalInvested += asset.quantity * asset.avgPrice;
    totalCurrentValue += asset.quantity * price;
  });
  const totalProfitLoss = totalCurrentValue - totalInvested;
  const totalProfitLossPercent =
    totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

  return {
    totalInvested,
    totalCurrentValue,
    totalProfitLoss,
    totalProfitLossPercent,
  };
};
