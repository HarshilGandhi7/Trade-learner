import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const addCreditsToUser = async ({
  uid,
  credits,
}: {
  uid: string;
  credits: number;
}) => {
  if (!uid || !credits || credits <= 0) {
    console.log("Invalid user ID or credits");
    return false;
  }
  const UserRef = doc(db, "users", uid);
  if (!UserRef) {
    console.log("User reference not found");
    return false;
  }
  const userSnap = await getDoc(UserRef);
  if (!userSnap.exists()) {
    console.log("User document does not exist");
    return false;
  }
  const userData = userSnap.data();
  if (!userData) {
    console.log("User not found");
    return false;
  }
  const currrentCredits = userData.credits || 0;
  const updatedCredits = currrentCredits + credits;
  await updateDoc(UserRef, { credits: updatedCredits });

  const newTransaction = {
    data: new Date().toISOString(),
    name: "Credit Purchase",
    price: "",
    quantity: credits,
    symbol: "CRD",
    timestamp: new Date().getTime(),
    total: credits,
    type: "Add credits",
  };

  const transactions = userData.transactions || [];
  await updateDoc(UserRef, { transactions: [...transactions, newTransaction] });
  return true;
};
