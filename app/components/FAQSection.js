// app/components/FAQSection.js
"use client";

import { useState } from "react";

export default function FAQSection() {
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a range of services including real estate consultation, building construction, land development, and interior design.",
    },
    {
      question: "How can I schedule a consultation?",
      answer:
        "You can reach out to us via our contact form or call us directly to schedule a consultation.",
    },
    {
      question: "Do you work internationally?",
      answer:
        "Yes, we have experience with both national and international projects.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-black bg-opacity-50 p-4 rounded-lg">
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full text-left font-semibold text-xl flex justify-between items-center"
              >
                {faq.question}
                <span>{openIndex === idx ? "-" : "+"}</span>
              </button>
              {openIndex === idx && (
                <p className="mt-2 text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
