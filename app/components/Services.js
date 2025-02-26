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
      className="relative py-16 sm:py-20 bg-gradient-to-br from-gray-900 to-black overflow-hidden"
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[url('/futuristic-pattern.svg')] bg-cover bg-center animate-pulse"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-12 text-neonBlue drop-shadow-lg">
          Our Services
        </h2>

        {/* Services Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-gray-800/50 border border-gray-700 backdrop-blur-lg p-6 sm:p-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-neonBlue"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-neonBlue">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
