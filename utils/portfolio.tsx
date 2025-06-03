import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { PortfolioData } from "@/app/components/Portfolio/portfolio";

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

export const getAmountInvestedAndAmountLeft = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  return [
    (parseFloat(userData?.amountInvested) || 0).toFixed(2),
    (parseFloat(userData?.credits) || 0).toFixed(2),
  ];
};

export const getCurrentValue = async ({userId}:{userId:string}) => {
  const Portfolio = await getPortfolio(userId);
  const updatedPrice = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/current/data/all`
  );
  const priceData = await updatedPrice.json();
  const currentPrices = priceData.data;

  let totalValue = 0;
  Portfolio.forEach((item:PortfolioData) => {
    totalValue+= item.quantity * (currentPrices[item.symbol]);
  });


  return totalValue.toFixed(2);
};
