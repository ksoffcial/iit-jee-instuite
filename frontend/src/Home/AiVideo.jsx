import React from "react";

const AiVideo = () => {
  const videos = [
    {
      url: "https://res.cloudinary.com/dkt7ksipv/video/upload/v1784116375/Create_a_premium_cinematic__qyfnyg.mp4",
      title: "Welcome",
      desc: "Welcome to Rakesh Physics. Join us to shape your future.",
    },
    {
      url: "https://res.cloudinary.com/dkt7ksipv/video/upload/v1784117587/Create_a_premium_cinematic_adv_t2qlzz.mp4",
      title: "Engineering",
      desc: "We don't just teach—we build future engineers and scientists.",
    },
    {
      url: "https://res.cloudinary.com/dkt7ksipv/video/upload/v1784117741/Create_a_premium_cinematic_adv_1_bskdvy.mp4",
      title: "Medical",
      desc: "Preparing future doctors with world-class education and guidance.",
    },
  ];

  return (
    <section className="bg-black py-16 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="badge badge-info badge-outline px-5 py-4 text-sm">
            AI Generated Videos
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-5">
            Experience Learning With
            <span className="text-sky-500"> AI Videos</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mt-5">
            Explore our premium AI-generated promotional videos designed to
            inspire students and showcase the future of learning.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-2xl border border-sky-900 hover:border-sky-500 transition-all duration-300 overflow-hidden group"
            >
              <figure className="relative">
                <video
                  src={video.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                ></video>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              </figure>

              <div className="card-body bg-black">
                <h2 className="card-title text-sky-400">
                  {video.title}
                </h2>

                <p className="text-gray-300">
                  {video.desc}
                </p>

                
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="carousel carousel-center w-full space-x-5 rounded-box">
            {videos.map((video, index) => (
              <div
                key={index}
                className="carousel-item w-[90%]"
              >
                <div className="card bg-base-100 shadow-xl border border-sky-900 overflow-hidden">
                  <figure>
                    <video
                      src={video.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-64 w-full object-cover"
                    ></video>
                  </figure>

                  <div className="card-body bg-black">
                    <h2 className="card-title text-sky-400">
                      {video.title}
                    </h2>

                    <p className="text-gray-300 text-sm">
                      {video.desc}
                    </p>

                   
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-6">
            <p className="text-gray-500 text-sm">
              ← Swipe to explore →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiVideo;