// app/components/TestimonialsSection.js
export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "John Smith",
      feedback:
        "M R Consultants helped us find the perfect property overseas. Their expertise was invaluable!",
    },
    {
      name: "Maria Garcia",
      feedback:
        "They transformed our home interior into a modern oasis. Highly recommended!",
    },
    {
      name: "Mohammed Khan",
      feedback:
        "Professional, visionary, and reliable. M R Consultants delivered our construction project on time.",
    },
  ];

  return (
    <section className="py-16 bg-black bg-opacity-70">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-xl transition"
            >
              <p className="italic text-gray-300">"{t.feedback}"</p>
              <h4 className="mt-4 font-semibold text-neonBlue">- {t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
