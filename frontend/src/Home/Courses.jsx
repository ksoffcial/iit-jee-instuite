import { useState } from "react";
import {
  BookOpen, FlaskConical, Layers, GraduationCap,
  School, BookMarked, RefreshCw, Search,
  ChevronRight, Star, Users, Clock, X,
} from "lucide-react";

// ─── Course Data ──────────────────────────────────────────────────────────────

const courses = [
  {
    id: 1,
    courseImg:"https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JvdXAlMjBvZiUyMGVuZ2luZWVyfGVufDB8fDB8fHww  ",
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
    courseImg:"https://images.unsplash.com/photo-1778230123972-07eafe417fc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yJTIwZ3JvdXBzfGVufDB8fDB8fHww",
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
    courseName: "BSEB Board",
    courseImg:"https://images.unsplash.com/photo-1764720572799-9b441b6cdfbe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGJvYXJkJTIwZXhhbSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
    description: "Course designed for Bihar School Examination Board students with local focus.",
    icon: School,
    badge: "Bihar Special",
    badgeStyle: "bg-yellow-500 text-black",
    students: "8,200+",
    duration: "1 Year",
    rating: 4.6,
    tagStyle: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 6,
    courseName: "CBSE Board",
    courseImg:"https://plus.unsplash.com/premium_photo-1683887033886-6c45d4b659f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHN0dWRlbnRzJTIwaW4lMjBjbGFzc3Jvb218ZW58MHx8MHx8fDA%3D",
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

const filters = ["All", "Engineering", "Medical", "Foundation", "Board", "Special"];

// ─── Course Card ──────────────────────────────────────────────────────────────

const CourseCard = ({ course, isWishlisted, onWishlist, onView }) => {
  const Icon = course.icon;
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group">

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={course.courseImg}
          alt={course.courseName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />

        {/* Badge */}
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold shadow ${course.badgeStyle}`}>
          {course.badge}
        </span>

        {/* Wishlist button */}
        <button
          onClick={() => onWishlist(course.id)}
          className={`absolute top-3 right-3 p-1.5 rounded-full shadow transition-all duration-200
${isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/90 text-gray-500 hover:bg-red-50 hover:text-red-500"
            }`}
        >
          <Star size={14} fill={isWishlisted ? "white" : "none"} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">

        {/* Tag + Icon row */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${course.tagStyle}`}>
            {course.tag}
          </span>
          <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center">
            <Icon size={15} className="text-blue-400" />
          </div>
        </div>

        {/* Course name */}
        <h2 className="text-base font-bold text-gray-900 leading-snug">
          {course.courseName}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">
          {course.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Users size={13} className="text-blue-500" />
            {course.students}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-blue-500" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1 ml-auto font-semibold text-yellow-500">
            ⭐ {course.rating}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => onView(course)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl
bg-gray-950 hover:bg-blue-600 text-white text-sm font-semibold
transition-colors duration-300"
        >
          View Details
          <ChevronRight size={15} />
        </button>

      </div>
    </div>
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────

const CourseModal = ({ course, onClose }) => {
  const Icon = course.icon;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Modal Header */}
        <div className="bg-gray-950 h-36 relative flex items-center justify-center">
          <img
            src={course.courseImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
            <Icon size={30} className="text-white" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20
text-white flex items-center justify-center transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-4">

          {/* Tag + Badge */}
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${course.tagStyle}`}>
              {course.tag}
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${course.badgeStyle}`}>
              {course.badge}
            </span>
          </div>

          {/* Title + Description */}
          <div>
            <h2 className="text-2xl font-black text-gray-900">{course.courseName}</h2>
            <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{course.description}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Students", value: course.students, icon: Users },
              { label: "Duration", value: course.duration, icon: Clock },
              { label: "Rating", value: `⭐ ${course.rating}`, icon: Star },
            ].map(({ label, value, icon: Ic }) => (
              <div key={label} className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                <Ic size={14} className="text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-gray-400">{label}</p>
                <p className="font-bold text-gray-800 text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {/* Enroll Button */}
          <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700
text-white font-bold text-sm transition-colors">
            Enroll Now
          </button>

        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Courses() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [modalCourse, setModalCourse] = useState(null);

  const toggleWishlist = (id) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);

  const filtered = courses.filter((c) => {
    const matchSearch = c.courseName.toLowerCase().includes(search.toLowerCase())
      || c.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || c.tag === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-950">

      {/* ── Hero Header ── */}
      <div className="bg-gray-950 border-b border-gray-800 py-14 px-4 text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold mb-4">
          Bihar's Most Trusted Coaching
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
          Our <span className="text-blue-500">Courses</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mb-8">
          Unlock your potential with expert-led programs for every student.
        </p>

        {/* Search bar */}
        <div className="relative max-w-md mx-auto">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-full bg-gray-800 text-white text-sm
border border-gray-700 outline-none placeholder-gray-500
focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex flex-wrap justify-center gap-2 px-4 py-6 bg-gray-900 border-b border-gray-800">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200
${activeFilter === f
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-transparent text-gray-400 border-gray-700 hover:border-blue-500 hover:text-blue-400"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Course Count ── */}
      <p className="text-center text-sm text-gray-500 pt-6 pb-2">
        Showing{" "}
        <span className="font-bold text-blue-400">{filtered.length}</span>{" "}
        course{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* ── Cards Grid ── */}
      <div className="max-w-7xl mx-auto px-4 pb-16 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-20 text-gray-500">
            <BookOpen className="mx-auto mb-3 w-10 h-10 opacity-30" />
            <p className="text-lg font-semibold">No courses found</p>
            <p className="text-sm">Try a different search or filter.</p>
          </div>
        ) : (
          filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isWishlisted={wishlist.includes(course.id)}
              onWishlist={toggleWishlist}
              onView={setModalCourse}
            />
          ))
        )}

      </div>

      {/* ── Modal ── */}
      {modalCourse && (
        <CourseModal course={modalCourse} onClose={() => setModalCourse(null)} />
      )}

    </div>
  );
}