// app/components/ProcessSection.js
export default function ProcessSection() {
  const steps = [
    {
      title: "Consultation",
      description: "We discuss your needs and objectives.",
      icon: "🗣️",
    },
    {
      title: "Planning",
      description: "We plan the project with precision.",
      icon: "📝",
    },
    {
      title: "Design",
      description: "Innovative design solutions are developed.",
      icon: "🎨",
    },
    {
      title: "Execution",
      description: "Our team brings the vision to life.",
      icon: "🏗️",
    },
    {
      title: "Delivery",
      description: "We deliver excellence on time.",
      icon: "✅",
    },
  ];

  return (
    <section className="py-20 bg-gray-800 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
