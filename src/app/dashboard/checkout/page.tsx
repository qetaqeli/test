"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const challengeInfo = [
  { label: "Max Daily Drawdown", phase1: "4%", funded: "4%" },
  { label: "Max Drawdown", phase1: "8%", funded: "8%" },
  { label: "Profit Target", phase1: "10%", funded: "-" },
  { label: "Consistency Rule", phase1: "On Funded", funded: "Yes" },
  { label: "Min Trading Days", phase1: "-", funded: "-" },
  { label: "Leverage", phase1: "1:100", funded: "1:30" },
  { label: "Profit Split", phase1: "-", funded: "50/50 → 70/30 → 80/20" },
  { label: "Payout Request", phase1: "-", funded: "14 Days" },
];

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const size = searchParams.get("size") || "";
  const price = searchParams.get("price") || "";

  const [provider, setProvider] = useState<"cryptomus" | "nowpayments" | null>(null);
  const [option, setOption] = useState<"usdt" | "btc" | "eth" | null>(null);

  const handlePayment = async () => {
    if (!provider) return alert("Select a payment provider");

    const res = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, type, size, price, option }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert("Error: " + JSON.stringify(data));
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <p className="text-lg font-semibold mb-2">
          {size} {type === "instant" ? "Instant Funded" : "1-Step Challenge"}
        </p>
        <p className="text-greenGlow text-xl font-bold">{price}</p>
      </div>

      <div className="bg-dark rounded-xl p-4 mb-6">
        <h3 className="text-white font-semibold mb-2">
          {type === "instant" ? "Instant Funded" : "1-Step Challenge"} Details
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-white/60">
              <th className="py-2"></th>
              <th className="py-2">Phase 1</th>
              <th className="py-2">Funded</th>
            </tr>
          </thead>
          <tbody>
            {challengeInfo.map((info) => (
              <tr key={info.label} className="border-t border-border">
                <td className="py-2 text-white/80">{info.label}</td>
                <td className="py-2 text-white text-center">{info.phase1}</td>
                <td className="py-2 text-white text-center">{info.funded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-3">Select Payment</h2>
      <div className="space-y-3">
        <button
          onClick={() => setProvider("cryptomus")}
          className={`w-full py-3 rounded-full font-semibold border ${
            provider === "cryptomus" ? "bg-greenGlow text-black" : "border-greenGlow text-greenGlow hover:bg-greenGlow/10"
          }`}
        >
          Pay with Cryptomus
        </button>
        <button
          onClick={() => setProvider("nowpayments")}
          className={`w-full py-3 rounded-full font-semibold border ${
            provider === "nowpayments" ? "bg-greenGlow text-black" : "border-greenGlow text-greenGlow hover:bg-greenGlow/10"
          }`}
        >
          Pay with NOWPayments
        </button>
      </div>

      {provider === "nowpayments" && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {["usdt", "btc", "eth"].map((opt) => (
            <button
              key={opt}
              onClick={() => setOption(opt as any)}
              className={`py-2 rounded-full border ${
                option === opt ? "bg-greenGlow text-black" : "border-greenGlow text-greenGlow hover:bg-greenGlow/10"
              }`}
            >
              {opt.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-greenGlow text-black font-semibold py-3 rounded-full hover:opacity-90"
      >
        Continue to Payment
      </button>
    </div>
  );
}
