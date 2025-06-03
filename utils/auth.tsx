import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import {
  getAuth,
  EmailAuthProvider,
  updatePassword as firebaseUpdatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";

type UserData = {
  uid: string;
  email: string;
  username: string;
};


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
      credits: 10000,
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
    setCookie({
      userData: { username: user.displayName || "", uid: user.uid, email },
    });
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

export const setCookie = async ({ userData }: { userData: UserData }) => {
  Cookies.set("user", JSON.stringify(userData), { expires: 7 });
};

export const getCookie = () => {
  const userCookie = Cookies.get("user");
  if (userCookie) {
    return JSON.parse(userCookie) as UserData;
  }
  return null;
};

export const updatePassword = async (
  newPassword: string,
  currentPassword: string
) => {
  try {
    const user = auth.currentUser;
    if (!user?.email) {
      throw new Error("User email not found");
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    await reauthenticateWithCredential(user, credential);
    await firebaseUpdatePassword(user, newPassword);

    return new Response(JSON.stringify({ success: true }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error updating password:", error);

    if(error.code==='auth/invalid-credential'){
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid credentials provided",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    else if (error.code === "auth/wrong-password") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Incorrect current password",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else if (error.code === "auth/requires-recent-login") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please login again before changing your password",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unable to change your password",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
};
