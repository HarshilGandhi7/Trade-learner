"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { getCookie, RegisterUser } from "@/utils/auth";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router= useRouter();

  useEffect(()=>{
      const checkLogin = async () => {
        const userCookie = getCookie();
        if (userCookie) {
          router.push("/");
        } 
      }
      checkLogin();
  },[router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const signInResponse = await RegisterUser(username, email, password);
    const data = await signInResponse.json();
    if(data?.success) {
        toast.success("Account created successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }else{
        setError(data?.error);
        toast.error("Failed to create account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-zinc-800 p-8 rounded-xl shadow-lg border border-zinc-700">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Join our trading platform
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-zinc-300"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-zinc-600 
              placeholder-zinc-500 text-white bg-zinc-700 focus:outline-none focus:ring-2 
              focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-zinc-600 
              placeholder-zinc-500 text-white bg-zinc-700 focus:outline-none focus:ring-2 
              focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-zinc-600 
              placeholder-zinc-500 text-white bg-zinc-700 focus:outline-none focus:ring-2 
              focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-zinc-300"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-zinc-600 
              placeholder-zinc-500 text-white bg-zinc-700 focus:outline-none focus:ring-2 
              focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
              text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-amber-400 hover:text-amber-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
