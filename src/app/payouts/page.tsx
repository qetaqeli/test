"use client";

import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PayoutsShowcase() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Block */}
          <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-700 p-10 shadow-inner text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">Join the new era of funding account</h2>
              <p className="text-white/90 leading-relaxed">
                Funded accounts are a monetized demo account with a <span className="text-white font-semibold">70% lifetime profit split</span> — 
                we are now scaling 50, 70, 80 with 1-step and 75% lifetime with Eden VIP.
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <Image
  src="/shield-icon.png"
  alt="Shield Icon"
  width={300}
  height={300}
  className="object-contain mx-auto"
  
/>
<div className="flex justify-center items-center py-8">
  {/* image goes here */}
</div>
            </div>
          </div>

          {/* Right Block */}
          <div className="bg-[#101418] rounded-3xl p-8 space-y-6">
            <h3 className="text-2xl font-bold mb-4">Fast & Reliable Payouts</h3>
<div className="bg-black/30 p-6 rounded-xl flex justify-center">
  <Image
    src="/piggybank.png" // Make sure the file name matches what you uploaded
    alt="Fast payout visual"
    width={450} // increase width
    height={250} // maintain proportion
    className="rounded-lg object-contain"
  />
</div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="w-full bg-emerald-400 text-black font-semibold py-3 rounded-full hover:opacity-90 transition">
                More Payouts
              </button>
              <button className="w-full bg-white/10 text-white font-semibold py-3 rounded-full hover:bg-white/20 transition">
                Join Atomic
              </button>
            </div>

            {/* Upgrades Block */}
            <div className="bg-black/40 rounded-xl p-6 mt-6">
              <div className="bg-emerald-400 text-black px-4 py-1 rounded-t-xl inline-block text-sm font-semibold mb-4">
                Upgrades
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 text-sm">
                  ✅ Huge Profit Splits
                </li>
                <li className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 text-sm">
                  ✅ HFT Allowed To Pass
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
<section className="w-full bg-[#0A0F1A] mt-12 py-10">
  <div className="max-w-5xl mx-auto px-6 text-center">
    <h3 className="text-white text-2xl md:text-3xl font-semibold mb-4">
      Why Choose Atomic Funding?
    </h3>
    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
      At Atomic Funding, we believe in speed, freedom, and fairness. Our instant funding model lets you trade using EAs, scalping, or HFT — with no restrictions and no unnecessary delays.
      Enjoy bi-weekly payouts, up to 80% profit split, and a smooth MetaTrader 5 experience powered by top-tier brokers.
    </p>
  </div>
</section>

      <Footer />
    </div>
  );
}
