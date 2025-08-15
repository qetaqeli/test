"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const impactColors = {
  Low: "border border-yellow-500 text-yellow-400",
  Medium: "border border-orange-500 text-orange-400",
  High: "border border-red-500 text-red-400",
};

const mockNews = [
  {
    date: "01 08 2025",
    impact: "Low",
    event: "Tax Revenue (Jul)",
    country: "AR",
    currency: "ARS",
    actual: "5.036",
    previous: "16184",
  },
  {
    date: "01 08 2025",
    impact: "Low",
    event: "CFTC CAD speculative net positions",
    country: "CA",
    currency: "CAD",
    actual: "-8.677",
    previous: "-70.3",
  },
  {
    date: "01 08 2025",
    impact: "Medium",
    event: "CFTC Crude Oil speculative net positions",
    country: "US",
    currency: "USD",
    actual: "1.761",
    previous: "153.3",
  },
  {
    date: "01 08 2025",
    impact: "Medium",
    event: "CFTC Nasdaq 100 speculative net positions",
    country: "US",
    currency: "USD",
    actual: "14.007",
    previous: "30.7",
  },
  {
    date: "01 08 2025",
    impact: "Medium",
    event: "CFTC S&P 500 speculative net positions",
    country: "US",
    currency: "USD",
    actual: "3.145",
    previous: "-168.5",
  },
  {
    date: "01 08 2025",
    impact: "Medium",
    event: "CFTC NZD speculative net positions",
    country: "NZ",
    currency: "NZD",
    actual: "34.375",
    previous: "-3.2",
  },
  {
    date: "01 08 2025",
    impact: "Low",
    event: "CFTC GBP speculative net positions",
    country: "UK",
    currency: "GBP",
    actual: "-2100",
    previous: "0.6",
  },
  {
    date: "01 08 2025",
    impact: "Low",
    event: "CFTC Corn speculative net positions",
    country: "US",
    currency: "USD",
    actual: "0.299",
    previous: "-133.9",
  },
  {
    date: "01 08 2025",
    impact: "Low",
    event: "CFTC MXN speculative net positions",
    country: "MX",
    currency: "MXN",
    actual: "1.07",
    previous: "56.1",
  },
  {
    date: "01 08 2025",
    impact: "Medium",
    event: "CFTC BRL speculative net positions",
    country: "BR",
    currency: "BRL",
    actual: "-7.722",
    previous: "25.9",
  },
];

export default function NewsCalendar() {
  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-2">News Calendar</h1>
      <p className="text-sm text-muted-foreground mb-6">
        See All Important News Feed Directly Here
      </p>

      {/* Filters */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
            <Button key={day} variant="outline" className="text-sm rounded-md">
              {day}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {["Low", "Medium", "High"].map((impact) => (
            <Badge
              key={impact}
              className={`text-sm px-3 py-1 cursor-pointer ${impactColors[impact as keyof typeof impactColors]}`}
            >
              {impact}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {["All", "NZD", "GBP", "USD", "CAD", "AUD", "JPY", "CHF", "EUR"].map((cur) => (
            <Button key={cur} variant="outline">


              {cur === "All" ? "All" : (
                <img
                  src={`https://flagcdn.com/24x18/${cur.slice(0, 2).toLowerCase()}.png`}
                  alt={cur}
                  className="inline mr-1"
                />
              )}
              {cur !== "All" && cur}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-xl border border-gray-800">
        <table className="min-w-full text-sm divide-y divide-gray-800">
          <thead className="bg-[#0d0f11]">
            <tr>
              {["Date", "Impact", "Event", "Country", "Currency", "Actual", "Previous"].map((header) => (
                <th key={header} className="px-6 py-3 text-left font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#101418] divide-y divide-gray-800">
            {mockNews.map((news, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">{news.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded ${impactColors[news.impact as keyof typeof impactColors]}`}>
                    {news.impact}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{news.event}</td>
                <td className="px-6 py-4 whitespace-nowrap">{news.country}</td>
                <td className="px-6 py-4 whitespace-nowrap">{news.currency}</td>
                <td className="px-6 py-4 whitespace-nowrap">{news.actual}</td>
                <td className="px-6 py-4 whitespace-nowrap">{news.previous}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2 text-sm">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                page === 1
                  ? "bg-green-600 text-black"
                  : "bg-[#1a1d21] text-white hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-gray-500">... 869</span>
        </div>
      </div>
    </div>
  );
}
