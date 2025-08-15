"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Login response data:", data);
      console.log("Login response error:", error);

      if (error) {
        setError(error.message);
      } else if (data.session) {
        // Successful login, redirect to dashboard
        router.push("/dashboard");
      } else {
        setError("Login failed: No session returned");
      }
    } catch (err) {
      setError("Unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: 'url("/bg-space.png")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Login form container */}
      <div className="relative z-10 w-full max-w-md bg-black/70 backdrop-blur-lg rounded-2xl p-8 border border-[#1c1f1e] text-white shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">Welcome back!</h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-5 py-3 rounded-lg bg-[#0F0F0F] border border-[#1c1f1e] focus:outline-none focus:border-green-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={loading}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full px-5 py-3 rounded-lg bg-[#0F0F0F] border border-[#1c1f1e] pr-12 focus:outline-none focus:border-green-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-3 text-green-400 text-sm font-semibold"
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="text-right text-sm">
            <Link href="/reset-password" className="text-green-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-400 transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/signup" className="text-green-400 hover:underline text-sm">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
