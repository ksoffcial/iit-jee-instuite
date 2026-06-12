import React from "react";
import { useNavigate } from "react-router";
import {
  BookOpen,
  GraduationCap,
  Stethoscope,
  Atom,
  ArrowRight,
  Clock,
  FileText,
} from "lucide-react";

const MockTest = () => {
  const navigate = useNavigate();

  const mockUi = [
    {
      id: 1,
      class: "11th",
      className:"11",
      desc: "Practice mock tests for Class 11 students with subject-wise questions.",
      icon: BookOpen,
      totalTest: 12,
      color: "bg-blue-600",
    },
    {
      id: 2,
      class: "12th",
      className:"12",
      desc: "Boost your board preparation with Class 12 mock tests.",
      icon: GraduationCap,
      totalTest: 15,
      color: "bg-indigo-600",
    },
    {
      id: 3,
      class: "JEE",
      className:"13",
      desc: "Prepare for JEE with chapter-wise and full syllabus mock tests.",
      icon: Atom,
      totalTest: 20,
      color: "bg-cyan-600",
    },
    {
      id: 4,
      class: "NEET",
      className:"14",
      desc: "Practice NEET mock tests for Biology, Physics, and Chemistry.",
      icon: Stethoscope,
      totalTest: 18,
      color: "bg-sky-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full mb-4">
            <FileText size={18} />
            <span className="text-sm font-medium">Online Mock Test Series</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Mock Test
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Practice with our latest mock tests and improve your preparation for
            boards, JEE, and NEET exams.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockUi.map((data) => {
            const Icon = data.icon;

            return (
              <div
                key={data.id}
                className="card bg-slate-900/80 border border-blue-500/20 shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="card-body">
                  <div
                    className={`w-14 h-14 ${data.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className="text-white" size={30} />
                  </div>

                  <h2 className="card-title text-white text-2xl">
                    Class {data.class}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {data.desc}
                  </p>

                  <div className="flex items-center gap-2 text-blue-300 mt-3">
                    <Clock size={18} />
                    <span className="text-sm">{data.totalTest} Mock Tests</span>
                  </div>

                  <div className="card-actions mt-6">
                    <button
                      onClick={() => navigate(`/test/mock/${data.className}`)}
                      className="btn bg-blue-600 hover:bg-blue-700 text-white border-none w-full rounded-xl"
                    >
                      Start Test
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-14 bg-slate-900/70 border border-blue-500/20 rounded-3xl p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Why Attempt Mock Tests?
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto">
            Mock tests help you understand your preparation level, improve time
            management, find weak topics, and build exam confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MockTest;