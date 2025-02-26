// app/components/PortfolioSection.js
export default function PortfolioSection() {
  const projects = [
    {
      title: "Luxury Villa",
      image:
        "https://luxuryproperties.in/wp-content/uploads/2019/07/Prestige-Golfshire-Villa-1.jpg",
    },
    {
      title: "Urban Skyscraper",
      image:
        "https://preview.redd.it/the-infamous-skyscraper-mansion-in-bengaluru-india-v0-ljn3urgwqxxc1.png?auto=webp&s=b691d445d72c605aaf9f98397ad0f3f680b2ab08",
    },
    {
      title: "Modern Office",
      image:
        "https://foyr.com/learn/wp-content/uploads/2021/08/modern-office-design.png",
    },
    {
      title: "Suburban Home",
      image:
        "https://cdn.alittledelightful.com/wp-content/uploads/2023/08/Latest-suburban-house.jpeg",
    },
  ];

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Our Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-black bg-opacity-50 rounded-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
