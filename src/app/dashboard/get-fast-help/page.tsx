// src/app/dashboard/help/page.tsx
"use client";

import { useState } from "react";

export default function HelpPage() {
  const [form, setForm] = useState({
    email: "",
    subject: "",
    accountNumber: "",
    type: "",
    description: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Ticket submitted!");
  }

  return (
    <div className="p-6 text-white min-h-screen bg-dark">
      <h1 className="text-2xl font-bold mb-2">Get Fast Help</h1>
      <p className="text-sm text-white/60 mb-6">You Can Message Support Directly From Here</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="bg-card p-3 rounded border border-border placeholder-white/30"
        />

        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Enter Subject"
          className="bg-card p-3 rounded border border-border placeholder-white/30"
        />

        <input
          type="text"
          name="accountNumber"
          value={form.accountNumber}
          onChange={handleChange}
          placeholder="Account Number"
          className="bg-card p-3 rounded border border-border placeholder-white/30"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="bg-card p-3 rounded border border-border text-white/70"
        >
          <option value="">Select type</option>
          <option value="login">Login Issue</option>
          <option value="funding">Funding Question</option>
          <option value="technical">Technical Issue</option>
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={6}
          className="col-span-1 md:col-span-2 bg-card p-3 rounded border border-border placeholder-white/30"
        />

        <div className="col-span-1 md:col-span-2">
          <button
            type="button"
            className="bg-dark border border-white/30 px-6 py-3 rounded-full text-white/70 hover:bg-white/10 mb-4"
          >
            ⬆ Upload Attachment
          </button>
          <br />
          <button
            type="submit"
            className="float-right bg-greenGlow text-black px-6 py-3 rounded-full font-bold hover:opacity-90"
          >
            Send Ticket
          </button>
        </div>
      </form>
    </div>
  );
}
