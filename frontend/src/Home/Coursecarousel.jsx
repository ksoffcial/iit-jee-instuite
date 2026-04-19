import { useState, useRef } from "react";
import {
  BookOpen, FlaskConical, Layers, GraduationCap,
  School, BookMarked, RefreshCw, Star, Users, Clock, ChevronRight,
} from "lucide-react";

// ─── Course Data ──────────────────────────────────────────────────────────────

const courses = [
  {
    id: 1,
    courseImg: "https://i.pinimg.com/1200x/88/53/a0/8853a0d8dbb2edaae9d415ac20884c7e.jpg",
    courseName: "IIT-JEE",
    description: "Preparation course for IIT-JEE engineering entrance exam with expert faculty.",
    icon: BookOpen,
    badge: "Most Popular",
    badgeStyle: "bg-blue-600 text-white",
    students: "12,400+",
    duration: "2 Years",
    rating: 4.9,
    tag: "Engineering",
    tagStyle: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    courseImg: "https://i.pinimg.com/1200x/c9/ca/c3/c9cac36fdecc2403d2984f6603bbd670.jpg",
    courseName: "NEET",
    description: "Preparation course for NEET medical entrance exam with top doctors as mentors.",
    icon: FlaskConical,
    badge: "Top Rated",
    badgeStyle: "bg-emerald-600 text-white",
    students: "9,800+",
    duration: "2 Years",
    rating: 4.8,
    tag: "Medical",
    tagStyle: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 3,
    courseImg: "https://i.pinimg.com/1200x/88/53/a0/8853a0d8dbb2edaae9d415ac20884c7e.jpg",
    courseName: "11th Foundation",
    description: "Foundation course for Class 11 students to build strong conceptual basics.",
    icon: Layers,
    badge: "New",
    badgeStyle: "bg-violet-600 text-white",
    students: "5,300+",
    duration: "1 Year",
    rating: 4.7,
    tag: "Foundation",
    tagStyle: "bg-violet-100 text-violet-700",
  },
  {
    id: 4,
    courseImg: "https://i.pinimg.com/1200x/88/53/a0/8853a0d8dbb2edaae9d415ac20884c7e.jpg",
    courseName: "12th Foundation",
    description: "Foundation course for Class 12 students focusing on board and competitive exams.",
    icon: GraduationCap,
    badge: "Trending",
    badgeStyle: "bg-orange-500 text-white",
    students: "6,100+",
    duration: "1 Year",
    rating: 4.8,
    tag: "Foundation",
    tagStyle: "bg-orange-100 text-orange-700",
  },
  {
    id: 5,
    courseImg: "https://i.pinimg.com/1200x/88/53/a0/8853a0d8dbb2edaae9d415ac20884c7e.jpg",
    courseName: "BSEB Board",
    description: "Course designed for Bihar School Examination Board students with local focus.",
    icon: School,
    badge: "Bihar Special",
    badgeStyle: "bg-yellow-500 text-black",
    students: "8,200+",
    duration: "1 Year",
    rating: 4.6,
    tag: "Board",
    tagStyle: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 6,
    courseImg: "https://i.pinimg.com/1200x/88/53/a0/8853a0d8dbb2edaae9d415ac20884c7e.jpg",
    courseName: "CBSE Board",
    description: "Comprehensive course for Central Board of Secondary Education students.",
    icon: BookMarked,
    badge: "National",
    badgeStyle: "bg-gray-800 text-white",
    students: "14,700+",
    duration: "1 Year",
    rating: 4.7,
    tag: "Board",
    tagStyle: "bg-gray-100 text-gray-700",
  },
  {
    id: 7,
    courseImg: "https://i.pinimg.com/1200x/88/53/a0/8853a0d8dbb2edaae9d415ac20884c7e.jpg",
    courseName: "Dropper Batch",
    description: "Intensive batch for students repeating a year — focused, fast, and effective.",
    icon: RefreshCw,
    badge: "Intensive",
    badgeStyle: "bg-red-600 text-white",
    students: "3,900+",
    duration: "1 Year",
    rating: 4.9,
    tag: "Special",
    tagStyle: "bg-red-100 text-red-700",
  },
];

// ─── Carousel Card ─────────────────────────────────────────────────────────────

