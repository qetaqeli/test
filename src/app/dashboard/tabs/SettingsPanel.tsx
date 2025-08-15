// /app/dashboard/tabs/SettingsPanel.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import countryList from "react-select-country-list";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const statesByCountry: Record<string, string[]> = {
  "United States": [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ],
  Canada: [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
    "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"
  ],
  "United Kingdom": [
    "England", "Northern Ireland", "Scotland", "Wales"
  ]
};

export default function SettingsPanel() {
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const countries = countryList().getData();
  const stateOptions = statesByCountry[country] || [];

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, country, state, zip")
          .eq("id", data.user.id)
          .single();
        if (profile) {
          setFullName(profile.full_name || "");
          setCountry(profile.country || "");
          setState(profile.state || "");
          setZip(profile.zip || "");
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    const zipRegex = /^[0-9]{4,10}$/;
    if (!zipRegex.test(zip)) return setStatus("Invalid ZIP/Postal code");

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, country, state, zip })
      .eq("id", user.id);

    setStatus(error ? "Error saving data" : "Saved successfully");
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-10 text-gray-200">
      <h2 className="text-2xl font-bold">Settings</h2>

      {status && <p className="text-sm text-green-400">{status}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label>Email</label>
          <input
            disabled
            value={user?.email || ""}
            className="w-full px-4 py-2 bg-[#1e1e1e] rounded text-gray-400 cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label>Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 bg-[#1e1e1e] rounded text-white"
          />
        </div>

        <div className="space-y-2">
          <label>Country</label>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setState("");
            }}
            className="w-full px-4 py-2 bg-[#1e1e1e] rounded text-white"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.label} value={c.label}>{c.label}</option>
            ))}
          </select>
        </div>

        {stateOptions.length > 0 && (
          <div className="space-y-2">
            <label>State / Province</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-2 bg-[#1e1e1e] rounded text-white"
            >
              <option value="">Select State</option>
              {stateOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-2">
          <label>ZIP / Postal Code</label>
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full px-4 py-2 bg-[#1e1e1e] rounded text-white"
            placeholder="e.g., 90210"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded font-semibold"
      >
        Save Changes
      </button>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="bg-[#161616] p-6 rounded-xl space-y-4">
          <h3 className="text-lg font-semibold">Change your password</h3>
          <p className="text-sm text-gray-400">You can see your account information from here.</p>
          <button className="bg-emerald-700 px-4 py-2 rounded hover:bg-emerald-800">Set a new password</button>
        </div>

        <div className="bg-[#161616] p-6 rounded-xl space-y-4">
          <h3 className="text-lg font-semibold">KYC</h3>
          <p className="text-sm text-gray-400">KYC submission available. Manage verification anytime.</p>
          <Link
            href="https://veriff.com" // Change to your Veriff URL
            target="_blank"
            className="bg-emerald-700 px-4 py-2 rounded inline-block hover:bg-emerald-800"
          >
            Get Verified
          </Link>
        </div>
      </div>
    </div>
  );
}