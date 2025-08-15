// /app/dashboard/tabs/CheckLimits.tsx
"use client";

export default function CheckLimits() {
  return (
    <div className="text-gray-300 p-4">
      <h2 className="text-xl font-semibold mb-2">Drawdown Limits</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>📉 Daily Drawdown: <strong className="text-white">4%</strong></li>
        <li>📉 Maximum Drawdown: <strong className="text-white">8%</strong></li>
        <li>🛑 No over-leveraging or hedging between accounts</li>
        <li>⏳ Trading hours: Weekdays only (no weekends)</li>
      </ul>
    </div>
  );
}
