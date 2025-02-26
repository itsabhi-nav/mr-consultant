export default function Services() {
  const services = [
    {
      title: "Real Estate",
      description:
        "National and international real estate projects with modern insights and global reach.",
    },
    {
      title: "Building Construction",
      description:
        "Innovative construction solutions that combine quality and futuristic design.",
    },
    {
      title: "Land Development",
      description:
        "Transforming landscapes into thriving communities through sustainable development.",
    },
    {
      title: "Home Interior Design",
      description:
        "Modern interior design that creates immersive, stylish living environments.",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-20 bg-gradient-to-br from-gray-900 to-black overflow-hidden"
    >
      {/* Futuristic animated background overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full bg-[url('/futuristic-pattern.svg')] bg-cover bg-center animate-pulse"
          // Replace the URL with your own futuristic pattern or animated SVG
        ></div>
      </div>
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-neonBlue drop-shadow-lg">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-black bg-opacity-60 backdrop-blur-lg border border-gray-800 p-8 rounded-lg shadow-2xl hover:shadow-[0_0_20px_5px_rgba(0,188,212,0.5)] transition-all transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold mb-4 text-neonBlue">
                {service.title}
              </h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
