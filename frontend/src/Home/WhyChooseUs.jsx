import React from 'react'
import {
  Trophy, Users, BookOpen, Clock, Star, ShieldCheck,
  TrendingUp, Headphones, ArrowRight, CheckCircle2, Zap
} from 'lucide-react'

const stats = [
  { value: '15K+', label: 'Students Enrolled' },
  { value: '98%', label: 'Success Rate' },
  { value: '200+', label: 'Expert Faculty' },
  { value: '12+', label: 'Years of Excellence' },
]

const features = [
  {
    icon: Trophy,
    title: 'Proven Track Record',
    description: 'Over 5,000 students have cracked IIT-JEE & NEET with top ranks. Our results speak louder than words.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    tag: 'Top Ranked'
  },
  {
    icon: Users,
    title: 'Expert Faculty',
    description: 'Learn from IITians, doctors, and PhD holders who have mastered both the subject and the art of teaching.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    tag: 'IIT Alumni'
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Study Material',
    description: 'Meticulously designed content covering every concept, with practice sheets and PYQ banks updated yearly.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    tag: 'Updated 2024'
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Choose from morning, evening, or weekend batches. Study at your own pace with recorded lectures 24/7.',
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    tag: 'Anytime Access'
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description: 'Real-time dashboards tracking your progress, chapter-wise weakness reports, and smart revision plans.',
    color: 'from-rose-500 to-pink-500',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    tag: 'Smart Insights'
  },
  {
    icon: Headphones,
    title: '24/7 Doubt Support',
    description: 'Never get stuck — reach our mentors via chat, video call, or doubt sessions any time of day or night.',
    color: 'from-sky-500 to-indigo-500',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    tag: 'Always On'
  },
]

const highlights = [
  'Free demo classes available',
  'Scholarship for meritorious students',
  'Small batch sizes for personal attention',
  'Regular parent-teacher meetings',
  'AI-powered mock test engine',
  'Offline & online hybrid model',
]

const WhyChooseUs = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">

      {/* Background decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/25 text-blue-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5 backdrop-blur-sm tracking-wide uppercase">
            <Zap size={13} className="fill-blue-400 text-blue-400" />
            Why Students Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 tracking-tight">
            The Institute That{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400">
                Transforms
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-60" />
            </span>
            {' '}Futures
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            We don't just prepare students for exams — we build confident, capable individuals ready to conquer every challenge life throws at them.
          </p>
        </div>

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-14 sm:mb-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/30 rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 backdrop-blur-sm"
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-300 mb-1">
                {stat.value}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Feature Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-14 sm:mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`group relative ${feature.bg} border ${feature.border} hover:border-opacity-60 rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl backdrop-blur-sm overflow-hidden`}
              >
                {/* Card glow */}
                <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 rounded-full blur-2xl transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon + Tag row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${feature.color} text-white shadow-sm`}>
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-base sm:text-lg mb-2.5 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Bottom Banner ── */}
        <div className="relative bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-teal-500/20 border border-blue-500/25 rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent rounded-3xl" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
            {/* Left: Highlights */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={20} className="text-cyan-400" />
                <h3 className="text-white font-bold text-lg sm:text-xl">Everything Included</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-col items-start lg:items-center gap-4 flex-shrink-0">
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="text-amber-400 fill-amber-400" />
                ))}
                <span className="text-slate-300 text-sm ml-1.5 font-medium">4.9 / 5 Rating</span>
              </div>
              <button className="group/btn flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold px-7 py-3.5 rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-400/40 transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base">
                Start Your Journey
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
              </button>
              <p className="text-slate-500 text-xs text-center">No commitment · Free demo available</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUs