import React from "react";
import { Camera, ImageIcon } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    title: "Annual Function",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  },
  {
    id: 2,
    title: "Computer Lab",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
  },
  {
    id: 3,
    title: "Classroom",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
  },
  {
    id: 4,
    title: "Seminar",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
  },
  {
    id: 5,
    title: "Library",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
  },
  {
    id: 6,
    title: "Award Ceremony",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800",
  },
];

const OurGallery = () => {
  return (
    <section className="bg-black py-16 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Camera className="text-blue-500" size={34} />
            <h2 className="text-4xl font-bold text-white">
              Our <span className="text-blue-500">Gallery</span>
            </h2>
          </div>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore memorable moments from our institute including classroom
            activities, seminars, cultural events, workshops, and celebrations.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="carousel w-full rounded-2xl md:hidden">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="carousel-item relative w-full justify-center"
            >
              <div className="card bg-base-100 shadow-xl overflow-hidden w-full">
                <figure>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-72 w-full object-cover"
                  />
                </figure>

                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                  <div className="flex items-center gap-2 text-white">
                    <ImageIcon size={18} className="text-blue-500" />
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>

              <div className="absolute bottom-0 p-5">
                <div className="flex items-center gap-2">
                  <ImageIcon
                    className="text-blue-500 group-hover:rotate-12 duration-300"
                    size={22}
                  />
                  <h3 className="text-white text-xl font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-blue-500 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurGallery;