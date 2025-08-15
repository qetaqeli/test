"use client";

import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    state: "",
    zip: "",
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch profile on mount or session change
  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          // PGRST116 = No rows found - ignore it here
          console.error("Error fetching profile:", error);
          setErrorMsg("Failed to load profile.");
        } else if (data) {
          setProfile({
            first_name: data.first_name ?? "",
            last_name: data.last_name ?? "",
            email: session.user.email ?? "",
            company: data.company ?? "",
            phone: data.phone ?? "",
            country: data.country ?? "",
            state: data.state ?? "",
            zip: data.zip ?? "",
          });
        } else {
          // No profile found, create default profile
          const { error: insertError } = await supabase.from("profiles").insert({
            id: session.user.id,
            email: session.user.email,
            created_at: new Date().toISOString(),
          });
          if (insertError) {
            console.error("Error creating profile:", insertError);
            setErrorMsg("Failed to create profile.");
          } else {
            setProfile({
              first_name: "",
              last_name: "",
              email: session.user.email ?? "",
              company: "",
              phone: "",
              country: "",
              state: "",
              zip: "",
            });
          }
        }
      } catch (err) {
        console.error("Unexpected error fetching profile:", err);
        setErrorMsg("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [session, supabase]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    if (!session?.user) return;

    setErrorMsg("");

    const updates = {
      id: session.user.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      company: profile.company,
      phone: profile.phone,
      country: profile.country,
      state: profile.state,
      zip: profile.zip,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      console.error("Error updating profile:", error);
      setErrorMsg("Failed to save profile.");
    } else {
      alert("Profile saved!");
    }
  }

  if (loading) {
    return <p className="text-white p-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#101418] rounded-xl text-white">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {errorMsg && (
        <p className="mb-4 p-2 bg-red-700 rounded text-center font-semibold">{errorMsg}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="first_name"
          placeholder="First Name"
          value={profile.first_name}
          onChange={handleChange}
        />
        <Input
          name="last_name"
          placeholder="Last Name"
          value={profile.last_name}
          onChange={handleChange}
        />
        <Input
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          disabled
        />
        <Input
          name="company"
          placeholder="Company"
          value={profile.company}
          onChange={handleChange}
        />
        <Input
          name="phone"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={handleChange}
        />
        <Input
          name="country"
          placeholder="Country"
          value={profile.country}
          onChange={handleChange}
        />
        <Input
          name="state"
          placeholder="State"
          value={profile.state}
          onChange={handleChange}
        />
        <Input
          name="zip"
          placeholder="ZIP Code"
          value={profile.zip}
          onChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <Button onClick={handleSave} className="w-full">
          Save Profile
        </Button>
      </div>
    </div>
  );
}
