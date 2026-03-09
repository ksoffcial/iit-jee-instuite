import { useState } from "react";
import {
  BookOpen,
  FlaskConical,
  Layers,
  GraduationCap,
  School,
  BookMarked,
  RefreshCw,
  Search,
  ChevronRight,
  Star,
  Users,
  Clock,
  X,
} from "lucide-react";

const courses = [
  {
    id: 1,
    courseImg:
      "https://i.pinimg.com/1200x/88/53/a0/8853a0d8dbb2edaae9d415ac20884c7e.jpg",
    courseName: "IIT-JEE",
    description:
      "Preparation course for IIT-JEE engineering entrance exam with expert faculty.",
    icon: BookOpen,
    badge: "Most Popular",
    badgeColor: "badge-warning",
    students: "12,400+",
    duration: "2 Years",
    rating: 4.9,
    tag: "Engineering",
    tagColor: "bg-blue-100 text-blue-700",
    accentColor: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    courseImg:
      "https://i.pinimg.com/1200x/c9/ca/c3/c9cac36fdecc2403d2984f6603bbd670.jpg",
    courseName: "NEET",
    description:
      "Preparation course for NEET medical entrance exam with top doctors as mentors.",
    icon: FlaskConical,
    badge: "Top Rated",
    badgeColor: "badge-success",
    students: "9,800+",
    duration: "2 Years",
    rating: 4.8,
    tag: "Medical",
    tagColor: "bg-green-100 text-green-700",
    accentColor: "from-green-500 to-teal-600",
  },
  {
    id: 3,
    courseImg:
      "https://i.pinimg.com/1200x/88/53/a0/8853a0d8dbb2edaae9d415ac20884c7e.jpg",
    courseName: "11th Foundation",
    description:
      "Foundation course for Class 11 students to build strong conceptual basics.",
    icon: Layers,
    badge: "New",
    badgeColor: "badge-info",
    students: "5,300+",
    duration: "1 Year",
    rating: 4.7,
    tag: "Foundation",
    tagColor: "bg-purple-100 text-purple-700",
    accentColor: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    courseImg:
      "https://i.pinimg.com/1200x/88/53/a0/8853a0d8dbb2edaae9d415ac20884c7e.jpg",
    courseName: "12th Foundation",
    description:
      "Foundation course for Class 12 students focusing on board and competitive exams.",
    icon: GraduationCap,
    badge: "Trending",
    badgeColor: "badge-error",
    students: "6,100+",
    duration: "1 Year",
    rating: 4.8,
    tag: "Foundation",
    tagColor: "bg-orange-100 text-orange-700",
    accentColor: "from-orange-500 to-red-600",
  },
  {
    id: 5,
    courseImg:
      "https://i.pinimg.com/1200x/88/53/a0/8853a0d8dbb2edaae9d415ac20884c7e.jpg",
    courseName: "BSEB Board",
    description:
      "Course designed for Bihar School Examination Board students with local focus.",
    icon: School,
    badge: "Bihar Special",
    badgeColor: "badge-accent",
    students: "8,200+",
    duration: "1 Year",
    rating: 4.6,
    tag: "Board",
    tagColor: "bg-yellow-100 text-yellow-700",
    accentColor: "from-yellow-500 to-amber-600",
  },
  {
    id: 6,
    courseImg:
      "https://i.pinimg.com/1200x/88/53/a0/8853a0d8dbb2edaae9d415ac20884c7e.jpg",
    courseName: "CBSE Board",
    description:
      "Comprehensive course for Central Board of Secondary Education students.",
    icon: BookMarked,
    badge: "National",
    badgeColor: "badge-neutral",
    students: "14,700+",
    duration: "1 Year",
    rating: 4.7,
    tag: "Board",
    tagColor: "bg-cyan-100 text-cyan-700",
    accentColor: "from-cyan-500 to-sky-600",
  },
  {
    id: 7,
    courseImg:
      "https://i.pinimg.com/1200x/88/53/a0/8853a0d8dbb2edaae9d415ac20884c7e.jpg",
    courseName: "Dropper Batch",
    description:
      "Intensive batch for students repeating a year — focused, fast, and effective.",
    icon: RefreshCw,
    badge: "Intensive",
    badgeColor: "badge-warning",
    students: "3,900+",
    duration: "1 Year",
    rating: 4.9,
    tag: "Special",
    tagColor: "bg-red-100 text-red-700",
    accentColor: "from-red-500 to-rose-600",
  },
];

