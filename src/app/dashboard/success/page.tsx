"use client";

export default function SuccessPage() {
  return (
    <div className="p-6 text-white text-center">
      <h1 className="text-3xl font-bold text-greenGlow mb-4">Payment Successful 🎉</h1>
      <p className="text-white/80 mb-6">
        Thank you! Your order has been confirmed. Your funded account details will be sent to your email shortly.
      </p>
      <a
        href="/dashboard"
        className="px-6 py-3 rounded-full bg-greenGlow text-black font-semibold hover:opacity-90"
      >
        Back to Dashboard
      </a>
    </div>
  );
}
