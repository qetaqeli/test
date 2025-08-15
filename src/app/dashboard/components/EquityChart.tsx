// /app/dashboard/components/EquityChart.tsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Mon", equity: 50000 },
  { date: "Tue", equity: 50620 },
  { date: "Wed", equity: 51200 },
  { date: "Thu", equity: 50890 },
  { date: "Fri", equity: 51950 },
];

export default function EquityChart() {
  return (
    <div className="h-72 w-full text-white">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="date" stroke="#888" />
          <YAxis stroke="#888" domain={[49000, 53000]} />
          <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333", color: "white" }} />
          <Line type="monotone" dataKey="equity" stroke="#00FFFF" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
