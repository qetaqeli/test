"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useSupabaseClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get the access token from the URL query string
  const accessToken = searchParams.get("access_token") || "";

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!accessToken) {
      setError("Invalid or missing reset token.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
      // Supabase expects the access_token in the header, so we’ll pass it in the client config:
      // But since we can’t pass token here directly, Supabase auth helpers automatically detect token in URL during reset flow
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password has been reset successfully. Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg-space.png")' }}
    >
      <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-[#1c1f1e] text-white shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">Reset Password</h2>

        <form onSubmit={handleReset} className="space-y-5">
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-5 py-3 rounded-lg bg-[#0F0F0F] border border-[#1c1f1e] focus:outline-none focus:border-green-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-5 py-3 rounded-lg bg-[#0F0F0F] border border-[#1c1f1e] focus:outline-none focus:border-green-400 transition"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-400 text-sm text-center">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-400 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
