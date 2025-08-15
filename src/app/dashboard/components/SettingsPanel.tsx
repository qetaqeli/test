// /app/dashboard/components/SettingsPanel.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SettingsPanel() {
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", data.user.id)
          .single();
        if (profile) setFullName(profile.full_name);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", user.id);
    if (error) setStatus("Error updating profile.");
    else setStatus("Profile updated successfully.");
  };

  const handleChangePassword = async () => {
    if (!newPassword) return;
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setStatus("Error changing password.");
    else setStatus("Password changed successfully.");
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6 text-gray-200">
      <h2 className="text-xl font-bold">Account Settings</h2>

      {status && <p className="text-sm text-green-400">{status}</p>}

      <div className="space-y-2">
        <label className="block text-sm">Email</label>
        <input
          className="w-full px-4 py-2 rounded bg-[#1e1e1e] text-gray-400 cursor-not-allowed"
          type="text"
          value={user?.email || ""}
          disabled
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm">Full Name</label>
        <input
          className="w-full px-4 py-2 rounded bg-[#1e1e1e] text-white"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <button
          onClick={handleUpdateProfile}
          className="mt-2 px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-700"
        >
          Update Profile
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm">New Password</label>
        <input
          className="w-full px-4 py-2 rounded bg-[#1e1e1e] text-white"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handleChangePassword}
          className="mt-2 px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
