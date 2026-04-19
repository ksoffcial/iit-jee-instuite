import React, { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react'

const Feedback = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const studentDetails = [
    {
      photo: "https://res.cloudinary.com/dkt7ksipv/image/upload/v1773054743/kolkata-models-jnWg8cryH9U-unsplash-removebg-preview_ch30eb.png",
      Name: 'Isha Shah',
      course: "IIT-JEE",
      review: "This is the best institute in Bihar. The faculty is exceptional and the study material is top-notch. I cleared my exam in the first attempt!",
      rating: 5,
      year: "2024"
    },
    {
      photo: "https://res.cloudinary.com/dkt7ksipv/image/upload/v1773054743/kolkata-models-jnWg8cryH9U-unsplash-removebg-preview_ch30eb.png",
      Name: 'Riya Verma',
      course: "NEET",
      review: "Incredible teaching methodology and supportive mentors. The mock tests really helped me understand my weak areas and improve significantly.",
      rating: 5,
      year: "2024"
    },
    {
      photo: "https://res.cloudinary.com/dkt7ksipv/image/upload/v1773054743/kolkata-models-jnWg8cryH9U-unsplash-removebg-preview_ch30eb.png",
      Name: 'Priya Sharma',
      course: "IIT-JEE Advanced",
      review: "The structured approach and dedicated teachers made all the difference. I would highly recommend this institute to every serious aspirant.",
      rating: 4,
      year: "2023"
    },
  ]

  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? studentDetails.length - 1 : prev - 1))
  const handleNext = () => setActiveIndex((prev) => (prev === studentDetails.length - 1 ? 0 : prev + 1))

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16 px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
          <GraduationCap size={16} />
          Student Testimonials
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Students Say</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
          Real stories from students who achieved their dreams with us.
        </p>
      </div>

      {/* Cards Grid — md+ shows all, sm shows carousel */}
      <>
        {/* MOBILE: Carousel */}
        <div className="block md:hidden max-w-sm mx-auto">
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl">
            <Quote className="text-blue-400 mb-4 opacity-60" size={32} />
            <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
              "{studentDetails[activeIndex].review}"
            </p>
            <div className="flex items-center gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < studentDetails[activeIndex].rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5">
                <img
                  src={studentDetails[activeIndex].photo}
                  alt={studentDetails[activeIndex].Name}
                  className="w-full h-full rounded-full object-cover bg-slate-800"
                />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{studentDetails[activeIndex].Name}</p>
                <p className="text-blue-400 text-xs">{studentDetails[activeIndex].course} · {studentDetails[activeIndex].year}</p>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button onClick={handlePrev} className="btn btn-circle btn-sm bg-white/10 border-white/20 text-white hover:bg-blue-500">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {studentDetails.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-blue-400 w-5' : 'bg-slate-600'}`}
                />
              ))}
            </div>
            <button onClick={handleNext} className="btn btn-circle btn-sm bg-white/10 border-white/20 text-white hover:bg-blue-500">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* TABLET & DESKTOP: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {studentDetails.map((student, index) => (
            <div
              key={index}
              className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-blue-400/40 rounded-3xl p-6 lg:p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/10 hover:shadow-2xl"
            >
              {/* Glow accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all duration-500 -z-0" />

              <div className="relative z-10">
                <Quote className="text-blue-400 mb-4 opacity-50 group-hover:opacity-80 transition-opacity" size={28} />

                <p className="text-slate-300 text-sm lg:text-base leading-relaxed mb-5 italic">
                  "{student.review}"
                </p>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < student.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}
                    />
                  ))}
                  <span className="text-slate-500 text-xs ml-1">({student.rating}.0)</span>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 mb-5" />

                {/* Student Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 flex-shrink-0">
                    <img
                      src={student.photo}
                      alt={student.Name}
                      className="w-full h-full rounded-full object-cover bg-slate-800"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm lg:text-base">{student.Name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <GraduationCap size={12} className="text-blue-400" />
                      <p className="text-blue-400 text-xs">{student.course}</p>
                      <span className="text-slate-600 text-xs">· {student.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>

      {/* Bottom CTA */}
      <div className="text-center mt-14">
        <p className="text-slate-400 text-sm mb-4">Join 10,000+ students who transformed their futures</p>
        <button className="btn bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-none text-white px-8 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
          Read More Reviews
        </button>
      </div>
    </section>
  )
}

export default Feedback