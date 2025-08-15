// src/app/dashboard/new-challenge/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const plans = {
  "1-step": [
    { size: "50K", price: "$299" },
    { size: "100K", price: "$649" },
    { size: "200K", price: "$949" },
    { size: "300K", price: "$1459" },
  ],
  instant: [
    { size: "50K", price: "$399" },
    { size: "100K", price: "$799" },
    { size: "200K", price: "$1099" },
    { size: "300K", price: "$1599" },
  ],
};

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

export default function NewChallengePage() {
  const [mode, setMode] = useState<"1-step" | "instant">("1-step");
  const [selected, setSelected] = useState("50K");

  const availablePlans = plans[mode];
  const currentPlan =
    availablePlans.find((p) => p.size === selected) || availablePlans[0];

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold text-greenGlow mb-2">
        Find Your Perfect <span className="text-white">Forex Plan</span>
      </h1>
      <p className="text-sm text-white/60 mb-6">
        Flexible Pricing Tailored To Your Needs, From Starting Out To Scaling Up.
      </p>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left Card */}
        <div className="bg-card border border-border p-6 rounded-2xl space-y-4">
          <div className="text-xl font-bold text-white">
            {currentPlan.size} Account
          </div>
          <div className="text-2xl text-greenGlow font-bold">
            {currentPlan.price}
            <span className="text-white text-sm font-normal"> /per activation</span>
          </div>

          {/* Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMode("1-step");
                setSelected(plans["1-step"][0].size);
              }}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                mode === "1-step"
                  ? "bg-greenGlow text-black"
                  : "bg-border text-white hover:bg-greenGlow/10"
              }`}
            >
              1-Step Challenge
            </button>
            <button
              onClick={() => {
                setMode("instant");
                setSelected(plans["instant"][0].size);
              }}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                mode === "instant"
                  ? "bg-greenGlow text-black"
                  : "bg-border text-white hover:bg-greenGlow/10"
              }`}
            >
              Instant Funding
            </button>
          </div>

          <button
  className="mt-4 w-full bg-greenGlow text-black font-semibold py-3 rounded-full shadow-green hover:opacity-90 transition"
  onClick={() =>
    window.location.href = `/dashboard/checkout?type=${mode}&size=${currentPlan.size}&price=${currentPlan.price}`
  }
>
  Next Step
</button>

          <Link href="/dashboard">
            <button className="w-full mt-4 border border-greenGlow text-greenGlow py-2 rounded-full hover:bg-greenGlow/10">
              ← Back to Dashboard
            </button>
          </Link>
        </div>

        {/* Right Panel */}
        <div className="bg-card border border-border p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">
              How much trading capital do you need?
            </h2>
            <span className="text-greenGlow font-bold text-lg">{currentPlan.size}</span>
          </div>

          {/* Plan selection */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {availablePlans.map((plan) => (
              <button
                key={plan.size}
                onClick={() => setSelected(plan.size)}
                className={`px-3 py-2 rounded-full font-semibold border text-sm transition-all ${
                  selected === plan.size
                    ? "bg-greenGlow text-black"
                    : "border-greenGlow text-greenGlow hover:bg-greenGlow/10"
                }`}
              >
                {plan.size}
              </button>
            ))}
          </div>

          {/* Info Table */}
          <div className="bg-dark rounded-xl p-4">
            <h3 className="text-white font-semibold mb-2">
              {mode === "1-step" ? "1-Step Challenge" : "Instant Funded"}
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
        </div>
      </div>

      {/* Payment logos */}
      <div className="flex items-center justify-around mt-10">
        <div className="text-center text-lg font-bold">VISA</div>
        <div className="text-center text-lg font-bold">💳</div>
        <div className="text-center text-lg font-bold bg-yellow-400 px-4 py-2 rounded-full text-black">
          Digital Currencies
        </div>
      </div>

      <p className="text-center text-white/60 text-sm mt-4">
        Traders who opt for Instant Funding are 6.2x more likely to receive a payout.
      </p>
    </div>
  );
}
