import { db } from "@/firebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Processing transaction request...");
  const { userId, transactionType, asset, quantity, price } = await req.json();
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const user = userSnap.data();
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 404,
      });
    }

    const userBalance = user.credits || 0;
    const transactionValue = quantity * price;

    const transaction = {
      type: transactionType,
      symbol: asset.symbol,
      name: asset.name,
      quantity: parseFloat(quantity),
      price: price,
      total: transactionValue,
      timestamp: Date.now(),
      date: new Date().toISOString(),
    };

    if (transactionType === "buy") {
      let newBalance;
      if (userBalance >= transactionValue) {
        newBalance = userBalance - transactionValue;

        const portfolio = user.portfolio || [];

        const exisitingAssetIndex = portfolio.findIndex(
          (item: any) => item.symbol === asset.symbol
        );
        let newPortfolio = [...portfolio];

        if (exisitingAssetIndex >= 0) {
          newPortfolio[exisitingAssetIndex] = {
            ...newPortfolio[exisitingAssetIndex],
            quantity:
              newPortfolio[exisitingAssetIndex].quantity + parseFloat(quantity),
            avgPrice:
              (newPortfolio[exisitingAssetIndex].avgPrice *
                newPortfolio[exisitingAssetIndex].quantity +
                transactionValue) /
              (newPortfolio[exisitingAssetIndex].quantity +
                parseFloat(quantity)),
            lastUpdated: new Date().toISOString(),
          };
        } else {
          newPortfolio.push({
            symbol: asset.symbol,
            name: asset.name,
            quantity: parseFloat(quantity),
            avgPrice: price,
            firstPurchased: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
          });
        }

        const amountInvested = user.amountInvested || 0;
        const newAmountInvested = amountInvested + transactionValue;
        await updateDoc(userRef, {
          credits: newBalance,
          amountInvested: newAmountInvested,
          portfolio: newPortfolio,
          transactions: arrayUnion(transaction),
        });

        return NextResponse.json({
          success: true,
          message: "Transaction successful",
          status: 200,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Insufficient balance",
          status: 400,
        });
      }
    } else if (transactionType === "sell") {
      const portfolio = user.portfolio || [];
      const exisitingAssetIndex = portfolio.findIndex(
        (item: any) => item.symbol === asset.symbol
      );
      let newPortfolio = [...portfolio];

      if (exisitingAssetIndex >= 0) {
        if (parseFloat(quantity) <= portfolio[exisitingAssetIndex].quantity) {
          const assetToSell = portfolio[exisitingAssetIndex];
          const newQuantity = assetToSell.quantity - parseFloat(quantity);
          const newBalance = userBalance + transactionValue;

          if (newQuantity > 0) {
            newPortfolio[exisitingAssetIndex] = {
              ...assetToSell,
              quantity: newQuantity,
              lastUpdated: new Date().toISOString(),
            };
          } else {
            newPortfolio.splice(exisitingAssetIndex, 1);
          }

          await updateDoc(userRef, {
            credits: newBalance,
            portfolio: newPortfolio,
            transactions: arrayUnion(transaction),
          });

          return NextResponse.json({
            success: true,
            message: "Transaction successful",
            status: 200,
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "Asset not sufficient in portfolio",
            status: 404,
          });
        }
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid transaction type",
        status: 400,
      });
    }
  } catch (error) {
    console.error("Error processing transaction:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while processing the transaction",
      status: 500,
    });
  }
}
