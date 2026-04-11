import { useState, useEffect } from 'react'
import { GraduationCap, Clock, Star, ChevronRight, BookOpen, Award } from 'lucide-react'
import axiosClient from '../utils/axisoClient'; 

const subjectColors = {
  Engineering: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
  Biology: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
  Programming: { bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-300' },
  Physics: { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-300' },
  Medicine: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-300' },
  Chemistry: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-300' },
}

const MentorCard = ({ data, index }) => {
  const [hovered, setHovered] = useState(false)
  const color = subjectColors[data.subject] || subjectColors.Engineering

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, #f59e0b, #f97316)' }}
      />

      {/* Image area */}
      <div className="relative overflow-hidden h-56 sm:h-52 lg:h-60 bg-stone-100">
        <img
          src={data.image}
          alt={data.mentorName}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.mentorName)}&size=400&background=f3f0eb&color=92400e&bold=true&font-size=0.4`
          }} // ← was data.name, fixed to data.mentorName
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border ${color.bg} ${color.text} ${color.border} backdrop-blur-sm`}>
          {data.subject}
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-stone-800">{data.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="text-lg font-bold text-stone-900 leading-tight">{data.mentorName}</h3>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2 text-stone-600">
            <GraduationCap size={15} className="mt-0.5 shrink-0 text-amber-600" />
            <span className="text-sm leading-snug">{data.degree}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <Clock size={15} className="shrink-0 text-amber-600" />
            <span className="text-sm font-medium">{data.experince} Experience</span>
          </div>
        </div>

        <div className="border-t border-stone-100 mt-auto pt-3">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-amber-600 transition-colors duration-300 group/btn">
            <BookOpen size={14} />
            <span>View Profile</span>
            <ChevronRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

const Mentor = () => {
  // ← Moved teachers state + fetchData here, where it's actually used
  const [teachers, setTeachers] = useState([])

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
    <section className="min-h-screen bg-[#faf8f5] py-16 px-4 sm:px-6 lg:px-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-sm font-semibold mb-4">
          <Award size={14} />
          Expert Educators
        </div>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 leading-tight tracking-tight mb-4"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Meet Your{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-amber-600">Mentors</span>
            <span
              className="absolute bottom-1 left-0 w-full h-3 bg-amber-200 -z-0 rounded"
              style={{ transform: 'skewX(-3deg)' }}
            />
          </span>
        </h1>
        <p className="text-stone-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Learn from India's most experienced educators, handpicked for their expertise and passion for teaching.
        </p>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-lg mx-auto">
          {[
            { value: teachers?.length, label: 'Expert Mentors' },
            { value: '500+', label: 'Students Taught' },
            { value: '4.8★', label: 'Avg. Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center bg-white rounded-2xl py-4 px-3 shadow-sm border border-stone-100">
              <div className="text-2xl font-black text-amber-600">{stat.value}</div>
              <div className="text-xs text-stone-500 mt-0.5 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
        {teachers.map((teacher, idx) => (
          <MentorCard key={idx} data={teacher} index={idx} />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto mt-14 text-center">
        <p className="text-stone-500 text-sm mb-4">Want to join our teaching team?</p>
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-stone-900 text-stone-900 font-bold text-sm hover:bg-stone-900 hover:text-white transition-all duration-300">
          Become a Mentor
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  )
}

export default Mentor