const filters = ["All", "Engineering", "Medical", "Foundation", "Board", "Special"];

export default function Courses() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [modalCourse, setModalCourse] = useState(null);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const filtered = courses.filter((c) => {
    const matchSearch =
      c.courseName.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || c.tag === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 text-white py-14 px-4 text-center shadow-xl">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 drop-shadow">
          🎓 Our Courses
        </h1>
        <p className="text-blue-100 text-base md:text-lg max-w-xl mx-auto mb-6">
          Unlock your potential with Bihar's most trusted coaching programs.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full text-gray-800 bg-white shadow-lg outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 px-4 py-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
              activeFilter === f
                ? "bg-indigo-600 text-white border-indigo-600 shadow"
                : "bg-white text-gray-600 border-gray-200 hover:border-indigo-400 hover:text-indigo-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Course Count */}
      <p className="text-center text-sm text-gray-500 mb-4">
        Showing <span className="font-bold text-indigo-600">{filtered.length}</span> course{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-20 text-gray-400">
            <BookOpen className="mx-auto mb-3 w-10 h-10 opacity-40" />
            <p className="text-lg font-medium">No courses found.</p>
            <p className="text-sm">Try a different search or filter.</p>
          </div>
        ) : (
          filtered.map((course) => {
            const Icon = course.icon;
            const isWishlisted = wishlist.includes(course.id);
            return (
              <div
                key={course.id}
                className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden group"
              >
                {/* Image */}
                <figure className="relative h-44 overflow-hidden">
                  <img
                    src={course.courseImg}
                    alt={course.courseName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${course.accentColor} opacity-30`} />

                  {/* Badge */}
                  <span className={`badge ${course.badgeColor} absolute top-3 left-3 font-bold text-xs shadow`}>
                    {course.badge}
                  </span>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(course.id)}
                    className={`absolute top-3 right-3 p-1.5 rounded-full shadow transition-all duration-200 ${
                      isWishlisted
                        ? "bg-red-500 text-white"
                        : "bg-white/80 text-gray-500 hover:bg-red-100 hover:text-red-500"
                    }`}
                  >
                    <Star className="w-4 h-4" fill={isWishlisted ? "white" : "none"} />
                  </button>
                </figure>

                <div className="card-body p-4 gap-2">
                  {/* Tag */}
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${course.tagColor}`}>
                    {course.tag}
                  </span>

                  {/* Title */}
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${course.accentColor} text-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h2 className="card-title text-base font-bold text-gray-800">{course.courseName}</h2>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{course.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      {course.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1 ml-auto text-yellow-500 font-semibold">
                      ⭐ {course.rating}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="card-actions mt-2">
                    <button
                      onClick={() => setModalCourse(course)}
                      className={`btn btn-sm w-full bg-gradient-to-r ${course.accentColor} text-white border-none hover:opacity-90 gap-1`}
                    >
                      View Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {modalCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setModalCourse(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-36 bg-gradient-to-r ${modalCourse.accentColor} relative`}>
              <img
                src={modalCourse.courseImg}
                alt=""
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 p-4 rounded-full">
                  {<modalCourse.icon className="w-10 h-10 text-white" />}
                </div>
              </div>
              <button
                onClick={() => setModalCourse(null)}
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${modalCourse.tagColor}`}>
                  {modalCourse.tag}
                </span>
                <span className={`badge ${modalCourse.badgeColor} text-xs`}>{modalCourse.badge}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800 mt-2">{modalCourse.courseName}</h2>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">{modalCourse.description}</p>

              <div className="grid grid-cols-3 gap-3 mt-5 text-center">
                {[
                  { label: "Students", value: modalCourse.students, icon: Users },
                  { label: "Duration", value: modalCourse.duration, icon: Clock },
                  { label: "Rating", value: `⭐ ${modalCourse.rating}`, icon: Star },
                ].map(({ label, value, icon: Ic }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="font-bold text-gray-700 text-sm mt-0.5">{value}</p>
                  </div>
                ))}
              </div>

              <button
                className={`mt-5 w-full btn bg-gradient-to-r ${modalCourse.accentColor} text-white border-none hover:opacity-90`}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}