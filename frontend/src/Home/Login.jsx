import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authSlice";
import { z } from "zod";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Smartphone,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  GraduationCap,
  Trophy,
  BookOpen,
  Atom,
  Star,
  Flame,
  Target,
  Brain,
  Zap,
  CheckCircle2,
} from "lucide-react";

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Only digits allowed"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/* ── static star data (computed once, no re-render flicker) ── */
const STARS = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  w: Math.random() * 2.5 + 0.5,
  top: Math.random() * 100,
  left: Math.random() * 100,
  opacity: Math.random() * 0.6 + 0.15,
  dur: Math.random() * 3 + 2,
  delay: Math.random() * 4,
}));

const STATS = [
  { icon: Trophy,      label: "95% Success Rate",        sub: "JEE Advanced & NEET 2024"     },
  { icon: ShieldCheck, label: "Personalized Mentorship", sub: "Direct guidance from Rakesh Sir" },
  { icon: Target,      label: "500+ IIT Selections",     sub: "Every year, consistently"      },
  { icon: Brain,       label: "Expert Faculty",           sub: "15+ years of excellence"       },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    await dispatch(loginUser(data));
  };

  /* ─── shared input wrapper style ─── */
  const inputBox = (id) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    border: `1px solid ${focusedField === id ? "rgba(249,115,22,0.55)" : "rgba(255,255,255,0.09)"}`,
    transition: "all 0.3s ease",
    boxShadow: focusedField === id
      ? "0 0 0 2px rgba(249,115,22,0.3), 0 0 18px rgba(249,115,22,0.1)"
      : "none",
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-8 px-4"
      style={{
        background: "linear-gradient(135deg, #060612 0%, #0b1730 40%, #091e38 70%, #060e1c 100%)",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* ── CSS keyframes ── */}
      <style>{`
        @keyframes twinkle {
          0%   { opacity: 0.1; transform: scale(1);   }
          100% { opacity: 0.85; transform: scale(1.4); }
        }
        @keyframes shimmer {
          0%   { background-position: -220% center; }
          100% { background-position: 220% center;  }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px);   }
          50%     { transform: translateY(-10px);  }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0);     }
        }

        .slide-up      { animation: slideUp 0.65s ease both; }
        .float-anim    { animation: floatY 5s ease-in-out infinite; }

        .shimmer-text {
          background: linear-gradient(90deg, #f97316, #fbbf24, #fb923c, #f97316);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3.5s linear infinite;
        }

        .glass-panel {
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 32px 64px rgba(0,0,0,0.6),
                      inset 0 1px 0 rgba(255,255,255,0.07);
        }
        .left-panel {
          background: linear-gradient(160deg,
            rgba(249,115,22,0.14) 0%,
            rgba(13,27,62,0.55)   50%,
            rgba(6,6,18,0.78)     100%);
          backdrop-filter: blur(20px);
        }

        .stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.25s ease;
        }
        .stat-card:hover {
          background: rgba(249,115,22,0.09);
          border-color: rgba(249,115,22,0.3);
          transform: translateX(5px);
        }

        .btn-fire {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%);
          transition: all 0.3s ease;
          box-shadow: 0 4px 22px rgba(249,115,22,0.45);
          border: none;
          color: #fff;
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        .btn-fire:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(249,115,22,0.65);
          background: linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%);
        }
        .btn-fire:active  { transform: translateY(0); }
        .btn-fire:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-outline-custom {
          background: transparent;
          border: 1px solid rgba(249,115,22,0.35);
          color: #fb923c;
          transition: all 0.3s ease;
          font-weight: 600;
        }
        .btn-outline-custom:hover {
          background: rgba(249,115,22,0.1);
          border-color: rgba(249,115,22,0.6);
          transform: translateY(-1px);
        }

        .sayari-card {
          background: rgba(249,115,22,0.07);
          border-left: 3px solid rgba(249,115,22,0.65);
          border-radius: 0 12px 12px 0;
        }
        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,0.45), transparent);
        }
        .divider-text-line {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(100,116,139,0.7);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .divider-text-line::before,
        .divider-text-line::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }

        /* password eye button */
        .eye-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          padding: 0;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .eye-btn:hover { color: #f97316; }

        /* error text */
        .err-text { color: #f87171; font-size: 11px; margin-top: 4px; margin-left: 4px; }
      `}</style>

      {/* ── Twinkling stars ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {STARS.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${s.w}px`, height: `${s.w}px`,
              top: `${s.top}%`, left: `${s.left}%`,
              opacity: s.opacity,
              animation: `twinkle ${s.dur}s ease-in-out infinite alternate`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── Ambient glows ── */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.13), transparent)", filter: "blur(90px)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1), transparent)", filter: "blur(90px)" }} />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.05), transparent)", filter: "blur(60px)" }} />

      {/* ══════════════════════════════════════
              MAIN TWO-COLUMN CARD
      ══════════════════════════════════════ */}
      <div className="glass-panel rounded-3xl w-full max-w-5xl overflow-hidden flex flex-col lg:flex-row slide-up">

        {/* ═══════════ LEFT — Branding & Content ═══════════ */}
        <div
          className="left-panel w-full lg:w-[47%] flex flex-col p-8 lg:p-10 relative overflow-hidden"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Decorative atoms */}
          <div
            className="absolute -top-10 -right-10 opacity-10 pointer-events-none"
            style={{ animation: "rotateSlow 28s linear infinite" }}
          >
            <Atom size={170} color="#f97316" />
          </div>
          <div
            className="absolute -bottom-12 -left-8 opacity-[0.06] pointer-events-none"
            style={{ animation: "rotateSlow 40s linear infinite reverse" }}
          >
            <Atom size={130} color="#3b82f6" />
          </div>

          {/* ── Logo & Brand ── */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-shrink-0">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  boxShadow: "0 8px 28px rgba(249,115,22,0.55)",
                }}
              >
                <Atom size={28} color="white" />
              </div>
              <div
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "#fbbf24", boxShadow: "0 2px 8px rgba(251,191,36,0.5)" }}
              >
                <Star size={10} color="#0a0a1a" fill="#0a0a1a" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold shimmer-text leading-tight">
                RAKESH PHYSICS
              </h1>
              <p className="text-xs tracking-widest uppercase mt-0.5"
                style={{ color: "#94a3b8", letterSpacing: "0.18em" }}>
                IIT JEE · NEET Excellence
              </p>
            </div>
          </div>

          <div className="divider-line mb-6" />

          {/* ── Hero tagline ── */}
          <h2 className="text-xl lg:text-2xl font-bold leading-snug mb-2" style={{ color: "#f1f5f9" }}>
            Mastering the{" "}
            <span style={{ color: "#f97316" }}>Laws of Nature</span>
            <br />for Your Success
          </h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#64748b" }}>
            The premier institute for IIT-JEE &amp; NEET preparation — where
            concepts meet clarity and aspirations become achievements.
          </p>

          {/* ── Shayari 1 ── */}
          <div className="sayari-card px-4 py-4 mb-5">
            <p className="text-sm italic leading-relaxed" style={{ color: "#fbbf24" }}>
              "जो आँधियों में भी चिराग़ जलाते हैं,<br />
              वही लोग IIT की राहें पाते हैं।<br />
              <span style={{ color: "#fb923c" }}>रुकना मत, थकना मत —</span><br />
              <span style={{ color: "#fb923c" }}>सफलता कदम चूमती है उन्हीं के।"</span>
            </p>
          </div>

          {/* ── Stats / features ── */}
          <div className="flex flex-col gap-3 mb-5">
            {STATS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="stat-card rounded-xl px-4 py-3 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(249,115,22,0.15)" }}
                >
                  <Icon size={17} color="#f97316" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight" style={{ color: "#e2e8f0" }}>{label}</p>
                  <p className="text-xs leading-tight mt-0.5" style={{ color: "#475569" }}>{sub}</p>
                </div>
                <CheckCircle2 size={14} color="#22c55e" className="ml-auto flex-shrink-0" />
              </div>
            ))}
          </div>

          {/* ── Shayari 2 ── */}
          <div className="sayari-card px-4 py-3 mb-5">
            <p className="text-xs italic leading-relaxed" style={{ color: "#94a3b8" }}>
              "किताबों से दोस्ती जो निभाते हैं,<br />
              NEET की मंज़िल वो ही पाते हैं।<br />
              Rakesh Sir की राह पे चलो —<br />
              सपने हकीकत बन जाते हैं।"
            </p>
          </div>

          {/* ── Bottom badges ── */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {["Since 2010", "10,000+ Students", "Top Results"].map((b) => (
              <span
                key={b}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: "rgba(249,115,22,0.12)",
                  border: "1px solid rgba(249,115,22,0.28)",
                  color: "#fb923c",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ═══════════ RIGHT — Login Form ═══════════ */}
        <div
          className="w-full lg:w-[53%] flex flex-col p-8 lg:p-10"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            >
              <GraduationCap size={20} color="white" />
            </div>
            <span className="text-lg font-bold shimmer-text">RAKESH PHYSICS</span>
          </div>

          {/* Form header */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap size={20} color="#f97316" />
              <h2 className="text-xl font-bold" style={{ color: "#f1f5f9" }}>
                Student Login
              </h2>
            </div>
            <p className="text-xs" style={{ color: "#64748b" }}>
              Welcome back! Enter your details to access your dashboard.
            </p>
          </div>

          {/* Redux / API error */}
          {error && (
            <div
              className="px-4 py-3 rounded-xl text-sm mb-5 flex items-center gap-2"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#fca5a5",
              }}
            >
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 flex-1">

            {/* ── Phone Number ── */}
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "#94a3b8" }}>
                Mobile Number
              </label>
              <div style={inputBox("phoneNumber")}>
                <Smartphone size={16} color={focusedField === "phoneNumber" ? "#f97316" : "#64748b"} />
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="9876543210"
                  {...register("phoneNumber")}
                  onFocus={() => setFocusedField("phoneNumber")}
                  onBlur={() => setFocusedField(null)}
                  className="flex-1 bg-transparent outline-none text-sm placeholder-slate-500"
                  style={{ color: "#e2e8f0" }}
                />
              </div>
              {errors.phoneNumber && (
                <p className="err-text">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* ── Password ── */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold" style={{ color: "#94a3b8" }}>
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs hover:underline"
                  style={{ color: "#f97316" }}
                >
                  Forgot password?
                </a>
              </div>
              <div style={inputBox("password")}>
                <Lock size={16} color={focusedField === "password" ? "#f97316" : "#64748b"} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="flex-1 bg-transparent outline-none text-sm placeholder-slate-500"
                  style={{ color: "#e2e8f0" }}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="err-text">{errors.password.message}</p>
              )}
            </div>

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={loading}
              className="btn-fire w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Flame size={16} fill="white" color="white" />
                  SIGN IN TO DASHBOARD
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* ── Quick perks ── */}
            <div className="grid grid-cols-2 gap-2">
              {[
                "Live video classes",
                "Free mock tests",
                "Progress analytics",
                "Expert doubt sessions",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={13} color="#22c55e" />
                  <span className="text-xs" style={{ color: "#64748b" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* ── Divider ── */}
            <div className="divider-text-line my-1">New Student?</div>

            {/* ── Register CTA ── */}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="btn-outline-custom w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <Zap size={15} />
              Create Your Account — It's Free!
            </button>
          </form>

          {/* ── Footer ── */}
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-center text-xs" style={{ color: "#334155" }}>
              By signing in, you agree to our{" "}
              <span className="underline cursor-pointer" style={{ color: "#475569" }}>Terms of Service</span>
              {" "}and{" "}
              <span className="underline cursor-pointer" style={{ color: "#475569" }}>Privacy Policy</span>
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <BookOpen size={11} color="#334155" />
              <p className="text-xs" style={{ color: "#334155" }}>
                IIT JEE · NEET · Board Excellence since 2010
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
