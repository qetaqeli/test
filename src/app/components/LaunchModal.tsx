// src/components/LaunchModal.tsx

"use client";
import { Dialog } from "@headlessui/react";
import { useState, Dispatch, SetStateAction } from "react";

interface LaunchModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LaunchModal({ isOpen, setIsOpen }: LaunchModalProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Thank you! You’ll be notified at launch.");
        setEmail("");
      } else {
        setMessage("❌ Failed to subscribe. Please try again.");
      }
    } catch {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-[#0f172a] p-6 text-white shadow-xl border border-white/10 animate-fadeIn">
          <Dialog.Title className="text-2xl font-bold mb-4">
            Claim 25% & Get Notified
          </Dialog.Title>
          <p className="text-sm text-gray-300 mb-4">
            Enter your email to get a 25% discount and early access.
          </p>
          {message ? (
            <p className="text-center mt-4 text-sm font-medium text-emerald-400">{message}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded bg-[#1e293b] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-400 text-black font-semibold py-2 rounded hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Get Notified"}
              </button>
            </form>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
