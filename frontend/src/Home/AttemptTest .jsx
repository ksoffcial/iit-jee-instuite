import React, { useEffect, useState } from "react";
import {
  Clock,
  Send,
  CheckCircle2,
  FileText,
  Loader2,
  AlertCircle,
  BookOpen,
  ChevronRight,
  CircleDot,
  LayoutGrid,
  Trophy,
} from "lucide-react";
import { useParams, useNavigate } from "react-router";
import axiosClient from "../utils/axisoClient";

const AttemptTest = () => {
  const [testData, setTestData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [message, setMessage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axiosClient.get(`/test/getById/${id}`);
        if (response.data.message && !response.data.questions) {
          setMessage(response.data.message);
        } else {
          setTestData(response.data);
          setTimeLeft(response.data.durationMinutes * 60);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setMessage("Failed to load test. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0 || loading || message) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading, message]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmitTest = async () => {
    try {
      setSubmitting(true);
      const answers = testData.questions.map((q) => ({
        questionId: q._id,
        selectedAnswer: selectedAnswers[q._id] || null,
      }));
      const response = await axiosClient.post(`/test/submit/${id}`, { answers });
      if (response.data.resultVisible) {
        alert(`Score: ${response.data.obtainedMarks}/${response.data.totalMarks}`);
      } else {
        alert("Submitted! Results will be announced later.");
      }
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const isUrgent = timeLeft < 300;
  const totalQuestions = testData?.questions?.length || 0;
  const attemptedCount = Object.keys(selectedAnswers).length;
  const progressPercent = totalQuestions > 0 ? Math.round((attemptedCount / totalQuestions) * 100) : 0;
  const optionLabels = ["A", "B", "C", "D"];

  // ── Loading Screen ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="text-primary" size={36} />
          </div>
          <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-base-100 flex items-center justify-center shadow">
            <Loader2 className="animate-spin text-primary" size={16} />
          </span>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-base-content">Preparing your exam</p>
          <p className="text-sm text-base-content/50 mt-1">Please wait a moment…</p>
        </div>
      </div>
    );
  }

  // ── Notice / Already Submitted ──────────────────────────────────
  if (message) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
        <div className="card bg-base-100 shadow-xl w-full max-w-sm">
          <div className="card-body items-center text-center gap-4 py-10">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <Trophy className="text-success" size={32} />
            </div>
            <div>
              <h2 className="card-title justify-center text-xl">Notice</h2>
              <p className="text-base-content/60 mt-2 text-sm leading-relaxed">{message}</p>
            </div>
            <button onClick={() => navigate("/")} className="btn btn-primary btn-block mt-2">
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Exam UI ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-base-200">

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-30 bg-base-100 border-b border-base-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">

          {/* Test Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-primary/10 items-center justify-center shrink-0">
              <FileText size={20} className="text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-base-content text-sm sm:text-base leading-tight truncate">
                {testData?.TestName}
              </h1>
              <div className="flex items-center gap-1 text-xs text-base-content/50 mt-0.5">
                <LayoutGrid size={11} />
                <span>{testData?.ClassName}</span>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold text-sm border-2 shrink-0 transition-all ${
              isUrgent
                ? "border-error text-error bg-error/5 animate-pulse"
                : "border-primary/20 text-primary bg-primary/5"
            }`}
          >
            <Clock size={15} />
            {formatTime(timeLeft)}
          </div>

          {/* Finish Button */}
          <button
            onClick={() => document.getElementById("submit_modal").showModal()}
            className="btn btn-primary btn-sm gap-1.5 shrink-0"
          >
            <Send size={14} />
            <span className="hidden sm:inline">Finish</span>
          </button>
        </div>

        {/* Thin progress bar below header */}
        <div className="h-0.5 bg-base-300">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* ── Page Body ── */}
      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ── Questions ── */}
        <div className="lg:col-span-3 space-y-5">
          {testData.questions?.map((question, index) => {
            const answered = !!selectedAnswers[question._id];
            return (
              <section
                key={question._id}
                id={`q-${index}`}
                className={`card bg-base-100 transition-all duration-200 ${
                  answered ? "border border-primary/30 shadow-sm" : "border border-base-300 shadow-sm"
                }`}
              >
                <div className="card-body p-5 sm:p-6 gap-5">

                  {/* Question Header */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                        answered
                          ? "bg-primary text-primary-content border-primary"
                          : "bg-base-200 text-base-content/60 border-base-300"
                      }`}
                    >
                      {answered ? <CheckCircle2 size={16} /> : index + 1}
                    </div>
                    <h2 className="text-base font-semibold text-base-content leading-relaxed flex-1 pt-1">
                      {question.quest}
                    </h2>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1">
                    {["option1", "option2", "option3", "option4"].map((optKey, i) => {
                      const isSelected = selectedAnswers[question._id] === optKey;
                      return (
                        <label
                          key={optKey}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none ${
                            isSelected
                              ? "border-primary bg-primary/8 shadow-sm"
                              : "border-base-200 hover:border-base-300 hover:bg-base-200/60"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${question._id}`}
                            className="radio radio-primary radio-sm shrink-0"
                            checked={isSelected}
                            onChange={() => handleAnswerChange(question._id, optKey)}
                          />
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                              isSelected
                                ? "bg-primary text-primary-content"
                                : "bg-base-300 text-base-content/60"
                            }`}
                          >
                            {optionLabels[i]}
                          </span>
                          <span
                            className={`text-sm font-medium leading-snug ${
                              isSelected ? "text-primary" : "text-base-content/70"
                            }`}
                          >
                            {question[optKey]}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* ── Sidebar ── */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">

            {/* Progress Card */}
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body p-5 gap-4">

                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base-content text-sm flex items-center gap-2">
                    <CircleDot size={16} className="text-primary" />
                    Progress
                  </h3>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {progressPercent}%
                  </span>
                </div>

                {/* Radial-style stat */}
                <div className="flex items-center gap-4">
                  <div
                    className="radial-progress text-primary text-xs font-bold shrink-0"
                    style={{ "--value": progressPercent, "--size": "3.5rem", "--thickness": "4px" }}
                    role="progressbar"
                  >
                    {attemptedCount}/{totalQuestions}
                  </div>
                  <div>
                    <p className="text-xs text-base-content/50">Answered</p>
                    <p className="text-2xl font-bold text-base-content leading-tight">{attemptedCount}</p>
                    <p className="text-xs text-base-content/40">of {totalQuestions} questions</p>
                  </div>
                </div>

                {/* Question Grid */}
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {testData.questions?.map((q, i) => (
                    <a
                      key={q._id}
                      href={`#q-${i}`}
                      title={`Question ${i + 1}`}
                      className={`aspect-square flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                        selectedAnswers[q._id]
                          ? "bg-primary text-primary-content shadow-sm"
                          : "bg-base-200 text-base-content/40 hover:bg-base-300 hover:text-base-content/70"
                      }`}
                    >
                      {i + 1}
                    </a>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-xs text-base-content/50 pt-1 border-t border-base-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-primary inline-block" />
                    Answered
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-base-200 inline-block" />
                    Skipped
                  </span>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="alert bg-warning/10 border border-warning/30 text-warning-content p-3 rounded-xl text-xs gap-2 shadow-sm">
              <AlertCircle size={15} className="text-warning shrink-0" />
              <span className="text-base-content/70 leading-snug">
                Progress is saved only after you submit.
              </span>
            </div>

            {/* Finish Button (sidebar) */}
            <button
              onClick={() => document.getElementById("submit_modal").showModal()}
              className="btn btn-primary btn-block gap-2"
            >
              <Send size={16} />
              Submit Exam
              <ChevronRight size={16} />
            </button>
          </div>
        </aside>
      </main>

      {/* ── Submit Confirmation Modal ── */}
      <dialog id="submit_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0 overflow-hidden">

          {/* Modal Header */}
          <div className="bg-primary/5 border-b border-base-200 px-8 py-6 text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Send size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-base-content">Submit Exam?</h3>
          </div>

          {/* Modal Body */}
          <div className="px-8 py-6 space-y-5">

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Answered", value: attemptedCount, color: "text-success" },
                { label: "Skipped", value: totalQuestions - attemptedCount, color: "text-warning" },
                { label: "Total", value: totalQuestions, color: "text-primary" },
              ].map((s) => (
                <div key={s.label} className="bg-base-200 rounded-xl py-3">
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-base-content/50 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {totalQuestions - attemptedCount > 0 && (
              <div className="alert alert-warning text-xs py-3 rounded-xl gap-2">
                <AlertCircle size={15} />
                <span>
                  You have <strong>{totalQuestions - attemptedCount}</strong> unanswered question
                  {totalQuestions - attemptedCount > 1 ? "s" : ""}. You can still go back and answer them.
                </span>
              </div>
            )}

            <p className="text-sm text-base-content/60 text-center leading-relaxed">
              Once submitted, you cannot change your answers.
            </p>
          </div>

          {/* Modal Actions */}
          <div className="px-8 pb-6 flex gap-3">
            <form method="dialog" className="flex-1">
              <button className="btn btn-ghost btn-block">Review Answers</button>
            </form>
            <button
              onClick={handleSubmitTest}
              disabled={submitting}
              className="btn btn-primary flex-1 gap-2"
            >
              {submitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <Send size={15} />
              )}
              {submitting ? "Submitting…" : "Yes, Submit"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AttemptTest;