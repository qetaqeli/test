// /app/dashboard/components/TopStats.tsx
"use client";

import { FaChartLine, FaDollarSign, FaPercentage } from "react-icons/fa";

export default function TopStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <div className="bg-[#1a1a1a] p-5 rounded-xl shadow-md">
        <div className="flex items-center gap-4">
          <FaChartLine className="text-cyan-400 text-2xl" />
          <div>
            <div className="text-sm text-gray-400">Current Equity</div>
            <div className="text-xl font-bold">$50,000</div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-5 rounded-xl shadow-md">
        <div className="flex items-center gap-4">
          <FaDollarSign className="text-green-400 text-2xl" />
          <div>
            <div className="text-sm text-gray-400">Profit</div>
            <div className="text-xl font-bold">$1,240.30</div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-5 rounded-xl shadow-md">
        <div className="flex items-center gap-4">
          <FaPercentage className="text-yellow-400 text-2xl" />
          <div>
            <div className="text-sm text-gray-400">Daily Drawdown</div>
            <div className="text-xl font-bold">1.42%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
