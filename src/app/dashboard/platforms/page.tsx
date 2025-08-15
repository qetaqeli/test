// src/app/dashboard/platforms/page.tsx
"use client";

import Image from "next/image";

export default function PlatformsPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">Platforms</h1>
      <p className="text-sm text-white/60 mb-6">
        Some Platforms Are Downloadable, Others Are Web-Based Platforms.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TradingView */}
        <div className="bg-card border border-border p-6 rounded-xl">
          <div className="flex flex-col items-center space-y-2">
            <Image src="/tradingview.svg" alt="TradingView" width={80} height={80} />
            <div className="bg-sky-400 text-black px-3 py-1 rounded-full text-sm font-semibold">Free</div>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">TradingView</h2>
            <p className="text-sm text-white/60 mt-1">
              Trade futures directly on TradingView! Access real-time charts, advanced tools, and seamless execution all in one place.
            </p>
            <button className="mt-4 w-full py-2 rounded-full bg-border text-white cursor-not-allowed">Coming Soon</button>
          </div>
        </div>

        {/* Platform 5 */}
        <div className="bg-card border border-border p-6 rounded-xl">
          <div className="flex flex-col items-center space-y-2">
            <Image src="/platform5.png" alt="Platform 5" width={80} height={80} />
            <div className="bg-sky-400 text-black px-3 py-1 rounded-full text-sm font-semibold">Free</div>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Platform 5</h2>
            <p className="text-sm text-white/60 mt-1">
              Trade seamlessly on Platform 5, the ultimate solution for accessing global markets with advanced tools and a user-friendly interface.
            </p>
            <div className="flex gap-4 mt-4">
              <button className="flex-1 py-2 rounded-full bg-border text-white cursor-pointer">Mac OS</button>
              <button className="flex-1 py-2 rounded-full bg-border text-white cursor-pointer">Windows</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
