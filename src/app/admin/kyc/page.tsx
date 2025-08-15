"use client";

import { useEffect, useState } from "react";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  kyc_status: string;
  profile_picture_url: string | null;
};

export default function AdminKYCPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  async function fetchKYCProfiles() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/kyc");
      if (!res.ok) throw new Error("Failed to fetch KYC profiles");
      const data = await res.json();
      setProfiles(data.profiles || []);
    } catch (err: any) {
      setError(err.message || "Error fetching KYC profiles");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchKYCProfiles();
  }, []);

  async function updateKYCStatus(id: string, status: string) {
    setProcessingId(id);
    try {
      const res = await fetch("/api/admin/kyc/update", {
        method: "POST",
        body: JSON.stringify({ id, status }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to update KYC status");
      await fetchKYCProfiles();
    } catch (err: any) {
      alert(err.message || "Error updating status");
    } finally {
      setProcessingId(null);
    }
  }

  if (loading) return <p className="text-white p-6">Loading KYC profiles...</p>;
  if (error) return <p className="text-red-500 p-6">Error: {error}</p>;

  return (
    <div className="ml-64 min-h-screen p-6 bg-gradient-to-b from-[#081019] via-[#101826] to-[#0f172a] text-white">
      <h1 className="text-3xl font-semibold mb-6">Admin Panel – KYC Pending</h1>

      {profiles.length === 0 && <p>No KYC profiles pending approval.</p>}

      <div className="space-y-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-[#0f172a] rounded-xl p-4 shadow-md flex items-center space-x-6"
          >
            {profile.profile_picture_url ? (
              <img
                src={profile.profile_picture_url}
                alt={`${profile.first_name} ${profile.last_name}`}
                className="w-20 h-20 rounded-lg object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300">
                No Image
              </div>
            )}
            <div className="flex-1">
              <p>
                <strong>Name:</strong> {profile.first_name} {profile.last_name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Status:</strong> {profile.kyc_status}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                disabled={processingId === profile.id}
                onClick={() => updateKYCStatus(profile.id, "approved")}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Approve
              </button>
              <button
                disabled={processingId === profile.id}
                onClick={() => updateKYCStatus(profile.id, "rejected")}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
