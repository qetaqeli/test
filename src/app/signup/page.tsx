"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function SignupPage() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShowSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          surname,
          country,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setShowSuccess(true);
      // Optional: Clear form fields after success
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setSurname("");
      setCountry("");
      // Redirect after a delay (optional)
      // setTimeout(() => router.push("/dashboard"), 3000);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: 'url("/bg-space.png")' }}
    >
      {/* Success alert */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg z-50">
          Verification link sent to your email.
        </div>
      )}

      <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-[#1c1f1e] text-white relative z-10">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 text-black rounded-full w-12 h-12 flex items-center justify-center text-2xl">
            <span>👤</span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-1">Create account</h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Please fill all fields to create your account.
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 rounded-lg bg-[#0F0F0F] border border-[#1c1f1e]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 rounded-lg bg-[#0F0F0F] border border-[#1c1f1e]"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Country"
            className="w-full px-4 py-3 rounded-lg bg-[#0F0F0F] border border-[#1c1f1e]"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-[#0F0F0F] border border-[#1c1f1e]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-[#0F0F0F] border border-[#1c1f1e]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-lg bg-[#0F0F0F] border border-[#1c1f1e]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-400 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/login" className="text-green-400 hover:underline text-sm">
            Already have an account? Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
