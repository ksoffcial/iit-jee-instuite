import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  GraduationCap,
  LogOut,
  User,
  LayoutDashboard,
  ChevronRight,
  Atom,
  BookOpen,
  Trophy,
  Zap,
  Phone,
  Bell,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../authSlice';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'Courses', href: '#courser', icon: BookOpen,route:"/course" },
  { name: 'Mock Tests', href: '#tests', icon: Zap,route:"/course" },
  { name: 'Results', href: '#results', icon: Trophy,route:"/result" },
  { name: 'JEE/NEET', href: '#material', icon: Atom,route:"/course" },
];

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
        .nav-font { font-family: 'Sora', sans-serif; }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes topbar-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #1e3a8a, #3b82f6, #06b6d4, #3b82f6, #1e3a8a);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .nav-link-hover:hover::after { width: 60%; }
        .nav-link-hover.active::after { width: 60%; }
        .logo-glow { box-shadow: 0 0 20px rgba(59,130,246,0.4), 0 0 40px rgba(59,130,246,0.15); }
        .dropdown-glass {
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(59,130,246,0.1);
          box-shadow: 0 20px 60px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.5);
        }
        .avatar-ring {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          padding: 2px;
          border-radius: 50%;
        }
        .topbar-track {
          animation: topbar-slide 20s linear infinite;
        }
        .sidebar-glass {
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(30px);
        }
        .mobile-link-hover:hover {
          background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.06));
          border-color: rgba(59,130,246,0.2);
        }
        .enroll-btn {
          background: linear-gradient(135deg, #1d4ed8, #2563eb, #0ea5e9);
          background-size: 200% 200%;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(37,99,235,0.35);
        }
        .enroll-btn:hover {
          background-position: right center;
          box-shadow: 0 6px 28px rgba(37,99,235,0.5);
          transform: translateY(-1px);
        }
        .nav-glass {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .nav-scrolled {
          box-shadow: 0 4px 30px -5px rgba(0,0,0,0.1), 0 1px 0 rgba(0,0,0,0.04);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
      `}</style>

      {/* Top Announcement Bar */}
      <div className="nav-font fixed top-0  bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white py-2 overflow-hidden  z-[101]">
        <div className="flex">
          <div className="topbar-track flex whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 px-4 text-xs font-semibold tracking-wide">
                <span className="flex items-center gap-1.5">🎯 JEE 2026 Batch Open — Limited Seats!</span>
                <span className="opacity-40">•</span>
                <span className="flex items-center gap-1.5">🏆 NEET 2025: 92 Students in Top 1000 AIR</span>
                <span className="opacity-40">•</span>
                <span className="flex items-center gap-1.5">📚 Free Demo Class Every Saturday 10AM</span>
                <span className="opacity-40">•</span>
                <span className="flex items-center gap-1.5">📞 Call: +91-98765-43210 for Counselling</span>
                <span className="opacity-40">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        ref={navRef}
        className={`nav-font fixed top-8 w-full z-[100] transition-all duration-500 ${scrolled ? 'nav-glass nav-scrolled h-16' : 'bg-white h-20'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <div
            className="flex items-center gap-3 group cursor-pointer flex-shrink-0"
            onClick={() => navigate('/')}
          >
            <div className={`relative logo-glow bg-gradient-to-br from-blue-600 to-cyan-500 p-2.5 rounded-2xl text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <GraduationCap size={22} strokeWidth={2.5} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[17px] sm:text-lg font-black tracking-tight text-gray-900 uppercase">
                Rakesh <span className="shimmer-text">Physics</span>
              </span>
              <span className="hidden sm:block text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mt-0.5">
                Institute of Excellence
              </span>
            </div>
          </div>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ name,route, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                onClick={() => navigate(`${route}`)}
                className={`nav-link-hover relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeLink === name
                    ? 'text-blue-600 bg-blue-50 active'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/60'
                }`}
              >
                <Icon size={15} strokeWidth={2} />
                {name}
              </a>
            ))}
          </div>

          {/* ── Right Section ── */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Contact pill — desktop */}
            <a
              href="tel:+919876543210"
              className="hidden xl:flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all"
            >
              <Phone size={13} strokeWidth={2.5} />
              +91-98765-43210
            </a>

            {isAuthenticated ? (
              <>
                {/* Notification bell */}
                <button className="relative btn btn-ghost btn-circle btn-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                  <Bell size={18} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
                </button>

                {/* Avatar Dropdown */}
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="cursor-pointer flex items-center gap-2 group">
                    <div className="avatar-ring">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-md">
                        {user?.fullName?.charAt(0).toUpperCase() ?? 'U'}
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col leading-none">
                      <span className="text-xs font-bold text-gray-800">{user?.fullName?.split(' ')[0]}</span>
                      <span className="text-[10px] text-gray-400 capitalize">{user?.role ?? 'Student'}</span>
                    </div>
                  </label>

                  <ul tabIndex={0} className="dropdown-glass mt-4 z-[200] p-2 menu menu-sm dropdown-content rounded-2xl w-64">
                    {/* User info header */}
                    <li className="px-3 py-3 mb-1">
                      <div className="flex items-center gap-3 pointer-events-none">
                        <div className="avatar-ring">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black">
                            {user?.fullName?.charAt(0).toUpperCase() ?? 'U'}
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{user?.fullName}</p>
                          <p className="text-xs text-gray-400">{user?.email}</p>
                        </div>
                      </div>
                    </li>
                    <div className="divider my-0 opacity-30" />
                    <li>
                      <a className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-700 font-semibold text-gray-700 text-sm">
                        <User size={16} /> My Profile
                      </a>
                    </li>
                    {user?.role === 'admin' && (
                      <li>
                        <button
                          onClick={() => navigate('/admin')}
                          className="w-full text-left flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-blue-50 font-bold text-blue-600 text-sm"
                        >
                          <LayoutDashboard size={16} /> Admin Panel
                          <span className="ml-auto text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-bold">ADMIN</span>
                        </button>
                      </li>
                    )}
                    <div className="divider my-0 opacity-30" />
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-red-50 text-red-500 font-semibold text-sm"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="enroll-btn flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl"
                >
                  <Sparkles size={14} />
                  Join Now
                </button>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Sidebar ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="nav-font sidebar-glass fixed top-0 right-0 h-screen w-[300px] z-[120] flex flex-col lg:hidden shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="logo-glow bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl text-white">
                    <GraduationCap size={18} strokeWidth={2.5} />
                  </div>
                  <span className="font-black text-gray-900 text-sm uppercase tracking-tight">
                    Rakesh <span className="shimmer-text">Physics</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 mb-3">Navigation</p>
                {navLinks.map(({ name, href, icon: Icon }, i) => (
                  <motion.a
                    key={name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 300 }}
                    href={href}
                    onClick={() => { setActiveLink(name); setIsOpen(false); }}
                    className={`mobile-link-hover flex items-center justify-between px-4 py-3.5 rounded-xl border font-semibold text-sm transition-all duration-200 ${
                      activeLink === name
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'border-transparent text-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`p-1.5 rounded-lg ${activeLink === name ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        <Icon size={14} strokeWidth={2.5} />
                      </span>
                      {name}
                    </span>
                    <ChevronRight size={14} className="text-gray-400" />
                  </motion.a>
                ))}

                {/* Divider */}
                <div className="pt-4 pb-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 mb-3">Contact</p>
                  <a
                    href="tel:+916203981174"
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-transparent hover:bg-blue-50 hover:border-blue-100 text-gray-700 font-semibold text-sm transition-all"
                  >
                    <span className="p-1.5 rounded-lg bg-gray-100 text-gray-500">
                      <Phone size={14} strokeWidth={2.5} />
                    </span>
                    +91-62039-81174
                  </a>
                </div>
              </div>

              {/* Bottom Auth */}
              <div className="px-4 py-5 border-t border-gray-100 space-y-3">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-3 py-3 bg-blue-50 rounded-xl">
                      <div className="avatar-ring">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm">
                          {user?.fullName?.charAt(0).toUpperCase() ?? 'U'}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{user?.fullName}</p>
                        <p className="text-xs text-gray-400 capitalize">{user?.role ?? 'Student'}</p>
                      </div>
                    </div>
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => { navigate('/admin'); setIsOpen(false); }}
                        className="w-full flex items-center gap-2 justify-center py-2.5 rounded-xl border-2 border-blue-200 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all"
                      >
                        <LayoutDashboard size={15} /> Admin Panel
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 justify-center py-2.5 rounded-xl border-2 border-red-100 text-red-500 font-bold text-sm hover:bg-red-50 transition-all"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => { navigate('/login'); setIsOpen(false); }}
                      className="w-full py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-blue-300 hover:text-blue-600 transition-all"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => { navigate('/register'); setIsOpen(false); }}
                      className="enroll-btn w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm"
                    >
                      <Sparkles size={15} />
                      Enroll Now — Free Demo
                    </button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;