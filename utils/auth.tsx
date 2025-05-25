import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";

export const RegisterUser = async (
  username: string,
  email: string,
  password: string
) => {
  if (!username || !email || !password) {
    return new Response(
      JSON.stringify({ success: false, error: "All fields are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const usernameExists = await usernameExisits(username);
    if (usernameExists) {
      return new Response(
        JSON.stringify({ success: false, error: "Username already exists" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.uid);

    await updateProfile(user, {
      displayName: username,
    });
    await setDoc(userDocRef, {
      uid: user.uid,
      username: username,
      email: email,
      createdAt: new Date().toISOString(),
    });
    return new Response(
      JSON.stringify({
        success: true,
        user: { uid: user.uid, username, email },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to create user" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const usernameExisits = async (username: string) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  let exists = false;
  querySnapshot.forEach((doc) => {
    if (doc.data().username === username) {
      exists = true;
    }
  });
  return exists;
};

export const loginUser = async (email: string, password: string) => {
  const authCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = authCredential.user;
  if (user) {
    setCookie({ userData: { uid: user.uid, email } });
    return new Response(
      JSON.stringify({ success: true, user: { uid: user.uid, email } }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({ success: false, error: "Failed to login user" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

type UserData = {
  uid: string;
  email: string;
};

export const setCookie = async ({ userData }: { userData: UserData }) => {
  Cookies.set("user", JSON.stringify(userData), { expires: 7 });
};
