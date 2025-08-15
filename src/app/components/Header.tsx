"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const router = useRouter();
  return (
    <>
      <header className="py-3 px-4 max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-white/5 rounded-full mt-4 text-white">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={36} height={36} />
          <span className="text-base font-semibold tracking-wide whitespace-nowrap">ATOMIC FUNDING</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex flex-1 justify-between items-center ml-6">
          <nav className="flex items-center space-x-8 text-sm">
            <a href="/" className="hover:text-cyan-400">Home</a>
            <a href="/how-it-works" className="hover:text-cyan-400">How it Works</a>
            <a href="/payouts" className="hover:text-cyan-400">Payouts</a>
            <a href="#refer" className="hover:text-cyan-400">Refer & Earn</a>
            <a href="/faq" className="hover:text-cyan-400">FAQ</a>
          </nav>

          <div className="flex items-center space-x-3 pl-6">
            <button
              onClick={() => router.push("/login")}
            className="px-4 py-1.5 text-sm rounded-full border border-emerald-400 hover:bg-emerald-400/10"
            >
              Enter the Portal
            </button>
            <button
              onClick={() =>router.push("/login")}
            className="px-4 py-1.5 text-sm rounded-full border border-white/20 hover:bg-white/10"
            >
              Login
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden ml-auto pl-3">
          <button onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <FaBars size={22} />
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
          <div className="relative w-4/5 max-w-xs h-full bg-white/10 backdrop-blur-lg p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-end mb-4">
                <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                  <FaTimes size={22} />
                </button>
              </div>
              <nav className="flex flex-col space-y-5 text-white text-base">
                <a href="/" className="hover:text-cyan-400">Home</a>
                <a href="/how-it-works" className="hover:text-cyan-400">How it Works</a>
                <a href="/payouts" className="hover:text-cyan-400">Payouts</a>
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
    </>
  );
}
