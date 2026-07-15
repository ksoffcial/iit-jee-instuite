import { useRef, useState } from "react";
import {
  BookOpen, FlaskConical, Layers, GraduationCap,
  School, BookMarked, RefreshCw, Search,
  ChevronRight, Star, Users, Clock, X,
  ChevronLeft
} from "lucide-react";

const courses = [
  {
    id: 1,
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

const CourseCard = ({ course, isWishlisted, onWishlist, onView }) => {
  const Icon = course.icon;

  return (
    <div className="carousel-item w-[85%] sm:w-[48%] lg:w-[32%] xl:w-[24%] flex-shrink-0">
      <div className="w-full bg-gray-990 bg-gray-900 border border-gray-800 rounded-3xl shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <div className="relative h-44 bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-600/10" />

          <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${course.badgeStyle}`}>
            {course.badge}
          </span>

          <button
            onClick={() => onWishlist(course.id)}
            className={`absolute top-4 right-4 p-2 rounded-full transition ${
              isWishlisted ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-blue-600 hover:text-white"
            }`}
          >
            <Star size={16} fill={isWishlisted ? "white" : "none"} />
          </button>

          <div className="relative w-24 h-24 rounded-3xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shadow-lg">
            <Icon size={45} className="text-blue-400" />
          </div>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${course.tagStyle}`}>
              {course.tag}
            </span>
            <span className="text-yellow-400 text-sm font-bold">⭐ {course.rating}</span>
          </div>

          <h2 className="text-xl font-black text-white">{course.courseName}</h2>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{course.description}</p>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Users size={14} className="text-blue-400" />
              {course.students}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-blue-400" />
              {course.duration}
            </span>
          </div>

          <button
            onClick={() => onView(course)}
            className="btn border-none bg-blue-600 hover:bg-blue-700 text-white rounded-xl w-full flex items-center justify-center gap-2"
          >
            View Details
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseModal = ({ course, onClose }) => {
  const Icon = course.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-40 bg-gradient-to-br from-gray-950 to-blue-950 flex items-center justify-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center"
          >
            <X size={17} />
          </button>

          <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-lg">
            <Icon size={38} className="text-white" />
          </div>
        </div>

        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${course.tagStyle}`}>
              {course.tag}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${course.badgeStyle}`}>
              {course.badge}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">{course.courseName}</h2>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">{course.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
              <Users size={15} className="text-blue-400 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Students</p>
              <p className="font-bold text-white text-sm">{course.students}</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
              <Clock size={15} className="text-blue-400 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-bold text-white text-sm">{course.duration}</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
              <Star size={15} className="text-blue-400 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Rating</p>
              <p className="font-bold text-white text-sm">⭐ {course.rating}</p>
            </div>
          </div>

          <button className="btn bg-blue-600 hover:bg-blue-700 border-none text-white rounded-xl py-3 w-full">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [modalCourse, setModalCourse] = useState(null);

  const carouselRef = useRef(null);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  const filtered = courses.filter((c) => {
    const matchFilter = activeFilter === "All" || c.tag === activeFilter;
    const matchSearch =
      c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gray-950 border-b border-gray-800 py-14 px-4 text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold mb-4">
          Bihar&apos;s Most Trusted Coaching
        </span>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
          Our <span className="text-blue-500">Courses</span>
        </h1>

        <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mb-8">
          Unlock your potential with expert-led programs for every student.
        </p>

        {/* Added Search Input Field */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 px-4 py-6 bg-gray-900 border-b border-gray-800">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
              activeFilter === f
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-transparent text-gray-400 border-gray-700 hover:border-blue-500 hover:text-blue-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-400">
            Showing <span className="font-bold text-blue-400">{filtered.length}</span> courses
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <BookOpen className="mx-auto mb-3 w-10 h-10 opacity-30" />
            <p className="text-lg font-semibold">No courses found</p>
            <p className="text-sm">Try a different search or filter.</p>
          </div>
        ) : (
          <div
            ref={carouselRef}
            className="carousel carousel-center w-full gap-5 overflow-x-auto scroll-smooth pb-6 flex"
          >
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isWishlisted={wishlist.includes(course.id)}
                onWishlist={toggleWishlist}
                onView={setModalCourse}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center mt-4">
          <div className="flex gap-8 md:gap-16">
            <button
              onClick={() => scrollCarousel("left")}
              className="btn btn-circle bg-gray-900 border border-gray-700 text-white hover:bg-blue-600 flex items-center justify-center w-12 h-12 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => scrollCarousel("right")}
              className="btn btn-circle bg-gray-900 border border-gray-700 text-white hover:bg-blue-600 flex items-center justify-center w-12 h-12 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {modalCourse && <CourseModal course={modalCourse} onClose={() => setModalCourse(null)} />}
    </div>
  );
}