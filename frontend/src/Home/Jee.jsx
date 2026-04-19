import React, { useState } from "react";
import {
  Atom, FlaskConical, Calculator, Brain, Microscope, BookOpen,
  Clock, FileText, Target, Calendar, CircleDot, GraduationCap,
  CheckCircle, ChevronRight, Users, Trophy, TrendingUp, ArrowRight,
} from "lucide-react";

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const EXAMS = [
  {
    id: "jee-mains",
    short: "JEE Main",
    tag: "Engineering · NTA",
    full: "Joint Entrance Examination — Mains",
    conducted: "NTA (National Testing Agency)",
    icon: Calculator,
    badge: "Engineering",
    accent: "#2563eb",
    glow: "rgba(37,99,235,0.18)",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    duration: "3 Hours",
    questions: "75 Questions",
    marks: "300 Marks",
    attempts: "2 per year",
    mode: "Computer Based Test",
    eligibility: "12th Pass / Appearing",
    highlights: [
      "Gateway to 31 NITs, 25 IIITs & 28 GFTIs",
      "Qualifier for JEE Advanced",
      "Held twice a year — January & April",
      "Available in 13 regional languages",
      "Negative marking: −1 for wrong MCQ answers",
    ],
    stats: [
      { label: "Aspirants", value: "12L+" },
      { label: "NITs + IIITs", value: "56" },
      { label: "Top Cutoff", value: "99.8 %ile" },
    ],
  },
  {
    id: "jee-advanced",
    short: "JEE Advanced",
    tag: "IITs · Most Prestigious",
    full: "Joint Entrance Examination — Advanced",
    conducted: "IITs (on rotation annually)",
    icon: Brain,
    badge: "Premium",
    accent: "#6366f1",
    glow: "rgba(99,102,241,0.18)",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    duration: "6 Hours (2 Papers)",
    questions: "54 Questions per paper",
    marks: "360 Marks total",
    attempts: "2 consecutive years",
    mode: "Computer Based Test",
    eligibility: "Top 2.5 Lakh JEE Main qualifiers",
    highlights: [
      "Only route to all 23 IITs in India",
      "Toughest engineering entrance in the world",
      "Paper 1 (3 hrs) + Paper 2 (3 hrs)",
      "Multiple question types — MCQ, Integer, Matrix",
      "No upper age limit for General category",
    ],
    stats: [
      { label: "Eligible", value: "2.5L" },
      { label: "IITs", value: "23" },
      { label: "Seats", value: "17,385" },
    ],
  },
  {
    id: "neet",
    short: "NEET-UG",
    tag: "Medical · NTA",
    full: "National Eligibility cum Entrance Test",
    conducted: "NTA (National Testing Agency)",
    icon: Microscope,
    badge: "Medical",
    accent: "#0891b2",
    glow: "rgba(8,145,178,0.18)",
    subjects: ["Physics", "Chemistry", "Botany", "Zoology"],
    duration: "3 Hours 20 Min",
    questions: "180 Questions",
    marks: "720 Marks",
    attempts: "No limit (age ≤ 25 yrs General)",
    mode: "Pen & Paper (OMR Sheet)",
    eligibility: "12th with PCB — min 50% marks",
    highlights: [
      "Only gateway to MBBS, BDS & AYUSH seats",
      "Covers all Govt & Private medical colleges",
      "1.5 lakh+ MBBS seats across India",
      "Conducted once a year (May)",
      "Qualifying marks valid for 3 years",
    ],
    stats: [
      { label: "Aspirants", value: "20L+" },
      { label: "Med Colleges", value: "700+" },
      { label: "MBBS Seats", value: "1.5L+" },
    ],
  },
];

const SUBJECT_CONFIG = {
  Physics:     { icon: Atom,        color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.28)" },
  Chemistry:   { icon: FlaskConical,color: "#06b6d4", bg: "rgba(6,182,212,0.12)",   border: "rgba(6,182,212,0.28)" },
  Mathematics: { icon: Calculator,  color: "#818cf8", bg: "rgba(129,140,248,0.12)", border: "rgba(129,140,248,0.28)" },
  Botany:      { icon: BookOpen,    color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.28)" },
  Zoology:     { icon: Microscope,  color: "#2dd4bf", bg: "rgba(45,212,191,0.12)",  border: "rgba(45,212,191,0.28)" },
};

