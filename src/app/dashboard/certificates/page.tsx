"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      setUser(user);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
        return;
      }

      setProfile(profileData);
    }

    fetchUser();
  }, []);

  if (!user || !profile) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-2xl font-semibold">Welcome to Your Dashboard</h1>

      <div className="bg-card p-4 rounded-lg border border-border">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>KYC Status:</strong> {profile.kyc_status || "Not Submitted"}</p>
        <p><strong>Account Purchased:</strong> {profile.account_purchased ? "✅ Yes" : "❌ No"}</p>
      </div>

      {!profile.account_purchased && (
        <button className="bg-greenGlow text-black font-semibold px-6 py-2 rounded shadow-green">
          Buy Account
        </button>
      )}
    </div>
  );
}
