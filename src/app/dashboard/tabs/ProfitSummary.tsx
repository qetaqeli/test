// /app/dashboard/tabs/ProfitSummary.tsx
"use client";

export default function ProfitSummary() {
  return (
    <div className="p-4 text-gray-300">
      <h2 className="text-xl font-semibold mb-2">Profit Summary</h2>
      <table className="w-full text-sm mt-4 border-collapse">
        <thead>
          <tr className="text-left text-gray-400 border-b border-[#333]">
            <th className="py-2">Date</th>
            <th className="py-2">Profit</th>
            <th className="py-2">Trade Count</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[#222]">
            <td className="py-2">2025-07-29</td>
            <td className="py-2">$240.00</td>
            <td className="py-2">4</td>
          </tr>
          <tr className="border-b border-[#222]">
            <td className="py-2">2025-07-30</td>
            <td className="py-2">$412.00</td>
            <td className="py-2">6</td>
          </tr>
          <tr>
            <td className="py-2">2025-07-31</td>
            <td className="py-2">$588.30</td>
            <td className="py-2">5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
