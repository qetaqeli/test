// src/app/dashboard/affiliate/page.tsx
"use client";

import { useState } from "react";

export default function AffiliatePage() {
  const [tab, setTab] = useState<"clients" | "payout">("clients");

  return (
    <div className="p-6 text-white relative min-h-screen bg-no-repeat bg-right bg-contain"
      style={{ backgroundImage: "url('/astronaut.png')" }}>
      <h1 className="text-2xl font-bold mb-4">Affiliate Section</h1>
      <p className="text-sm text-white/60 mb-6">
        You Can See Your Affiliate Information From Here.
      </p>

      {/* Top Metrics */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border p-4 rounded-xl">
          <div className="text-sm text-white/60 mb-1">Referrals</div>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl">
          <div className="text-sm text-white/60 mb-1">Referrals Buy Plan</div>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl">
          <div className="text-sm text-white/60 mb-1">Conversion Rate</div>
          <div className="text-2xl font-bold">0.00%</div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl">
          <div className="text-sm text-white/60 mb-1">Next Payout Eligibility</div>
          <div className="text-2xl font-bold">0 days</div>
        </div>
      </div>

      {/* Right Buttons */}
      <div className="flex gap-3 flex-wrap justify-end mb-4">
        <button className="px-4 py-1 rounded-full text-sm font-semibold bg-white/10 text-white hover:bg-white/20">
          Affiliate Code
        </button>
        <button className="px-4 py-1 rounded-full text-sm font-semibold bg-greenGlow text-black">
          View Milestone
        </button>
        <button className="px-4 py-1 rounded-full text-sm font-semibold bg-yellow-400 text-black">
          Request Withdrawal
        </button>
        <button className="px-4 py-1 rounded-full text-sm font-semibold bg-blue-500 text-white">
          Refresh Data
        </button>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("clients")}
          className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
            tab === "clients"
              ? "bg-greenGlow text-black"
              : "bg-border text-white hover:bg-greenGlow/10"
          }`}
        >
          Clients Referred
        </button>
        <button
          onClick={() => setTab("payout")}
          className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
            tab === "payout"
              ? "bg-greenGlow text-black"
              : "bg-border text-white hover:bg-greenGlow/10"
          }`}
        >
          Payout Request
        </button>
      </div>

      {/* Data Panel */}
      <div className="bg-card border border-border rounded-xl p-6 text-center text-white/60">
        No data available right now
      </div>
    </div>
  );
}
