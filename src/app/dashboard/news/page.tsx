"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type NewsItem = {
  source: "FXEmpire" | "Forex Live" | "Reuters";
  title: string;
  description: string;
  time: string;
  url: string;
};

const dummyNews: NewsItem[] = [
  {
    source: "FXEmpire",
    title: "Natural Gas Price Forecast: Stabilizes Near Key Long-Term Support Zone",
    description:
      "Natural gas may have completed its correction after rebounding from a long-term support zone, signaling potential for a bullish reversal and sustained upside.",
    time: "Aug 1, 10:40 PM",
    url: "#",
  },
  {
    source: "FXEmpire",
    title:
      "Natural Gas, WTI Oil, Brent Oil Forecasts – Oil Dives 3% Amid Demand Concerns",
    description:
      "Oil markets retreat as traders focus on Non Farm Payrolls data.",
    time: "Aug 1, 08:09 PM",
    url: "#",
  },
  {
    source: "Forex Live",
    title: "Baker Hughes oil rig count – 5 at 410",
    description:
      "Looking at the hourly chart below, the price decline is testing its 200-hour moving average at $67.08...",
    time: "Aug 1, 08:07 PM",
    url: "#",
  },
  {
    source: "Reuters",
    title:
      "South Africa’s finance minister and central bank governor at odds over inflation target",
    description:
      "The South African central bank’s decision to lower its inflation target has raised questions...",
    time: "Aug 1, 06:01 PM",
    url: "#",
  },
  {
    source: "FXEmpire",
    title:
      "Natural Gas Weekly Price Outlook – Natural Gas Chops for the Week",
    description:
      "This week has been somewhat choppy for the natural gas market...",
    time: "Aug 1, 06:59 PM",
    url: "#",
  },
];

export default function LiveNewsFeed() {
  const [selectedSource, setSelectedSource] = useState("All");
  const [search, setSearch] = useState("");

  const filteredNews = dummyNews.filter((n) => {
    return (
      (selectedSource === "All" || n.source === selectedSource) &&
      (n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.description.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-2">Live News Feed</h1>
      <p className="text-sm text-muted-foreground mb-6">
        See All Important News Feed Directly Here
      </p>

      {/* Filters and Search */}
      <div className="bg-[#0d0f11] p-4 rounded-xl mb-6">
        <div className="mb-4 font-semibold text-sm">Top News Feed</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {["FXEmpire", "Forex Live", "Reuters"].map((src) => (
            <Button
              key={src}
              size="sm"
              variant={selectedSource === src ? "default" : "outline"}
              onClick={() => setSelectedSource(src)}
            >
              {src}
            </Button>
          ))}
          <Button
            size="sm"
            variant={selectedSource === "All" ? "default" : "outline"}
            onClick={() => setSelectedSource("All")}
          >
            All
          </Button>
        </div>
        <Input
          placeholder="🔍 Search news..."
          className="bg-[#101418] border border-gray-800"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Update message */}
      <div className="bg-black rounded-lg px-4 py-3 text-sm border border-gray-800 mb-6">
        <span className="text-green-400">Update</span>: Stay updated with the latest headlines!
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((n, i) => (
          <div
            key={i}
            className="border border-gray-800 rounded-xl bg-[#101418] p-4 flex flex-col justify-between h-full"
          >
            <div className="mb-2 flex justify-between items-center text-xs text-muted-foreground">
              <span className="text-green-400 font-semibold">{n.source}</span>
              <span>{n.time}</span>
            </div>
            <div className="text-base font-semibold mb-2">{n.title}</div>
            <p className="text-sm text-gray-400 mb-3">{n.description}</p>
            <a
              href={n.url}
              className="mt-auto text-center bg-green-600 text-black font-medium py-2 rounded-md text-sm hover:bg-green-500 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
