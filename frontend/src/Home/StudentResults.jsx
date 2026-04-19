import React, { useState } from 'react'
import {
  Trophy, Medal, Star, TrendingUp, Award, Crown,
  BookOpen, Target, Zap, ChevronRight, GraduationCap,
  BadgeCheck, Flame, ArrowUpRight
} from 'lucide-react'

const filters = ['All', 'IIT-JEE', 'NEET', 'Foundation']

const toppers = [
  {
    name: 'Arjun Mehta',
    rank: 'AIR 7',
    exam: 'IIT-JEE Advanced',
    score: '312/360',
    year: '2024',
    college: 'IIT Bombay — CS',
    badge: 'crown',
    category: 'IIT-JEE',
    avatar: 'AM',
    color: 'from-amber-400 to-orange-500',
    bg: 'from-amber-950/60 to-orange-950/40',
    border: 'border-amber-500/40',
  },
  {
    name: 'Priya Sharma',
    rank: 'AIR 14',
    exam: 'NEET UG',
    score: '710/720',
    year: '2024',
    college: 'AIIMS Delhi',
    badge: 'crown',
    category: 'NEET',
    avatar: 'PS',
    color: 'from-rose-400 to-pink-500',
    bg: 'from-rose-950/60 to-pink-950/40',
    border: 'border-rose-500/40',
  },
  {
    name: 'Rohit Verma',
    rank: 'AIR 31',
    exam: 'IIT-JEE Advanced',
    score: '298/360',
    year: '2024',
    college: 'IIT Delhi — EE',
    badge: 'medal',
    category: 'IIT-JEE',
    avatar: 'RV',
    color: 'from-blue-400 to-cyan-500',
    bg: 'from-blue-950/60 to-cyan-950/40',
    border: 'border-blue-500/40',
  },
  {
    name: 'Sneha Patel',
    rank: 'AIR 52',
    exam: 'NEET UG',
    score: '705/720',
    year: '2024',
    college: 'AIIMS Jodhpur',
    badge: 'medal',
    category: 'NEET',
    avatar: 'SP',
    color: 'from-emerald-400 to-teal-500',
    bg: 'from-emerald-950/60 to-teal-950/40',
    border: 'border-emerald-500/40',
  },
  {
    name: 'Karan Singh',
    rank: 'AIR 88',
    exam: 'IIT-JEE Main',
    score: '99.7%ile',
    year: '2024',
    college: 'IIT Madras — Mech',
    badge: 'star',
    category: 'IIT-JEE',
    avatar: 'KS',
    color: 'from-violet-400 to-purple-500',
    bg: 'from-violet-950/60 to-purple-950/40',
    border: 'border-violet-500/40',
  },
  {
    name: 'Anjali Rao',
    rank: 'AIR 103',
    exam: 'NEET UG',
    score: '698/720',
    year: '2024',
    college: 'Maulana Azad Medical',
    badge: 'star',
    category: 'NEET',
    avatar: 'AR',
    color: 'from-sky-400 to-indigo-500',
    bg: 'from-sky-950/60 to-indigo-950/40',
    border: 'border-sky-500/40',
  },
  {
    name: 'Dev Agarwal',
    rank: 'AIR 145',
    exam: 'IIT-JEE Main',
    score: '99.4%ile',
    year: '2023',
    college: 'IIT Roorkee — Civil',
    badge: 'star',
    category: 'IIT-JEE',
    avatar: 'DA',
    color: 'from-fuchsia-400 to-pink-500',
    bg: 'from-fuchsia-950/60 to-pink-950/40',
    border: 'border-fuchsia-500/40',
  },
  {
    name: 'Meera Nair',
    rank: 'AIR 178',
    exam: 'NEET UG',
    score: '692/720',
    year: '2023',
    college: 'Lady Hardinge Medical',
    badge: 'star',
    category: 'NEET',
    avatar: 'MN',
    color: 'from-lime-400 to-green-500',
    bg: 'from-lime-950/60 to-green-950/40',
    border: 'border-lime-500/40',
  },
  {
    name: 'Rishi Jain',
    rank: 'AIR 212',
    exam: 'Foundation',
    score: '98.2%',
    year: '2024',
    college: 'Navodaya Vidyalaya',
    badge: 'star',
    category: 'Foundation',
    avatar: 'RJ',
    color: 'from-orange-400 to-red-500',
    bg: 'from-orange-950/60 to-red-950/40',
    border: 'border-orange-500/40',
  },
]

