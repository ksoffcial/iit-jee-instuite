import { useState, useEffect, useRef } from 'react'
import { GraduationCap, Clock, Star, ChevronRight, ChevronLeft, BookOpen, Award } from 'lucide-react'
import axiosClient from '../utils/axisoClient';

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation,Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const subjectColors = {
  Engineering: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
  Biology: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
  Programming: { bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-300' },
  Physics: { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-300' },
  Medicine: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-300' },
  Chemistry: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-300' },
}

const MentorCard = ({ data, index }) => {
  const color = subjectColors[data.subject] || subjectColors.Engineering

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-stone-100"
    >
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #f59e0b, #f97316)' }} />

      <div className="relative overflow-hidden h-56 sm:h-52 lg:h-60 bg-stone-100">
        <img
          src={data.image}
          alt={data.mentorName}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.mentorName)}&size=400&background=f3f0eb&color=92400e&bold=true`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold border ${color.bg} ${color.text} ${color.border} backdrop-blur-sm uppercase tracking-wider`}>
          {data.subject}
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-stone-800">{data.rating}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="text-lg font-bold text-stone-900 leading-tight">{data.mentorName}</h3>

        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2 text-stone-600">
            <GraduationCap size={15} className="mt-0.5 shrink-0 text-amber-600" />
            <span className="text-sm leading-snug line-clamp-1">{data.degree}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <Clock size={15} className="shrink-0 text-amber-600" />
            <span className="text-sm font-medium">{data.experince} Experience</span>
          </div>
        </div>

        <div className="border-t border-stone-100 mt-auto pt-3">
          <button className="w-full btn btn-sm bg-stone-900 hover:bg-amber-600 text-white border-none normal-case rounded-xl h-11">
            <BookOpen size={14} />
            View Profile
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

const Mentor = () => {
  const [teachers, setTeachers] = useState([])
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get("/mentor/getMentor")
      setTeachers(response.data)
    } catch (err) {
      console.log("Error fetching mentors: " + err.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section className="min-h-screen bg-[#faf8f5] py-16 px-4">
      {/* Header section remains the same */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-sm font-semibold mb-4">
          <Award size={14} />
          Expert Educators
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-stone-900 mb-4 font-serif">
          Meet Your <span className="text-amber-600">Mentors</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative group">
        
        {/* Navigation Buttons - Hidden on very small screens, visible on hover */}
        <button 
          ref={prevRef}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 btn btn-circle bg-white shadow-xl border-none hover:bg-amber-500 hover:text-white transition-all duration-300 hidden md:flex"
        >
          <ChevronLeft />
        </button>
        
        <button 
          ref={nextRef}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 btn btn-circle bg-white shadow-xl border-none hover:bg-amber-500 hover:text-white transition-all duration-300 hidden md:flex"
        >
          <ChevronRight />
        </button>

        {/* Carousel / Grid Logic */}
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          autoplay={{
            delay: 2500, // 2.5 seconds for a smooth professional feel
            disableOnInteraction: false,
          }}
          breakpoints={{
            // Desktop: Show Grid (3 slides)
            1024: {
              slidesPerView: 3,
              autoplay: false, // Optional: disable auto-scroll on desktop
            },
            // Tablet: Show 2 slides
            640: {
              slidesPerView: 2,
            }
          }}
          className="pb-12"
        >
          {teachers.map((teacher, idx) => (
            <SwiperSlide key={idx} className="h-auto">
              <MentorCard data={teacher} index={idx} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile-only Navigation Buttons (Floating style) */}
        <div className="flex justify-center gap-4 mt-4 md:hidden">
            <button onClick={() => prevRef.current?.click()} className="btn btn-circle bg-stone-900 text-white"><ChevronLeft size={20}/></button>
            <button onClick={() => nextRef.current?.click()} className="btn btn-circle bg-stone-900 text-white"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-14 text-center">
        <button className="btn btn-outline border-2 border-stone-900 hover:bg-stone-900 rounded-full px-8">
          Become a Mentor
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  )
}

export default Mentor;