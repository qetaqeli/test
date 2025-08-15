"use client";

import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password/update`, // Redirect after password reset link clicked
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset email sent. Please check your inbox.");
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

      {/* Reset form container */}
      <div className="relative z-10 w-full max-w-md bg-black/70 backdrop-blur-lg rounded-2xl p-8 border border-[#1c1f1e] text-white shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">Reset Password</h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-5 py-3 rounded-lg bg-[#0F0F0F] border border-[#1c1f1e] focus:outline-none focus:border-green-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-400 transition"
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-green-400 hover:underline text-sm">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
