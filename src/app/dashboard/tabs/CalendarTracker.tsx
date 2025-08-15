// /app/dashboard/tabs/CalendarTracker.tsx
"use client";

export default function CalendarTracker() {
  return (
    <div className="p-4 text-gray-300">
      <h2 className="text-xl font-semibold mb-4">Trading Calendar</h2>
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {Array.from({ length: 30 }, (_, i) => {
          const day = i + 1;
          const isTraded = [2, 3, 4, 7, 10, 13, 14, 18, 21, 24, 25].includes(day);
          return (
            <div
              key={day}
              className={`py-2 rounded-md ${
                isTraded ? "bg-green-600 text-white" : "bg-[#1a1a1a] text-gray-500"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-xs text-gray-500">Green = Traded Day</div>
    </div>
  );
}
