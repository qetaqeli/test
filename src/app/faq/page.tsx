"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-24 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h1>

        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-emerald-400">What is Atomic Funding?</h2>
            <p className="text-gray-300">
              Atomic Funding is a prop trading firm built for serious traders. We provide instant capital, no-challenge models, and support EA + HFT trading.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-emerald-400">Is there a challenge or evaluation phase?</h2>
            <p className="text-gray-300">
              No — we offer instant funding with no challenge or evaluation. Once you purchase a plan, you're funded immediately.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-emerald-400">Do you allow expert advisors or HFT bots?</h2>
            <p className="text-gray-300">
              Yes! We support high-frequency trading, scalping, and fully automated strategies. We partner with premium brokers that allow this.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-emerald-400">What broker do you use?</h2>
            <p className="text-gray-300">
              We're currently integrating with top-tier regulated brokers to ensure optimal execution speed and liquidity for all our traders.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-emerald-400">When will you launch?</h2>
            <p className="text-gray-300">
              We're launching very soon. Join our early access list to get 25% off and be notified the moment we go live.
            </p>
          </div>

          {/* ✅ New Section: Rules & Guidelines */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-emerald-400">What are the trading rules at Atomic Funding?</h2>
            <div className="text-gray-300">
              <p>To ensure fairness and risk control, traders must follow these basic rules:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>✅ No daily drawdown greater than 4%</li>
                <li>✅ No total drawdown greater than 8%</li>
                <li>✅ Payouts start 7 days after first trade, then bi-weekly</li>
                <li>✅ EAs and HFT are fully allowed</li>
                <li>✅ Holding trades over weekend is permitted</li>
                <li>✅ You must not manipulate price feeds, use copy-trading from challenge accounts, or engage in arbitrage</li>
              </ul>
              <p className="mt-4">
                Violating these rules may result in account termination without refund. Always trade responsibly.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
