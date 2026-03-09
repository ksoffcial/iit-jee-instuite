import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router"
import { registerUser } from '../authSlice'
import {
    User, Phone, Mail, Lock, BookOpen, Atom, Zap,
    Star, GraduationCap, ChevronDown, Trophy, Target,
    FlaskConical, Brain, CheckCircle2, Flame
} from 'lucide-react'

const stars = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    w: Math.random() * 2.5 + 0.5,
    top: Math.random() * 100,
    left: Math.random() * 100,
    opacity: Math.random() * 0.6 + 0.15,
    dur: Math.random() * 3 + 2,
    delay: Math.random() * 4,
}))

const features = [
    { icon: Trophy,       text: "500+ IIT Selections", sub: "Top rankers every year"   },
    { icon: Target,       text: "NEET Champions",      sub: "Medical dream realized"   },
    { icon: Brain,        text: "Expert Faculty",       sub: "15+ years experience"     },
    { icon: FlaskConical, text: "Lab & Test Series",    sub: "Practical excellence"     },
]

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [focusedField, setFocusedField] = useState(null)

    const { isAuthenticated, loading, error } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isAuthenticated) navigate("/")
    }, [isAuthenticated, navigate])

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        const response = await dispatch(registerUser(data))
        console.log(response)
    }

    /* ── Reusable input ── */
    const InputField = ({ id, type = "text", placeholder, icon: Icon, validation }) => (
        <div>
            <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 input-glow"
                style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${focusedField === id ? 'rgba(249,115,22,0.55)' : 'rgba(255,255,255,0.09)'}`,
                }}
            >
                <Icon size={16} color={focusedField === id ? '#f97316' : '#64748b'} />
                <input
                    type={type}
                    placeholder={placeholder}
                    {...register(id, validation)}
                    onFocus={() => setFocusedField(id)}
                    onBlur={() => setFocusedField(null)}
                    className="flex-1 bg-transparent outline-none text-sm placeholder-slate-500"
                    style={{ color: '#e2e8f0' }}
                />
            </div>
            {errors[id] && (
                <p className="text-xs mt-1 ml-1" style={{ color: '#f87171' }}>
                    {errors[id].message}
                </p>
            )}
        </div>
    )

    return (
        <div
            className="min-h-screen flex items-center justify-center relative overflow-hidden py-8 px-4"
            style={{
                background: 'linear-gradient(135deg, #060612 0%, #0b1730 40%, #091e38 70%, #060e1c 100%)',
                fontFamily: "'Georgia', serif",
            }}
        >
            <style>{`
                @keyframes twinkle {
                    0%   { opacity: 0.1; transform: scale(1); }
                    100% { opacity: 0.85; transform: scale(1.4); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulseRing {
                    0%,100% { opacity: 0.3; transform: scale(1);    }
                    50%     { opacity: 0.1; transform: scale(1.08);  }
                }

                .slide-up { animation: slideUp 0.65s ease both; }

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
                        rgba(249,115,22,0.13) 0%,
                        rgba(13,27,62,0.55) 50%,
                        rgba(6,6,18,0.75) 100%);
                    backdrop-filter: blur(20px);
                }
                .input-glow:focus-within {
                    box-shadow: 0 0 0 2px rgba(249,115,22,0.35),
                                0 0 18px rgba(249,115,22,0.12);
                }
                .btn-fire {
                    background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%);
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 22px rgba(249,115,22,0.45);
                }
                .btn-fire:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px rgba(249,115,22,0.65);
                    background: linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%);
                }
                .btn-fire:active { transform: translateY(0); }
                .sayari-card {
                    background: rgba(249,115,22,0.07);
                    border-left: 3px solid rgba(249,115,22,0.65);
                    border-radius: 0 12px 12px 0;
                }
                .feature-item {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.07);
                    transition: all 0.25s ease;
                }
                .feature-item:hover {
                    background: rgba(249,115,22,0.09);
                    border-color: rgba(249,115,22,0.28);
                    transform: translateX(4px);
                }
                .divider-line {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(249,115,22,0.45), transparent);
                }
            `}</style>

            {/* ── Twinkling stars ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {stars.map(s => (
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
                style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.14), transparent)', filter: 'blur(90px)' }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent)', filter: 'blur(90px)' }} />

            {/* ══════════════════════════════════
                    MAIN TWO-COLUMN CARD
            ══════════════════════════════════ */}
            <div className="glass-panel rounded-3xl w-full max-w-5xl overflow-hidden flex flex-col lg:flex-row slide-up">

                {/* ─────────── LEFT — Content ─────────── */}
                <div className="left-panel w-full lg:w-[47%] flex flex-col p-8 lg:p-10 relative overflow-hidden"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' /* mobile */ }}>

                    {/* Decorative spinning atoms */}
                    <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none animate-spin"
                        style={{ animationDuration: '28s' }}>
                        <Atom size={170} color="#f97316" />
                    </div>
                    <div className="absolute -bottom-12 -left-8 opacity-[0.06] pointer-events-none animate-spin"
                        style={{ animationDuration: '40s', animationDirection: 'reverse' }}>
                        <Atom size={130} color="#3b82f6" />
                    </div>

                    {/* ── Brand ── */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-shrink-0">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                    boxShadow: '0 8px 28px rgba(249,115,22,0.55)'
                                }}>
                                <Atom size={28} color="white" />
                            </div>
                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ background: '#fbbf24', boxShadow: '0 2px 8px rgba(251,191,36,0.5)' }}>
                                <Star size={10} color="#0a0a1a" fill="#0a0a1a" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold shimmer-text leading-tight">
                                RAKESH PHYSICS
                            </h1>
                            <p className="text-xs tracking-widest uppercase mt-0.5"
                                style={{ color: '#94a3b8', letterSpacing: '0.18em' }}>
                                IIT JEE · NEET Excellence
                            </p>
                        </div>
                    </div>

                    <div className="divider-line mb-6" />

                    {/* ── Tagline ── */}
                    <h2 className="text-lg lg:text-xl font-semibold leading-snug mb-2" style={{ color: '#f1f5f9' }}>
                        Where Dreams Meet{' '}
                        <span style={{ color: '#f97316' }}>Dedication</span>
                    </h2>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b' }}>
                        Join thousands of students who turned their IIT &amp; NEET aspirations
                        into reality under expert guidance.
                    </p>

                    {/* ── Shayari 1 ── */}
                    <div className="sayari-card px-4 py-4 mb-5">
                        <p className="text-sm italic leading-relaxed" style={{ color: '#fbbf24' }}>
                            "तू वो चिराग़ है जो खुद ही जलेगा,<br />
                            मंज़िल तेरी है, तू ही मिलेगा।<br />
                            <span style={{ color: '#fb923c' }}>हार मत, राह लंबी सही —</span><br />
                            <span style={{ color: '#fb923c' }}>IIT का दरवाज़ा बंद नहीं।"</span>
                        </p>
                    </div>

                    {/* ── Feature grid ── */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        {features.map(({ icon: Icon, text, sub }) => (
                            <div key={text} className="feature-item rounded-xl px-3 py-3 flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(249,115,22,0.15)' }}>
                                    <Icon size={15} color="#f97316" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold leading-tight" style={{ color: '#e2e8f0' }}>{text}</p>
                                    <p className="text-xs leading-tight mt-0.5" style={{ color: '#475569' }}>{sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Shayari 2 ── */}
                    <div className="sayari-card px-4 py-3 mb-5">
                        <p className="text-xs italic leading-relaxed" style={{ color: '#94a3b8' }}>
                            "पढ़ लो दीवानों की तरह,<br />
                            क्योंकि NEET और IIT मिलते हैं उन्हीं को<br />
                            जो रातों को तारों से बात करते हैं।"
                        </p>
                    </div>

                    {/* ── Badges ── */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {["Since 2010", "10,000+ Students", "Top Results"].map(badge => (
                            <span key={badge} className="text-xs px-3 py-1 rounded-full font-medium"
                                style={{
                                    background: 'rgba(249,115,22,0.12)',
                                    border: '1px solid rgba(249,115,22,0.28)',
                                    color: '#fb923c'
                                }}>
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ─────────── RIGHT — Form ─────────── */}
                <div className="w-full lg:w-[53%] flex flex-col p-8 lg:p-10"
                    style={{ borderLeft: '1px solid rgba(255,255,255,0.05)' }}>

                    <div className="mb-7">
                        <div className="flex items-center gap-2 mb-1">
                            <GraduationCap size={20} color="#f97316" />
                            <h2 className="text-xl font-bold" style={{ color: '#f1f5f9' }}>
                                Create Your Account
                            </h2>
                        </div>
                        <p className="text-xs" style={{ color: '#64748b' }}>
                            Start your journey to IIT / NEET today — it's free!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 flex-1">

                        <InputField id="fullName"    placeholder="Full Name"       icon={User}  validation={{ required: "Full name is required" }} />
                        <InputField id="phoneNumber" placeholder="Phone Number"    icon={Phone} validation={{ required: "Phone number is required" }} />
                        <InputField id="emailId"     placeholder="Email Address"   icon={Mail}  validation={{ required: "Email is required" }} />

                        {/* Gender select */}
                        <div
                            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 input-glow"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: `1px solid ${focusedField === 'gender' ? 'rgba(249,115,22,0.55)' : 'rgba(255,255,255,0.09)'}`,
                            }}
                        >
                            <ChevronDown size={16} color={focusedField === 'gender' ? '#f97316' : '#64748b'} />
                            <select
                                {...register("gender")}
                                onFocus={() => setFocusedField('gender')}
                                onBlur={() => setFocusedField(null)}
                                className="flex-1 bg-transparent outline-none text-sm cursor-pointer"
                                style={{ color: '#e2e8f0' }}
                            >
                                <option value=""       style={{ background: '#0d1b3e' }}>Select Gender</option>
                                <option value="male"   style={{ background: '#0d1b3e' }}>Male</option>
                                <option value="female" style={{ background: '#0d1b3e' }}>Female</option>
                            </select>
                        </div>

                        <InputField
                            id="password" type="password"
                            placeholder="Create Password" icon={Lock}
                            validation={{ required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } }}
                        />

                        {/* Redux error */}
                        {error && (
                            <div className="px-4 py-3 rounded-xl text-sm"
                                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-fire w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-widest mt-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm" />
                                    Registering...
                                </>
                            ) : (
                                <>
                                    <Flame size={16} fill="white" color="white" />
                                    START YOUR JOURNEY
                                </>
                            )}
                        </button>

                        {/* Perks checklist */}
                        <div className="grid grid-cols-2 gap-2 mt-1">
                            {["Free mock tests", "Expert doubt sessions", "Live video classes", "Progress analytics"].map(item => (
                                <div key={item} className="flex items-center gap-2">
                                    <CheckCircle2 size={13} color="#22c55e" />
                                    <span className="text-xs" style={{ color: '#64748b' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <p className="text-center text-xs" style={{ color: '#475569' }}>
                            Already have an account?{' '}
                            <a href="/login" className="font-semibold hover:underline" style={{ color: '#f97316' }}>
                                Sign In here
                            </a>
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <BookOpen size={11} color="#334155" />
                            <p className="text-xs" style={{ color: '#334155' }}>
                                IIT JEE · NEET · Board Excellence since 2010
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register