/* ═══════════════════════════════════════════════
   SUBJECT PILL
═══════════════════════════════════════════════ */
const SubjectPill = ({ name }) => {
  const cfg = SUBJECT_CONFIG[name] ?? { icon: BookOpen, color: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.28)" };
  const Icon = cfg.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      <Icon size={11} />{name}
    </span>
  );
};

/* ═══════════════════════════════════════════════
   EXAM SELECTOR TAB
═══════════════════════════════════════════════ */
const ExamTab = ({ exam, isActive, onClick }) => {
  const Icon = exam.icon;
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 w-full sm:w-auto"
      style={{
        background: isActive ? `${exam.glow}` : "rgba(255,255,255,0.03)",
        border: `1.5px solid ${isActive ? exam.accent + "70" : "rgba(255,255,255,0.08)"}`,
        color: isActive ? "white" : "rgba(255,255,255,0.45)",
        boxShadow: isActive ? `0 0 24px ${exam.glow}` : "none",
        transform: isActive ? "translateY(-2px)" : "none",
      }}
    >
      {/* active indicator dot */}
      {isActive && (
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full" style={{ background: exam.accent }} />
      )}
      <div className="p-2 rounded-xl" style={{ background: isActive ? `${exam.accent}28` : "rgba(255,255,255,0.05)" }}>
        <Icon size={20} style={{ color: isActive ? exam.accent : "rgba(255,255,255,0.35)" }} />
      </div>
      <span className="leading-tight text-center">{exam.short}</span>
    </button>
  );
};

