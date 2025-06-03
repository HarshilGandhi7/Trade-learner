import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const getPortfolio = async (userId: string) => {
    const useRef=doc(db, "users", userId);
    const userSnap= await getDoc(useRef);
    const userData= userSnap.data();
    if (!userData) {
        return [];
    }
    if (!userData.portfolio || userData.portfolio.length === 0) {
        return [];
    } else {
        return userData.portfolio.sort((a: any, b: any) => b.lastUpdated - a.lastUpdated);
    }
}