const achievements = [
  { icon: Crown, value: '5,200+', label: 'Total Selections', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { icon: Target, value: '847', label: 'IIT Selections (2024)', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { icon: Flame, value: '1,230', label: 'NEET Qualifiers', color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { icon: TrendingUp, value: '98%', label: 'Pass Rate', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
]

const BadgeIcon = ({ type, size = 16 }) => {
  if (type === 'crown') return <Crown size={size} className="text-amber-400 fill-amber-400" />
  if (type === 'medal') return <Medal size={size} className="text-slate-300 fill-slate-300" />
  return <Star size={size} className="text-cyan-400 fill-cyan-400" />
}

const StudentResults = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? toppers
    : toppers.filter(s => s.category === activeFilter)

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">

      {/* Background blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-400/25 text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5 tracking-widest uppercase backdrop-blur-sm">
            <Trophy size={13} className="fill-amber-400 text-amber-400" />
            Hall of Fame · 2024
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 tracking-tight">
            Our{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400">
                Star Performers
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full opacity-50" />
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Every rank here represents years of hard work, late nights, and relentless ambition — powered by our world-class guidance.
          </p>
        </div>

        {/* ── Achievement Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14">
          {achievements.map((a, i) => {
            const Icon = a.icon
            return (
              <div key={i} className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 transition-all duration-300 backdrop-blur-sm">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${a.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} className={a.color} />
                </div>
                <div>
                  <p className={`text-lg sm:text-2xl font-black ${a.color}`}>{a.value}</p>
                  <p className="text-slate-400 text-xs sm:text-sm leading-tight">{a.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Filter Tabs ── */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 
                ${activeFilter === f
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400/50 text-white shadow-lg shadow-amber-500/25'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/25 hover:bg-white/10'
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── TOP 3 Hero Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-5">
          {filtered.slice(0, 3).map((student, i) => (
            <div
              key={student.name}
              className={`relative group bg-gradient-to-br ${student.bg} border ${student.border} rounded-3xl p-6 sm:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl backdrop-blur-sm`}
            >
              {/* Glow */}
              <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${student.color} opacity-15 group-hover:opacity-25 rounded-full blur-2xl transition-opacity duration-500`} />

              {/* Rank badge */}
              <div className="absolute top-4 right-4">
                <BadgeIcon type={student.badge} size={20} />
              </div>

              <div className="relative z-10">
                {/* Avatar */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${student.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <span className="text-white font-black text-lg sm:text-xl">{student.avatar}</span>
                </div>

                <h3 className="text-white font-black text-lg sm:text-xl mb-0.5">{student.name}</h3>
                <p className="text-slate-400 text-xs mb-3">{student.college}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-black px-3 py-1 rounded-full bg-gradient-to-r ${student.color} text-white`}>
                    {student.rank}
                  </span>
                  <span className="text-xs text-slate-400 border border-white/10 px-2.5 py-1 rounded-full">{student.exam}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-xs">Score</p>
                    <p className="text-white font-bold text-sm">{student.score}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-xs">Year</p>
                    <p className="text-white font-bold text-sm">{student.year}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Remaining Results Grid ── */}
        {filtered.length > 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-12">
            {filtered.slice(3).map((student) => (
              <div
                key={student.name}
                className={`group flex items-center gap-4 bg-white/4 hover:bg-white/8 border border-white/8 hover:${student.border} rounded-2xl px-4 sm:px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${student.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <span className="text-white font-black text-xs sm:text-sm">{student.avatar}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="text-white font-bold text-sm truncate">{student.name}</p>
                    <BadgeIcon type={student.badge} size={12} />
                  </div>
                  <p className="text-slate-500 text-xs truncate">{student.college}</p>
                </div>

                {/* Rank */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-xs font-black text-transparent bg-clip-text bg-gradient-to-r ${student.color}`}>{student.rank}</p>
                  <p className="text-slate-500 text-xs">{student.year}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Bottom CTA Banner ── */}
        <div className="relative bg-gradient-to-r from-amber-600/15 via-orange-500/10 to-yellow-500/15 border border-amber-500/25 rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-transparent rounded-3xl" />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-400/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <GraduationCap size={22} className="text-amber-400" />
              <span className="text-amber-300 font-bold text-sm sm:text-base tracking-wide">Your name could be here next year</span>
            </div>
            <h3 className="text-white font-black text-xl sm:text-2xl lg:text-3xl mb-2">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-slate-400 text-sm sm:text-base mb-7 max-w-lg mx-auto">
              Join thousands of students who trusted us with their dreams — and made them real.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold px-7 py-3.5 rounded-2xl shadow-xl shadow-amber-500/30 hover:shadow-amber-400/40 transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base">
                <Zap size={16} className="fill-white" />
                Enroll Now — Free Demo
                <ArrowUpRight size={16} />
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 hover:border-amber-400/40 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all duration-300 text-sm sm:text-base">
                <BookOpen size={15} />
                View Full Results
                <ChevronRight size={15} />
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 flex-wrap">
              {[
                { icon: BadgeCheck, text: '5,200+ total selections' },
                { icon: Star, text: 'Ranked #1 in Bihar' },
                { icon: Award, text: '12 years of excellence' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Icon size={13} className="text-amber-400" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default StudentResults