const CarouselCard = ({ course, isActive, isWishlisted, onWishlist, onView }) => {
  const Icon = course.icon;
  return (
    <div
      className={`min-w-[220px] max-w-[220px] rounded-2xl border bg-white overflow-hidden flex flex-col flex-shrink-0 transition-all duration-300
        ${isActive ? "border-gray-300 shadow-md" : "border-gray-100 shadow-sm"}`}
    >
      {/* Image */}
      <div className="relative h-[120px] overflow-hidden bg-gray-900">
        <img
          src={course.courseImg}
          alt={course.courseName}
          className={`w-full h-full object-cover opacity-70 transition-transform duration-500 ${isActive ? "scale-105" : "scale-100"}`}
        />
        {/* Badge */}
        <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${course.badgeStyle}`}>
          {course.badge}
        </span>
        {/* Wishlist */}
        <button
          onClick={() => onWishlist(course.id)}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all
            ${isWishlisted ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}
        >
          <Star size={12} fill={isWishlisted ? "white" : "none"} />
        </button>
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        {/* Tag + Icon */}
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${course.tagStyle}`}>
            {course.tag}
          </span>
          <div className="w-7 h-7 rounded-lg bg-gray-950 flex items-center justify-center">
            <Icon size={13} className="text-blue-400" />
          </div>
        </div>

        {/* Name */}
        <h3 className="text-sm font-bold text-gray-900 leading-tight font-sans">
          {course.courseName}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <Users size={11} className="text-blue-500" />
            {course.students}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} className="text-blue-500" />
            {course.duration}
          </span>
          <span className="ml-auto font-semibold text-yellow-500">
            ⭐ {course.rating}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => onView(course)}
          className="w-full flex items-center justify-center gap-1 py-2 rounded-xl bg-gray-950 hover:bg-blue-600 text-white text-xs font-semibold transition-colors duration-300"
        >
          View Details
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

// ─── Main Carousel ─────────────────────────────────────────────────────────────

export default function CourseCarousel() {
  const [current, setCurrent] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  // Drag / swipe state
  const startXRef = useRef(null);
  const dragDeltaRef = useRef(0);
  const isDraggingRef = useRef(false);
  const trackRef = useRef(null);

  const CARD_W = 220;
  const GAP = 12;

  const goTo = (i) => {
    const clamped = Math.max(0, Math.min(courses.length - 1, i));
    setCurrent(clamped);
  };

  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );

  const offset = -(current * (CARD_W + GAP));

  // Pointer handlers for swipe
  const onPointerDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    dragDeltaRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (trackRef.current) trackRef.current.style.transition = "none";
  };

  const onPointerMove = (e) => {
    if (!isDraggingRef.current) return;
    dragDeltaRef.current = e.clientX - startXRef.current;
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${offset + dragDeltaRef.current}px)`;
  };

  const onPointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (trackRef.current) trackRef.current.style.transition = "";
    if (dragDeltaRef.current < -40) goTo(current + 1);
    else if (dragDeltaRef.current > 40) goTo(current - 1);
    // Reset to snapped position
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${-(current * (CARD_W + GAP))}px)`;
  };

  return (
    <div className="w-full bg-gray-950 overflow-hidden py-4">

      {/* Header */}
      <div className="flex items-baseline justify-between px-4 mb-3">
        <h2 className="text-xl font-black text-white tracking-tight">
          Our <span className="text-blue-500">Courses</span>
        </h2>
        <span className="text-xs text-gray-500">{courses.length} courses</span>
      </div>

      {/* Nav buttons */}
      <div className="flex justify-end gap-2 px-4 mb-3">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="w-8 h-8 rounded-full border border-gray-700 bg-gray-800 text-white flex items-center justify-center disabled:opacity-30 hover:border-blue-500 transition"
        >
          <ChevronRight size={14} className="rotate-180" />
        </button>
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === courses.length - 1}
          className="w-8 h-8 rounded-full border border-gray-700 bg-gray-800 text-white flex items-center justify-center disabled:opacity-30 hover:border-blue-500 transition"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Track */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          className="flex transition-transform duration-[350ms] ease-out"
          style={{
            gap: `${GAP}px`,
            paddingLeft: "16px",
            paddingRight: "16px",
            transform: `translateX(${offset}px)`,
          }}
        >
          {courses.map((course, i) => (
            <CarouselCard
              key={course.id}
              course={course}
              isActive={i === current}
              isWishlisted={wishlist.includes(course.id)}
              onWishlist={toggleWishlist}
              onView={(c) => console.log("View:", c.courseName)}
            />
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {courses.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1 rounded-full transition-all duration-300
              ${i === current ? "w-5 bg-blue-500" : "w-2 bg-gray-600"}`}
          />
        ))}
      </div>
    </div>
  );
}