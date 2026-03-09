import { useState, useEffect } from "react";
import {
  BookOpen,
  FlaskConical,
  Calculator,
  Trophy,
  Star,
  ArrowRight,
  Users,
  Target,
  Zap,
  GraduationCap,
  ChevronRight,
  Atom,
  Brain,
} from "lucide-react";

const stats = [
  { icon: Trophy, label: "IIT Selections", value: "2,400+", color: "text-yellow-400" },
  { icon: Users, label: "Students Enrolled", value: "15,000+", color: "text-blue-400" },
  { icon: Target, label: "NEET Qualifiers", value: "3,800+", color: "text-green-400" },
  { icon: Star, label: "Years of Excellence", value: "18+", color: "text-purple-400" },
];

const floatingBadges = [
  { icon: Atom, text: "Physics", color: "bg-blue-500/20 border-blue-400/40 text-blue-300", pos: "top-16 left-4 md:top-24 md:left-10" },
  { icon: FlaskConical, text: "Chemistry", color: "bg-green-500/20 border-green-400/40 text-green-300", pos: "top-8 right-4 md:top-16 md:right-10" },
  { icon: Calculator, text: "Mathematics", color: "bg-yellow-500/20 border-yellow-400/40 text-yellow-300", pos: "bottom-32 left-4 md:bottom-40 md:left-6" },
  { icon: Brain, text: "Biology", color: "bg-pink-500/20 border-pink-400/40 text-pink-300", pos: "bottom-16 right-4 md:bottom-24 md:right-8" },
];

const shayaris = [
  { hindi: "मंजिल उन्हीं को मिलती है, जिनके सपनों में जान होती है।", english: "Only those reach the destination, who have life in their dreams." },
  { hindi: "पढ़ लो आज, वरना कल पछतावा होगा — IIT का दरवाज़ा मेहनत से खुलता है।", english: "Study today, or regret tomorrow — IIT's door opens only with hard work." },
  { hindi: "हर रात की पढ़ाई, एक नई सुबह की नींव रखती है।", english: "Every night of study lays the foundation for a bright new morning." },
];

export default function Hero() {
  const [shayariIndex, setShayariIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setShayariIndex((i) => (i + 1) % shayaris.length);
        setVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050a18] relative overflow-hidden font-sans">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Noto+Sans+Devanagari:wght@400;600&display=swap');
        * { font-family: 'Sora', sans-serif; }
        .devanagari { font-family: 'Noto Sans Devanagari', sans-serif; }
        @keyframes floatY { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
        @keyframes pulseGlow { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes rotateOrbit { from{transform:rotate(0deg) translateX(120px) rotate(0deg)} to{transform:rotate(360deg) translateX(120px) rotate(-360deg)} }
        .float-1 { animation: floatY 4s ease-in-out infinite; }
        .float-2 { animation: floatY 5s ease-in-out infinite 1s; }
        .float-3 { animation: floatY 3.5s ease-in-out infinite 0.5s; }
        .float-4 { animation: floatY 4.5s ease-in-out infinite 1.5s; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .shayari-fade { transition: opacity 0.5s ease; }
        .shayari-visible { opacity: 1; }
        .shayari-hidden { opacity: 0; }
        .glow-blue { box-shadow: 0 0 40px rgba(59,130,246,0.3); }
        .glow-purple { box-shadow: 0 0 60px rgba(139,92,246,0.2); }
        .grid-bg { background-image: linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px); background-size: 50px 50px; }
        .text-gradient { background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .btn-glow:hover { box-shadow: 0 0 30px rgba(59,130,246,0.6); }
        .stat-card:hover { transform: translateY(-4px); }
      `}</style>

      {/* Ambient Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-3xl" />

      {/* Navbar */}
      <nav className="relative z-20 border-b border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Apex<span className="text-gradient">IIT</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            {["Courses", "Results", "Faculty", "Test Series", "About"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors duration-200">{item}</a>
            ))}
          </div>
          <button className="btn btn-sm bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-xl btn-glow transition-all duration-300">
            Enroll Now
          </button>
        </div>
      </nav>

      {/* Hero Main */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 lg:pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-6 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm">
              <Zap size={14} className="text-yellow-400" />
              <span>India's #1 IIT JEE & NEET Coaching Institute</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Crack{" "}
                <span className="text-gradient">IIT JEE</span>
                <br />& <span className="text-gradient">NEET</span> with
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Confidence.
              </h1>
            </div>

            {/* Shayari Block */}
            <div className={`shayari-fade ${visible ? "shayari-visible" : "shayari-hidden"} bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm`}>
              <p className="devanagari text-base text-indigo-200 font-semibold leading-relaxed mb-2">
                "{shayaris[shayariIndex].hindi}"
              </p>
              <p className="text-sm text-gray-400 italic">
                — {shayaris[shayariIndex].english}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-lg">
              Expert faculty, proven methodology, and personalized attention to help every student unlock their potential and secure top ranks in JEE & NEET.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 btn-glow">
                Start Free Trial
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm hover:bg-white/5">
                View Results
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Quick Highlights */}
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { icon: BookOpen, text: "Study Material Included" },
                { icon: FlaskConical, text: "Lab Practicals" },
                { icon: Target, text: "Mock Tests Weekly" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
                  <Icon size={14} className="text-blue-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative flex items-center justify-center h-[380px] sm:h-[420px] lg:h-[500px]">
            {/* Central Orb */}
            <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-full bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 glow-blue flex flex-col items-center justify-center shadow-2xl border border-white/10">
              <GraduationCap size={48} className="text-white mb-2" />
              <span className="text-white font-bold text-lg">APEX IIT</span>
              <span className="text-blue-200 text-xs">Est. 2006</span>
            </div>

            {/* Orbit Rings */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border border-blue-400/15" />
            <div className="absolute w-96 h-96 sm:w-[420px] sm:h-[420px] rounded-full border border-purple-400/10" style={{ display: window?.innerWidth < 640 ? 'none' : undefined }} />

            {/* Floating Subject Badges */}
            {floatingBadges.map(({ icon: Icon, text, color, pos }, i) => (
              <div
                key={text}
                className={`absolute ${pos} flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-md ${color} text-xs font-semibold float-${i + 1}`}
              >
                <Icon size={14} />
                {text}
              </div>
            ))}

            {/* Rank Badge */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-2 lg:right-4 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 rounded-xl px-3 py-2 text-xs font-bold backdrop-blur-md float-2">
              🏆 AIR 1 - 2024
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value, color }, i) => (
            <div
              key={label}
              className="stat-card bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm text-center transition-all duration-300 hover:border-white/20 hover:bg-white/8"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Icon size={24} className={`${color} mx-auto mb-3`} />
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{value}</div>
              <div className="text-gray-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Scrolling Announcement */}
        <div className="mt-8 bg-blue-600/10 border border-blue-400/20 rounded-full px-6 py-3 flex items-center gap-3 overflow-hidden">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest whitespace-nowrap">🎯 Live Now</span>
          <div className="overflow-hidden flex-1">
            <div className="text-sm text-gray-300 whitespace-nowrap">
              Admissions Open for JEE 2026 Batch · Free Demo Class Every Saturday 10AM · New NEET Biology Batch Starting 15th March · Download Free Study Material →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}