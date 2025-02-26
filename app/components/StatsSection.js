// app/components/StatsSection.js
export default function StatsSection() {
  const stats = [
    { label: "Projects Completed", value: "100+" },
    { label: "Countries Reached", value: "50+" },
    { label: "Satisfied Clients", value: "500+" },
    { label: "Awards Won", value: "20+" },
  ];

  return (
    <section className="py-16 bg-black bg-opacity-60 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-4xl font-extrabold text-neonBlue">
                {stat.value}
              </span>
              <span className="mt-2 text-lg">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