/* ═══════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════ */
export default function Jee() {
  const [active, setActive] = useState(EXAMS[0]);

  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "#04080f", fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Syne:wght@700;800&display=swap');
        .syne { font-family: 'Syne', sans-serif; }
        .fade-in { animation: fu 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes fu { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .grid-dots {
          background-image: radial-gradient(rgba(37,99,235,0.18) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .detail-row:nth-child(even) { background: rgba(255,255,255,0.025); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(37,99,235,0.3); border-radius: 99px; }
      `}</style>

      {/* background dot grid */}
      <div className="absolute inset-0 grid-dots opacity-60 pointer-events-none" />

      {/* ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{ background: active.glow, opacity: 0.5 }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(37,99,235,0.08)" }} />

      <div className="max-w-6xl mx-auto relative">

        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)" }}>
            <GraduationCap size={13} className="text-blue-400" />
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Choose Your Exam</span>
          </div>
          <h2 className="syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3">
            JEE{" "}
            <span style={{ background: "linear-gradient(90deg,#60a5fa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              & NEET
            </span>{" "}
            Preparation
          </h2>
          <p className="text-blue-200/40 text-sm sm:text-base max-w-lg mx-auto">
            Explore detailed exam information — syllabus, pattern, eligibility and key highlights for each exam.
          </p>
        </div>

        {/* ── Exam Tabs ── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          {EXAMS.map((exam) => (
            <ExamTab key={exam.id} exam={exam} isActive={active.id === exam.id} onClick={() => setActive(exam)} />
          ))}
        </div>

        {/* ── Active Exam Detail Panel ── */}
        <div
          key={active.id}
          className="fade-in rounded-3xl overflow-hidden"
          style={{
            background: "#07101f",
            border: `1px solid ${active.accent}35`,
            boxShadow: `0 0 0 1px ${active.accent}15, 0 32px 80px rgba(0,0,0,0.6)`,
          }}
        >
          {/* coloured top bar */}
          <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${active.accent}, #60a5fa, ${active.accent}40)` }} />

          {/* panel header */}
          <div className="px-6 sm:px-10 py-7 border-b" style={{ background: `linear-gradient(135deg, ${active.glow}, transparent)`, borderColor: `${active.accent}20` }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="p-4 rounded-2xl w-fit" style={{ background: `${active.accent}20`, border: `1px solid ${active.accent}35` }}>
                <active.icon size={30} style={{ color: active.accent }} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="syne text-2xl sm:text-3xl font-extrabold text-white">{active.short}</h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${active.accent}18`, color: active.accent, border: `1px solid ${active.accent}35` }}>
                    {active.badge}
                  </span>
                </div>
                <p className="text-white/40 text-sm">{active.full}</p>
                <p className="text-white/25 text-xs mt-0.5">Conducted by: {active.conducted}</p>
              </div>

              {/* quick stats (desktop) */}
              <div className="hidden lg:flex gap-3">
                {active.stats.map((s) => (
                  <div key={s.label} className="flex flex-col items-center px-5 py-3 rounded-xl text-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="syne text-xl font-extrabold text-white">{s.value}</span>
                    <span className="text-xs mt-0.5" style={{ color: active.accent }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* quick stats (mobile) */}
            <div className="flex gap-3 mt-5 lg:hidden">
              {active.stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center px-4 py-2.5 rounded-xl flex-1 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="syne text-lg font-extrabold text-white">{s.value}</span>
                  <span className="text-[11px] mt-0.5" style={{ color: active.accent }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Two-column body ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x" style={{ borderColor: `${active.accent}15` }}>

            {/* LEFT — Exam Details */}
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: active.accent }}>
                Exam Details
              </p>
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${active.accent}18` }}>
                {[
                  { icon: Clock,        label: "Duration",     value: active.duration },
                  { icon: FileText,     label: "Questions",    value: active.questions },
                  { icon: Target,       label: "Total Marks",  value: active.marks },
                  { icon: Calendar,     label: "Attempts",     value: active.attempts },
                  { icon: CircleDot,    label: "Exam Mode",    value: active.mode },
                  { icon: GraduationCap, label: "Eligibility", value: active.eligibility },
                ].map(({ icon: I, label, value }, i) => (
                  <div
                    key={label}
                    className="detail-row flex items-center gap-4 px-5 py-3.5 transition-colors"
                    style={i === 5 ? {} : { borderBottom: `1px solid ${active.accent}12` }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${active.accent}15` }}>
                      <I size={14} style={{ color: active.accent }} />
                    </div>
                    <span className="text-white/40 text-sm w-28 shrink-0">{label}</span>
                    <span className="text-white text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>

              {/* subjects */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: active.accent }}>Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {active.subjects.map((s) => <SubjectPill key={s} name={s} />)}
                </div>
              </div>
            </div>

            {/* RIGHT — Key Highlights */}
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: active.accent }}>
                Key Highlights
              </p>

              <div className="space-y-3 mb-7">
                {active.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3.5 rounded-xl transition-colors"
                    style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${active.accent}15` }}
                  >
                    <CheckCircle size={15} style={{ color: active.accent }} className="shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>

              {/* compare strip */}
              <div className="rounded-2xl p-5" style={{ background: `${active.accent}0d`, border: `1px solid ${active.accent}20` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: active.accent }}>
                  Compare All Exams
                </p>
                <div className="space-y-2">
                  {EXAMS.map((exam) => {
                    const isThis = exam.id === active.id;
                    return (
                      <button
                        key={exam.id}
                        onClick={() => setActive(exam)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all"
                        style={{
                          background: isThis ? `${exam.accent}20` : "rgba(255,255,255,0.03)",
                          border: `1px solid ${isThis ? exam.accent + "50" : "rgba(255,255,255,0.07)"}`,
                        }}
                      >
                        <exam.icon size={14} style={{ color: exam.accent }} />
                        <span className="flex-1 text-sm font-semibold" style={{ color: isThis ? "white" : "rgba(255,255,255,0.45)" }}>
                          {exam.short}
                        </span>
                        <span className="text-[11px]" style={{ color: exam.accent }}>{exam.tag}</span>
                        {isThis && <ChevronRight size={13} style={{ color: exam.accent }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA button */}
              <button
                className="w-full mt-5 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${active.accent}, #1e40af)`,
                  boxShadow: `0 8px 24px ${active.glow}`,
                }}
              >
                Start {active.short} Prep <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom 3-card summary ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {EXAMS.map((exam) => {
            const isActive = exam.id === active.id;
            return (
              <button
                key={exam.id}
                onClick={() => setActive(exam)}
                className="group text-left rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: isActive ? `${exam.glow}` : "rgba(255,255,255,0.025)",
                  border: `1.5px solid ${isActive ? exam.accent + "60" : "rgba(255,255,255,0.07)"}`,
                  boxShadow: isActive ? `0 12px 36px rgba(0,0,0,0.5), 0 0 0 1px ${exam.accent}20` : "none",
                  transform: isActive ? "translateY(-3px)" : "none",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-xl" style={{ background: `${exam.accent}18` }}>
                    <exam.icon size={16} style={{ color: exam.accent }} />
                  </div>
                  <span className="syne font-bold text-white text-base">{exam.short}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${exam.accent}14`, color: exam.accent }}>
                    {exam.marks}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${exam.accent}14`, color: exam.accent }}>
                    {exam.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold transition-all" style={{ color: isActive ? exam.accent : "rgba(255,255,255,0.3)" }}>
                  View Details <ChevronRight size={12} />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}