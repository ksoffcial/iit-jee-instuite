import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ClipboardCheck, BookOpen, ArrowRight } from "lucide-react";

const TestData = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      id: 1,
      name: "Mock Test",
      desc: "Practice with mock tests and analyze your performance before the real exam.",
      path: "/test/mockTest",
      icon: ClipboardCheck,
    },
    {
      id: 2,
      name: "My Exam",
      desc: "View your scheduled exams, monthly tests, and upcoming assessments.",
      path: "/test/myexam",
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-blue-900/40 bg-gradient-to-r from-black to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            <ArrowLeft size={18} />
            Home
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold text-blue-400 text-center">
            Test Dashboard
          </h1>

          <div className="hidden sm:block w-24"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
          Welcome to Your{" "}
          <span className="text-blue-500 block sm:inline">Test Portal</span>
        </h2>

        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          Attempt mock tests, participate in exams, and track your learning
          journey from a single dashboard.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {cardData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-blue-900 bg-[#0a0a0a] hover:border-blue-500 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative p-5 sm:p-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-5">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-blue-400">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <button
                    onClick={() => navigate(item.path)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
                  >
                    Open Portal
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestData;