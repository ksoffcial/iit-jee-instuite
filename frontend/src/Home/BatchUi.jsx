import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axisoClient";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ChevronRight,
  Layers,
  GraduationCap,
  AlertCircle,
  Atom,
  Zap,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { enrolmentDetails } from "../enrollSlice";

const BatchUi = () => {
  const [batchData, setBatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enrolledCourseIds } = useSelector((state) => state.enroll);

  useEffect(() => {
    dispatch(enrolmentDetails());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/batch/allBatch");
        setBatchData(response.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070d18] flex items-center justify-center">
        <div className="text-center">
          <Atom
            size={44}
            className="mx-auto mb-4 text-yellow-500 animate-spin"
          />
          <p className="text-slate-400">Fetching batches...</p>
        </div>
      </div>
    );
  }

  if (error || batchData.length === 0) {
    return (
      <div className="min-h-screen bg-[#070d18] flex items-center justify-center px-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center max-w-sm">
          <AlertCircle size={38} className="mx-auto mb-3 text-red-400" />
          <h2 className="text-red-300 font-bold text-lg">
            Unable to load batches
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070d18] text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 blur-3xl rounded-full -top-32 -left-32"></div>
      <div className="absolute w-[350px] h-[350px] bg-blue-500/10 blur-3xl rounded-full top-20 -right-32"></div>

      <div className="relative z-10 px-4 sm:px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-5">
            <Zap size={14} className="text-yellow-500" />
            <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">
              Rakesh Physics Institute
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Upcoming & Running{" "}
            <span className="text-yellow-500">Batches</span>
          </h1>

          <p className="text-slate-400 max-w-xl mx-auto mt-4 text-sm sm:text-base">
            Choose your batch and take the next step toward JEE & NEET
            excellence.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <Users size={16} className="text-yellow-500" />
              <span className="font-bold">{batchData.length}</span>
              <span className="text-slate-400 text-xs">Active Batches</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <BookOpen size={16} className="text-blue-400" />
              <span className="font-bold">
                {batchData.reduce((s, b) => s + (b.subjects?.length || 0), 0)}
              </span>
              <span className="text-slate-400 text-xs">Subjects</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <GraduationCap size={16} className="text-purple-400" />
              <span className="font-bold">500+</span>
              <span className="text-slate-400 text-xs">Students</span>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Carousel + Laptop Grid */}
        <div className="max-w-7xl mx-auto">
          <div
            className="
              flex lg:grid
              lg:grid-cols-3
              gap-5 lg:gap-6
              overflow-x-auto lg:overflow-visible
              snap-x snap-mandatory
              scroll-smooth
              pb-5 lg:pb-0
              no-scrollbar
            "
          >
            {batchData.map((data, idx) => (
              <div
                key={data._id}
                className="
                  min-w-[88%] sm:min-w-[65%] md:min-w-[48%] lg:min-w-0
                  snap-center
                  bg-white/5 border border-white/10 rounded-3xl
                  backdrop-blur-xl p-5 sm:p-6
                  hover:border-yellow-500/40 hover:-translate-y-1
                  transition-all duration-300
                "
              >
                {/* Top */}
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                      <GraduationCap size={22} className="text-yellow-500" />
                    </div>

                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                        {data.BatchName}
                      </h2>
                      <p className="text-xs text-slate-500">
                        Batch #{String(idx + 1).padStart(2, "0")}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-bold uppercase">
                    {data.className}
                  </span>
                </div>

                <div className="divider my-3"></div>

                {/* Date and Time */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    <Calendar size={12} />
                    {new Date(data.startDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    <Clock size={12} />
                    {data.timePeriods}
                  </span>
                </div>

                {data.description && (
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {data.description}
                  </p>
                )}

                {/* Schedule */}
                {data.time?.length > 0 && (
                  <div className="mb-5">
                    <p className="text-[11px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-2 mb-3">
                      <Clock size={12} />
                      Class Schedule
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {data.time.map((slot, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-2 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/20"
                        >
                          <b>{slot.subject}</b> · {slot.subTime}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subjects */}
                {data.subjects?.length > 0 && (
                  <div className="mb-5">
                    <p className="text-[11px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-2 mb-3">
                      <BookOpen size={12} />
                      Subjects & Faculty
                    </p>

                    <div className="space-y-2">
                      {data.subjects.map((sub, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <Layers size={14} className="text-yellow-500" />
                            <span className="text-sm text-slate-200">
                              {sub.subjectName}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <User size={13} className="text-slate-400" />
                            <span className="text-xs text-slate-400">
                              {sub.teacherName}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="divider my-3"></div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Limited seats available
                  </span>

                  {enrolledCourseIds?.includes(data._id) ? (
                    <button
                      onClick={() => navigate(`/courese/details/${data._id}`)}
                      className="btn btn-primary btn-sm w-full sm:w-auto"
                    >
                      Go to Course
                      <ChevronRight size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/courese/enroll/${data._id}`)}
                      className="btn btn-warning btn-sm w-full sm:w-auto"
                    >
                      Enroll Now
                      <ChevronRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="lg:hidden text-center text-slate-500 text-xs mt-2">
          Swipe left to see more batches
        </p>
      </div>
    </div>
  );
};

export default BatchUi;