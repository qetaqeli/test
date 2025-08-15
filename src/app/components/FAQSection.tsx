"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Atomic Funding?",
    answer: "Atomic Funding is a prop firm offering instant funding without traditional evaluation delays.",
  },
  {
    question: "How do I get started?",
    answer: "Simply choose a plan, complete the challenge (if required), and start trading a funded account.",
  },
  {
    question: "Can I use EAs or bots?",
    answer: "Yes, expert advisors and automated strategies are allowed in certain account types.",
  },
  {
    question: "When do I receive payouts?",
    answer: "You can withdraw profits biweekly with a lifetime 70% split.",
  },
  {
    question: "Consistency",
    answer: "Consistency is 35% — this means your profit across trading days should remain within this threshold.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-black/60 backdrop-blur-md py-24 px-4 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6 text-left">
          {faqs.map((item, i) => (
            <div key={i} className="border border-cyan-400 rounded-xl overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left font-semibold text-emerald-400 hover:bg-white/10 transition"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {item.question}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-gray-300 text-sm bg-black/40">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
