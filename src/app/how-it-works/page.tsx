"use client";

import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-24 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">How It Works</h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12">
          Start trading with instant capital in just a few easy steps — no challenge required.
        </p>

        {/* Visual Section */}
        <div className="flex justify-center mb-16">
          <Image
            src="/how-it-works.png" // Replace this with your actual image path
            alt="How Atomic Funding Works"
            width={800}
            height={450}
            className="rounded-xl border border-white/10 shadow-lg"
          />
        </div>

        {/* Step-by-step Section */}
        <div className="grid sm:grid-cols-3 gap-10 text-left">
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-emerald-400 mb-2">Step 1: Choose Your Plan</h3>
            <p className="text-gray-300">
              Select the instant funding plan that fits your trading goals and capital size.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-emerald-400 mb-2">Step 2: Get Funded Instantly</h3>
            <p className="text-gray-300">
              No challenge, no delay. Access your funded trading account the moment you sign up.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-emerald-400 mb-2">Step 3: Trade & Get Paid</h3>
            <p className="text-gray-300">
              Trade with freedom — use EAs or HFT. Get paid bi-weekly with 70% profit share.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <a
            href="/"
            className="inline-block bg-emerald-400 text-black font-semibold px-6 py-3 rounded-full hover:opacity-90"
          >
            Get Started Now
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
