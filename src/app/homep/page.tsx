"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AnimatedAtoms from "../components/AnimatedAtoms";
import FAQSection from "../components/FAQSection";

import {
  FaTelegramPlane,
  FaDiscord,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pricing tab state
  const [pricingTab, setPricingTab] = useState<"1step" | "instant">("instant");

  const ONE_STEP = [
    { capital: 50000, fee: 299 },
    { capital: 100000, fee: 649 },
    { capital: 200000, fee: 949 },
    { capital: 300000, fee: 1459 },
  ];
  const INSTANT = [
    { capital: 50000, fee: 399 },
    { capital: 100000, fee: 799 },
    { capital: 200000, fee: 1099 },
    { capital: 300000, fee: 1599 },
  ];
  const plans = pricingTab === "instant" ? INSTANT : ONE_STEP;

  const currency = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const ROWS: { label: string; value: (plan?: any) => React.ReactNode }[] = [
    { label: "Plan Name", value: () => (pricingTab === "instant" ? "Instant Funded" : "1-Step Challenge") },
    { label: "Minimum Trading Days", value: () => "5" },
    {
      label: "Extra 1 Rule",
      value: () => (
        <span className="text-sm leading-snug">
          • Must achieve <span className="font-semibold">≥ 1% net growth</span> to be eligible for payout.
        </span>
      ),
    },
    { label: "Profit Share", value: () => "70%" },
    { label: "Maximum Daily Loss", value: () => "4.00%" },
    { label: "Maximum Overall Loss", value: () => "8.00%" },
    { label: "Leverage", value: () => "1:100" },
    { label: "Conversion", value: () => "1 times" },
    {
      label: "Registration Fee",
      value: (plan) => <span className="font-semibold">{currency(plan.fee)} USD</span>,
    },
  ];

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-white bg-[#030712]">
      <AnimatedAtoms />

      {/* Header */}
      <header className="py-4 px-4 max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-white/5 rounded-full mt-4 text-white">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-base font-semibold tracking-wide">ATOMIC FUNDING</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm">
          <a href="/" className="hover:text-cyan-400">Home</a>
          <a href="/how-it-works" className="hover:text-cyan-400">How it Works</a>
          <a href="/payouts" className="hover:text-cyan-400">Payouts</a>
          <a href="#refer" className="hover:text-cyan-400">Refer & Earn</a>
          <a href="/faq" className="hover:text-cyan-400">FAQ</a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex space-x-2">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-1.5 text-sm rounded-full border border-emerald-400 hover:bg-emerald-400/10"
          >
            Enter the Portal
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-1.5 text-sm rounded-full border border-white/20 hover:bg-white/10"
          >
            Login
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden pl-2">
          <button onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <FaBars size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="bg-black/30 backdrop-blur-sm w-full h-full absolute inset-0"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs h-full bg-white/10 backdrop-blur-lg p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-end mb-4">
                <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                  <FaTimes size={22} />
                </button>
              </div>
              <nav className="flex flex-col space-y-4 text-white text-base">
                <a href="/" className="hover:text-cyan-400">Home</a>
                <a href="/how-it-works" className="hover:text-cyan-400">How it Works</a>
                <a href="#payouts" className="hover:text-cyan-400">Payouts</a>
                <a href="#refer" className="hover:text-cyan-400">Refer & Earn</a>
                <a href="/faq" className="hover:text-cyan-400">FAQ</a>
              </nav>
            </div>

            <div className="mt-10 space-y-3">
              <button
                onClick={() => router.push("/login")}
                className="w-full border border-emerald-400 rounded-full py-2 text-white hover:bg-emerald-400/10"
              >
                Enter the Portal
              </button>
              <button
                onClick={() => router.push("/login")}
                className="w-full border border-white/20 rounded-full py-2 text-white hover:bg-white/10"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Section */}
      <section className="p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Atomic Funding</h1>
        <p className="text-gray-400">
          Trade smarter. Get funded. Join our instant payout prop firm today.
        </p>
      </section>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 px-4">
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight drop-shadow-lg">
          TRADE SMARTER.<br /> TRADE ATOMIC.
        </h1>
        <p className="mt-6 text-gray-300 text-lg max-w-xl">
          Skip the nonsense. Instant funding. No delays.
        </p>
        <div className="mt-8 flex space-x-4">
          <button
            onClick={() => router.push("/signup")}
            className="bg-cyan-400 text-black font-semibold px-6 py-3 rounded-md hover:opacity-90"
          >
            START CHALLENGE
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="border border-cyan-400 px-6 py-3 rounded-md hover:bg-cyan-400 hover:text-black"
          >
            VIEW PRICING
          </button>
        </div>
      </section>

      {/* Section 2 – Get Funded Instantly */}
      <section className="max-w-6xl mx-auto text-center mt-32 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Get Funded Instantly.<br className="hidden sm:block" /> No Challenge. No Delay.
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          Manual trading on live capital — with 70% lifetime payout. <br /> EAs and HFT welcome in challenge accounts.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => router.push("/signup")}
            className="bg-emerald-400 text-black font-semibold px-6 py-3 rounded-md hover:opacity-90"
          >
            Get Funded Now
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="border border-emerald-400 px-6 py-3 rounded-md hover:bg-emerald-400 hover:text-black"
          >
            View Pricing
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {["Instant Funding", "70% Lifetime Payout", "EAs Allowed in Challenge", "Trusted Prop Firm"].map((title, i) => (
            <div key={i} className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-emerald-400 mb-2">{title}</h4>
              <p className="text-sm text-gray-300">
                {title === "Instant Funding" && "Get funded right away"}
                {title === "70% Lifetime Payout" && "Keep 70% of profits"}
                {title === "EAs Allowed in Challenge" && "Use expert advisors on challenges"}
                {title === "Trusted Prop Firm" && "A reliable firm for skilled traders"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION (Tabbed: 1-Step / Instant) */}
      <section className="w-full py-10 md:py-16 bg-gradient-to-br from-[#0b1420] via-[#0a0f16] to-black">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Pricing</h2>

            {/* Tabs */}
            <div className="inline-flex rounded-xl p-1 bg-white/10 border border-white/10">
              <button
                onClick={() => setPricingTab("1step")}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  pricingTab === "1step" ? "bg-white/90 text-black shadow" : "text-white/80 hover:text-white"
                }`}
              >
                1-Step
              </button>
              <button
                onClick={() => setPricingTab("instant")}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  pricingTab === "instant" ? "bg-white/90 text-black shadow" : "text-white/80 hover:text-white"
                }`}
              >
                Instant
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-6 grid gap-5 md:gap-6 lg:gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={`${pricingTab}-${plan.capital}`}
                className="rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm overflow-hidden"
              >
                {/* Header */}
                <div className="p-5 md:p-6 bg-gradient-to-b from-white/10 to-white/0">
                  <div className="text-sm uppercase tracking-wider text-white/70">
                    {currency(plan.capital)} USD
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    {pricingTab === "instant" ? "Instant Funded" : "1-Step Challenge"}
                  </div>
                </div>

                {/* Body rows */}
                <div className="divide-y divide-white/10">
                  {ROWS.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start justify-between gap-4 px-5 md:px-6 py-3.5"
                    >
                      <span className="text-white/70 text-sm md:text-[13px]">{row.label}</span>
                      <span className="text-white text-sm md:text-[13px] text-right">
                        {row.value(plan)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="p-5 md:p-6">
                  <button
                    className="w-full rounded-xl py-3 text-sm font-medium text-white border border-emerald-400/30 bg-gradient-to-b from-emerald-500/15 to-emerald-400/10 hover:from-emerald-500/25 hover:to-emerald-400/20 transition-all"
                    data-plan-type={pricingTab}
                    data-capital={plan.capital}
                    onClick={() =>
                      router.push(`/signup?type=${pricingTab}&capital=${plan.capital}`)
                    }
                  >
                    Buy Plan
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-white/50">* Accounts available up to $500,000 capital.</p>
        </div>
      </section>

      {/* Section 3 – How it Works */}
      <section className="max-w-7xl mx-auto px-4 text-center mt-32 pb-24">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {["Choose Plan", "Pass Challenge", "Get Funded"].map((step, i) => (
            <div key={i} className="text-left">
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Step {i + 1}</h3>
              <p className="text-gray-300">
                {step === "Choose Plan" && "Pick the funding model that fits your style and capital needs."}
                {step === "Pass Challenge" && "Complete one simple phase by reaching 10% profit target."}
                {step === "Get Funded" && "Access your live funded account and start earning 70% profits."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 – 1-Step Evaluation */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <Image
            src="/evaluation-visual.png"
            alt="Evaluation Visual"
            width={500}
            height={500}
            className="rounded-xl"
          />
        </div>
        <div className="text-left">
          <h2 className="text-4xl font-bold mb-8">1- Step Evaluation</h2>
          <ul className="space-y-6 text-gray-300 text-base leading-relaxed">
            <li><span className="text-emerald-400 font-semibold">Pass the Challenge:</span> Reach 10% profit while maintaining 4% daily and 8% total drawdown.</li>
            <li><span className="text-emerald-400 font-semibold">Live Account Access:</span> Get funded the same day once you pass.</li>
            <li><span className="text-emerald-400 font-semibold">70% Payout:</span> Enjoy a lifetime split of profits.</li>
            <li><span className="text-emerald-400 font-semibold">HFT Friendly:</span> High-frequency trading is allowed.</li>
          </ul>
        </div>
      </section>

      {/* Section 5 – Program Elements */}
      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <Image
            src="/program-elements.png"
            alt="Program Visual"
            width={500}
            height={500}
            className="rounded-xl"
          />
        </div>
        <div className="text-left">
          <h2 className="text-4xl font-bold mb-8">Program Elements</h2>
        <ul className="space-y-6 text-gray-300 text-base leading-relaxed">
            <li><span className="text-emerald-400 font-semibold">Drawdown Protection:</span> Strict daily and total limits to protect your capital.</li>
            <li><span className="text-emerald-400 font-semibold">Scaling Plan:</span> Increase capital as you grow.</li>
            <li><span className="text-emerald-400 font-semibold">Reset Option:</span> Restart your challenge at a reduced fee.</li>
            <li><span className="text-emerald-400 font-semibold">Real Market Data:</span> Trade with accurate live pricing.</li>
          </ul>
        </div>
      </section>

      {/* Section 6 – FAQ */}
      <FAQSection />

      {/* Section 6 – Contact Us */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-start text-white">
        <div>
          <h2 className="text-4xl font-bold mb-4">Contact Now</h2>
          <p className="text-lg text-gray-300 mb-8">
            Reach out to us for more information or to start the acquisition process.
          </p>
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const name = (form.elements.namedItem("name") as HTMLInputElement).value;
              const email = (form.elements.namedItem("email") as HTMLInputElement).value;
              const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
              });

              const data = await res.json();
              if (data.success) {
                form.reset();
              } else {
                // Optionally show error toast
              }
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your name*"
                required
                className="bg-transparent border-b border-gray-600 py-2 px-2 text-white placeholder-gray-400 outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                required
                className="bg-transparent border-b border-gray-600 py-2 px-2 text-white placeholder-gray-400 outline-none"
              />
            </div>
            <textarea
              name="message"
              placeholder="Your message*"
              required
              rows={4}
              className="w-full bg-transparent border-b border-gray-600 py-2 px-2 text-white placeholder-gray-400 outline-none"
            />
            <button
              type="submit"
              className="w-full bg-emerald-400 text-black py-3 rounded-full font-semibold hover:opacity-90"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-xl font-semibold mb-2">Email</h4>
            <p className="text-emerald-300">support@atomic-funding.com</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Location</h4>
            <p className="text-gray-300">USA</p>
          </div>
          <p className="text-sm text-gray-400 pt-12">
            Atomic Funding is not a registered investment advisor. All content is for informational purposes only — seek professional advice before making decisions.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-32 pt-12 pb-20 px-4 text-sm text-gray-400">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          <div>
            <h3 className="text-white font-semibold mb-4">Atomic Funding</h3>
            <p className="text-gray-400"></p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Affiliate</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FaEnvelope />
                <a href="mailto:support@atomicfunding.com" className="hover:text-white">
                  support@atomic-funding.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt />
                USA
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-white"><FaTelegramPlane /></a>
              <a href="#" className="hover:text-white"><FaDiscord /></a>
              <a
                href="https://www.instagram.com/atomicfunding?igsh=bWhsdmVrc3liNndm&utm_source=qr"
                className="hover:text-white"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Atomic Funding. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
