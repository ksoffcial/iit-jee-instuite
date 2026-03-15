import React from 'react'
import {
    MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram,
    Twitter, Send, BookOpen, GraduationCap, FlaskConical,
    ChevronRight, Heart, Award, Atom, Zap
} from 'lucide-react'

const quickLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Our Faculty', href: '#' },
    { label: 'Courses & Batches', href: '#' },
    { label: 'Student Results', href: '#' },
    { label: 'Study Material', href: '#' },
    { label: 'Admission Process', href: '#' },
]

const courses = [
    { label: 'IIT-JEE Main', icon: Atom },
    { label: 'IIT-JEE Advanced', icon: Zap },
    { label: 'NEET UG', icon: FlaskConical },
    { label: 'Foundation (8th–10th)', icon: BookOpen },
    { label: 'Crash Course', icon: Award },
    { label: 'Online Batches', icon: GraduationCap },
]

const contactInfo = [
    {
        icon: MapPin,
        label: 'Our Location',
        value: 'Near rangbhumi maidan ,\nPurnea, Bihar — 854301',
        color: 'text-rose-400',
        bg: 'bg-rose-400/10',
    },
    {
        icon: Phone,
        label: 'Call Us',
        value: '+91 98765 43210\n+91 91234 56789',
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
    },
    {
        icon: Mail,
        label: 'Email Us',
        value: 'info@rakeshphysics.in\nadmissions@rakeshphysics.in',
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
    },
    {
        icon: Clock,
        label: 'Office Hours',
        value: 'Mon – Sat: 8:00 AM – 8:00 PM\nSunday: 10:00 AM – 2:00 PM',
        color: 'text-amber-400',
        bg: 'bg-amber-400/10',
    },
]

const socials = [
    { icon: Youtube, label: 'YouTube', href: '#', color: 'hover:bg-red-600', border: 'hover:border-red-500' },
    { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:bg-blue-600', border: 'hover:border-blue-500' },
    { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:bg-pink-600', border: 'hover:border-pink-500' },
    { icon: Twitter, label: 'Twitter / X', href: '#', color: 'hover:bg-slate-600', border: 'hover:border-slate-400' },
]

const Footer = () => {
    return (
        <div>
            <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 overflow-hidden">

                {/* Background blobs */}
                <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600/6 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/6 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-900/8 rounded-full blur-3xl pointer-events-none" />

                {/* Top gradient line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                {/* ── Newsletter Strip ── */}
                <div className="relative border-b border-white/8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                            <div>
                                <h3 className="text-white font-black text-lg sm:text-xl mb-1">
                                    Get Free Study Updates 🎯
                                </h3>
                                <p className="text-slate-400 text-sm">
                                    Subscribe for PYQs, tips, result alerts & batch announcements.
                                </p>
                            </div>
                            <div className="flex w-full sm:w-auto gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email..."
                                    className="flex-1 sm:w-64 bg-white/8 border border-white/15 hover:border-blue-400/40 focus:border-blue-400/60 focus:outline-none text-white placeholder-slate-500 text-sm px-4 py-2.5 rounded-xl transition-all duration-200"
                                />
                                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 text-sm whitespace-nowrap">
                                    <Send size={14} />
                                    <span className="hidden sm:inline">Subscribe</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Main Footer Grid ── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                        {/* ── Col 1: Brand ── */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            {/* Logo */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
                                    <Atom size={24} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-black text-lg leading-tight tracking-tight">Rakesh Physics</p>
                                    <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase">Institute</p>
                                </div>
                            </div>

                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Bihar's most trusted IIT-JEE & NEET coaching institute, shaping toppers since 2012.
                                World-class faculty, proven results, and a passion for excellence — right here in Purnea.
                            </p>

                            {/* Trust badges */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {['#1 in Purnea', 'Est. 2012', '5200+ Selections'].map((b, i) => (
                                    <span key={i} className="text-xs font-semibold bg-blue-500/15 border border-blue-400/25 text-blue-300 px-3 py-1 rounded-full">
                                        {b}
                                    </span>
                                ))}
                            </div>

                            {/* Socials */}
                            <div className="flex items-center gap-2">
                                {socials.map(({ icon: Icon, label, href, color, border }) => (

                                    <a key={label}
                                        href={href}
                                        className={`w-9 h-9 rounded-xl bg-white/8 border border-white/10 ${border} ${color} flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:-translate-y-0.5`}
                                    >
                                        <Icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* ── Col 2: Quick Links ── */}
                        <div>
                            <h4 className="text-white font-bold text-sm sm:text-base mb-5 flex items-center gap-2">
                                <span className="w-1 h-4 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full inline-block" />
                                Quick Links
                            </h4>
                            <ul className="space-y-2.5">
                                {quickLinks.map(({ label, href }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            className="group flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors duration-200"
                                        >
                                            <ChevronRight
                                                size={13}
                                                className="text-blue-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                                            />
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── Col 3: Courses ── */}
                        <div>
                            <h4 className="text-white font-bold text-sm sm:text-base mb-5 flex items-center gap-2">
                                <span className="w-1 h-4 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full inline-block" />
                                Our Courses
                            </h4>
                            <ul className="space-y-2.5">
                                {courses.map(({ label, icon: Icon }) => (
                                    <li key={label}>
                                        <a
                                            href="#"
                                            className="group flex items-center gap-2.5 text-slate-400 hover:text-white text-sm transition-colors duration-200"
                                        >
                                            <Icon
                                                size={13}
                                                className="text-amber-500 group-hover:text-amber-300 flex-shrink-0 transition-colors duration-200"
                                            />
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── Col 4: Contact ── */}
                        <div>
                            <h4 className="text-white font-bold text-sm sm:text-base mb-5 flex items-center gap-2">
                                <span className="w-1 h-4 bg-gradient-to-b from-rose-400 to-pink-400 rounded-full inline-block" />
                                Contact Us
                            </h4>
                            <ul className="space-y-4">
                                {contactInfo.map(({ icon: Icon, label, value, color, bg }) => (
                                    <li key={label} className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                            <Icon size={14} className={color} />
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-xs font-medium mb-0.5">{label}</p>
                                            {value.split('\n').map((line, i) => (
                                                <p key={i} className="text-slate-300 text-xs leading-relaxed">{line}</p>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div >
                </div >

                {/* ── Google Map Strip ── */}
                < div className="border-t border-white/8" >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center gap-2 mb-3">
                            <MapPin size={15} className="text-rose-400" />
                            <span className="text-white font-semibold text-sm">Find Us on Map</span>
                        </div>
                        <div className="w-full h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/10 bg-slate-800/50">
                            <iframe
                                title="Rakesh Physics Institute Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.488752738206!2d87.46854447370808!3d25.78744500754397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eff99cb8725449%3A0x26a32ec104a8972!2sRakesh%20Physics!5e0!3m2!1sen!2sin!4v1773569081582!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div >

                {/* ── Bottom Bar ── */}
                < div className="border-t border-white/8" >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                            <p className="text-slate-500 text-xs text-center sm:text-left">
                                © {new Date().getFullYear()} Rakesh Physics Institute, Purnea, Bihar. All rights reserved.
                            </p>
                            <p className="text-slate-600 text-xs flex items-center gap-1.5">
                                Made with <Heart size={11} className="text-rose-500 fill-rose-500" /> for Bihar's future toppers
                            </p>
                            <div className="flex items-center gap-4">
                                {['Privacy Policy', 'Terms of Use', 'Refund Policy'].map((item, i) => (
                                    <a key={i} href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors duration-200">
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div >

            </footer >
        </div>
    )
}
export default Footer;