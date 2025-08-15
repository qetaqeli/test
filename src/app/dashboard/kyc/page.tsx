"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function KycSubmitPage() {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
  const [idBackFile, setIdBackFile] = useState<File | null>(null);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [addressProofFile, setAddressProofFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"pending" | "approved" | "rejected" | null>(null);

  useEffect(() => {
    if (!session?.user) return;

    async function fetchKyc() {
      const { data, error } = await supabase
        .from("kyc_submissions")
        .select("status, full_name, dob")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        // You can handle no data found here if needed
        return;
      }

      if (data) {
        setStatus(data.status);
        setFullName(data.full_name ?? "");
        setDob(data.dob ?? "");
      }
    }

    fetchKyc();
  }, [session, supabase]);

  function validateFile(file: File) {
    const maxSizeMB = 5;
    if (file.size / 1024 / 1024 > maxSizeMB) {
      setMessage(`File size must be under ${maxSizeMB}MB.`);
      return false;
    }
    if (!file.type.startsWith("image/")) {
      setMessage("Only image files are allowed.");
      return false;
    }
    setMessage("");
    return true;
  }

  async function uploadFile(file: File, folder: string) {
    if (!session?.user) throw new Error("User not authenticated");
    const userId = session.user.id;
    const filePath = `${folder}/${userId}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("kyc-documents").upload(filePath, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("kyc-documents").getPublicUrl(filePath);
    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!session?.user) {
      setMessage("User not authenticated.");
      return;
    }

    if (!fullName || !dob) {
      setMessage("Please fill in your full name and date of birth.");
      return;
    }

    if (!idFrontFile && !idBackFile && !passportFile && !addressProofFile && !selfieFile) {
      setMessage("Please upload at least one document.");
      return;
    }

    if (
      (idFrontFile && !validateFile(idFrontFile)) ||
      (idBackFile && !validateFile(idBackFile)) ||
      (passportFile && !validateFile(passportFile)) ||
      (addressProofFile && !validateFile(addressProofFile)) ||
      (selfieFile && !validateFile(selfieFile))
    ) {
      return;
    }

    try {
      setUploading(true);

      const uploads: any = {};

      if (idFrontFile) uploads.id_front_url = await uploadFile(idFrontFile, "id-front");
      if (idBackFile) uploads.id_back_url = await uploadFile(idBackFile, "id-back");
      if (passportFile) uploads.passport_url = await uploadFile(passportFile, "passport");
      if (addressProofFile) uploads.address_proof_url = await uploadFile(addressProofFile, "address-proof");
      if (selfieFile) uploads.selfie_url = await uploadFile(selfieFile, "selfies");

      const { error } = await supabase.from("kyc_submissions").upsert({
        user_id: session.user.id,
        full_name: fullName,
        dob,
        status: "pending",
        submitted_at: new Date().toISOString(),
        ...uploads,
      });

      if (error) throw error;

      setMessage("KYC submitted successfully! Please wait for verification.");
      setStatus("pending");

      if (idFrontFile) setIdFrontFile(null);
      if (idBackFile) setIdBackFile(null);
      if (passportFile) setPassportFile(null);
      if (addressProofFile) setAddressProofFile(null);
      if (selfieFile) setSelfieFile(null);
    } catch (error: any) {
      setMessage("Error: " + error.message);
    } finally {
      setUploading(false);
    }
  }

  const isDisabled = status === "pending" || status === "approved";

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#101418] rounded-xl text-white">
      <h1 className="text-2xl mb-6 font-bold">Submit KYC Information</h1>

      {status === "pending" && (
        <div className="mb-4 p-4 bg-yellow-600 rounded text-center">
          Your KYC submission is <strong>pending</strong> review.
        </div>
      )}
      {status === "approved" && (
        <div className="mb-4 p-4 bg-green-600 rounded text-center">
          Your KYC has been <strong>approved</strong>. Thank you!
        </div>
      )}
      {status === "rejected" && (
        <div className="mb-4 p-4 bg-red-600 rounded text-center">
          Your KYC was <strong>rejected</strong>. Please resubmit your documents.
        </div>
      )}

      {message && <p className="mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          aria-label="Full Name"
          disabled={isDisabled}
        />
        <Input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          aria-label="Date of Birth"
          disabled={isDisabled}
        />

        <div>
          <label className="block mb-1" htmlFor="idFrontFile">
            Upload ID Front
          </label>
          <input
            id="idFrontFile"
            type="file"
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setIdFrontFile(e.target.files?.[0] ?? null)}
            disabled={isDisabled}
            aria-describedby="idFrontHelp"
          />
          <small id="idFrontHelp" className="text-gray-400">
            JPG, PNG up to 5MB
          </small>
        </div>

        <div>
          <label className="block mb-1" htmlFor="idBackFile">
            Upload ID Back
          </label>
          <input
            id="idBackFile"
            type="file"
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setIdBackFile(e.target.files?.[0] ?? null)}
            disabled={isDisabled}
            aria-describedby="idBackHelp"
          />
          <small id="idBackHelp" className="text-gray-400">
            JPG, PNG up to 5MB
          </small>
        </div>

        <div>
          <label className="block mb-1" htmlFor="passportFile">
            Upload Passport
          </label>
          <input
            id="passportFile"
            type="file"
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassportFile(e.target.files?.[0] ?? null)}
            disabled={isDisabled}
            aria-describedby="passportHelp"
          />
          <small id="passportHelp" className="text-gray-400">
            JPG, PNG up to 5MB
          </small>
        </div>

        <div>
          <label className="block mb-1" htmlFor="addressProofFile">
            Upload Proof of Address
          </label>
          <input
            id="addressProofFile"
            type="file"
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAddressProofFile(e.target.files?.[0] ?? null)}
            disabled={isDisabled}
            aria-describedby="addressProofHelp"
          />
          <small id="addressProofHelp" className="text-gray-400">
            JPG, PNG up to 5MB
          </small>
        </div>

        <div>
          <label className="block mb-1" htmlFor="selfieFile">
            Upload Selfie
          </label>
          <input
            id="selfieFile"
            type="file"
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSelfieFile(e.target.files?.[0] ?? null)}
            disabled={isDisabled}
            aria-describedby="selfieHelp"
          />
          <small id="selfieHelp" className="text-gray-400">
            JPG, PNG up to 5MB
          </small>
        </div>

        <Button
          type="submit"
          disabled={uploading || isDisabled}
          className="w-full"
          aria-busy={uploading}
          aria-label="Submit KYC Information"
        >
          {uploading ? "Submitting..." : "Submit KYC"}
        </Button>
      </form>
    </div>
  );
}
