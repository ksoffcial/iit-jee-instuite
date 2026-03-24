import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axisoClient";
import {
  Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle,
  Circle, AlertCircle, BookOpen, Send, X, Atom, SkipForward,
  LayoutGrid, Flag, Trophy, RotateCcw, TrendingUp, Minus,
  Star, Target, Zap, Award,
} from "lucide-react";

/* ═══════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════ */
const OPTIONS = [
  { key: "option1", label: "A" },
  { key: "option2", label: "B" },
  { key: "option3", label: "C" },
  { key: "option4", label: "D" },
];

const pad = (n) => String(n).padStart(2, "0");
const formatTime = (secs) => {
  if (secs == null) return "--:--";
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

/* ═══════════════════════════════════════════
   ANSWER CHECKER
   Backend sends: question.answer = "option1" | "option2" | "option3" | "option4"
   We compare user's selected value against question.answer
═══════════════════════════════════════════ */
const checkAnswer = (question, userAnswer) => {
  if (!userAnswer) return "unattempted";
  return userAnswer === question?.answer ? "correct" : "wrong";
};

const computeScore = (questions, answers) => {
  let correct = 0, wrong = 0, unattempted = 0;
  questions.forEach((q, i) => {
    const result = checkAnswer(q, answers[i]);
    if (result === "correct") correct++;
    else if (result === "wrong") wrong++;
    else unattempted++;
  });
  return { correct, wrong, unattempted, total: questions.length };
};

/* ═══════════════════════════════════════════
   PALETTE BUTTON
═══════════════════════════════════════════ */
const PaletteBtn = ({ status, isActive, index: i, onClick }) => {
  let bg = "rgba(255,255,255,0.05)";
  let border = "rgba(255,255,255,0.1)";
  let color = "rgba(255,255,255,0.35)";
  if (status === "answered") { bg = "rgba(99,102,241,0.25)"; border = "rgba(99,102,241,0.5)"; color = "#a5b4fc"; }
  if (status === "flagged")  { bg = "rgba(245,158,11,0.2)";  border = "rgba(245,158,11,0.45)"; color = "#fcd34d"; }
  if (status === "skipped")  { bg = "rgba(71,85,105,0.3)";   border = "rgba(71,85,105,0.5)";  color = "rgba(255,255,255,0.3)"; }
  if (isActive) { bg = "white"; border = "white"; color = "#080a0f"; }

  return (
    <button
      onClick={onClick}
      style={{
        width: 32, height: 32, borderRadius: 8, fontSize: 11, fontWeight: 700,
        background: bg, border: `1.5px solid ${border}`, color,
        cursor: "pointer", transition: "all 0.18s ease",
        transform: isActive ? "scale(1.15)" : "scale(1)",
        boxShadow: isActive ? "0 0 0 3px rgba(99,102,241,0.35)" : "none",
      }}
    >
      {i + 1}
    </button>
  );
};

/* ═══════════════════════════════════════════
   SUBMIT MODAL
═══════════════════════════════════════════ */
const SubmitModal = ({ stats, onConfirm, onCancel }) => (
  <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }}>
    <div className="fade-in" style={{ width: "100%", maxWidth: 420, borderRadius: 20, padding: 28, background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 40px 80px rgba(0,0,0,0.8)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ padding: "10px", borderRadius: 12, background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
          <AlertCircle size={22} color="#fbbf24" />
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="syne" style={{ fontSize: 18, fontWeight: 800, color: "white", margin: 0 }}>Submit Test?</h2>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>This action cannot be undone.</p>
        </div>
        <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 4 }}>
          <X size={18} />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Answered", value: stats.answered, color: "#6366f1" },
          { label: "Skipped",  value: stats.skipped,  color: "#64748b" },
          { label: "Flagged",  value: stats.flagged,  color: "#f59e0b" },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 8px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <span className="syne" style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {stats.unanswered > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", marginBottom: 18 }}>
          <AlertCircle size={15} color="#f87171" />
          <span style={{ fontSize: 13, color: "#fca5a5" }}>{stats.unanswered} question{stats.unanswered > 1 ? "s" : ""} left unanswered.</span>
        </div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onCancel} style={{ flex: 1, padding: "11px 0", borderRadius: 12, fontSize: 14, fontWeight: 600, background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)", cursor: "pointer" }}>
          Go Back
        </button>
        <button onClick={onConfirm} style={{ flex: 1, padding: "11px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 6px 20px rgba(99,102,241,0.4)" }}>
          <Send size={14} /> Submit Now
        </button>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   RESULT SCREEN
═══════════════════════════════════════════ */
const ResultScreen = ({ testData, answers, timeTaken, onRetry }) => {
  const questions = testData?.questions ?? [];
  const score = computeScore(questions, answers);
  const pct = questions.length > 0 ? Math.round((score.correct / questions.length) * 100) : 0;

  const grade = pct >= 90 ? { label: "Outstanding!", color: "#f59e0b", icon: Trophy }
    : pct >= 75 ? { label: "Excellent!", color: "#6366f1", icon: Award }
    : pct >= 60 ? { label: "Good Job!", color: "#10b981", icon: TrendingUp }
    : pct >= 40 ? { label: "Keep Practicing", color: "#f97316", icon: Target }
    : { label: "Needs Improvement", color: "#ef4444", icon: Zap };

  const GradeIcon = grade.icon;

  return (
    <div style={{ minHeight: "100vh", background: "#080a0f", color: "white", fontFamily: "'DM Sans',sans-serif", padding: "32px 16px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap'); .syne{font-family:'Syne',sans-serif;} .fade-in{animation:fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both;} @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}`}</style>

      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        {/* header */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "8px 20px", borderRadius: 99, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b" }} />
            <span style={{ fontSize: 12, color: "#fcd34d", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>Test Completed</span>
          </div>
          <h1 className="syne" style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, margin: "0 0 8px" }}>Your Results</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>{testData?.TestName} · {testData?.ClassName}</p>
        </div>

        {/* score card */}
        <div className="fade-in" style={{ animationDelay: "60ms", borderRadius: 20, padding: "32px 24px", background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 20, textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.5)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${grade.color}18 0%, transparent 70%)`, pointerEvents: "none" }} />
          
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, borderRadius: "50%", background: `${grade.color}18`, border: `2px solid ${grade.color}40`, marginBottom: 14 }}>
            <GradeIcon size={32} color={grade.color} />
          </div>

          <div className="syne" style={{ fontSize: "clamp(52px,10vw,80px)", fontWeight: 800, color: grade.color, lineHeight: 1, marginBottom: 4 }}>
            {pct}<span style={{ fontSize: "40%", color: "rgba(255,255,255,0.3)" }}>%</span>
          </div>
          <p className="syne" style={{ fontSize: 20, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{grade.label}</p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
            Time taken: <strong style={{ color: "rgba(255,255,255,0.7)" }}>{formatTime(timeTaken)}</strong>
          </p>

          {/* score breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 24 }}>
            {[
              { label: "Correct",     val: score.correct,     color: "#10b981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.2)" },
              { label: "Wrong",       val: score.wrong,       color: "#ef4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.2)" },
              { label: "Unattempted", val: score.unattempted, color: "#64748b", bg: "rgba(100,116,139,0.1)", border: "rgba(100,116,139,0.2)" },
              { label: "Total",       val: score.total,       color: "#6366f1", bg: "rgba(99,102,241,0.1)",  border: "rgba(99,102,241,0.2)" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "14px 8px", borderRadius: 14, background: s.bg, border: `1px solid ${s.border}` }}>
                <div className="syne" style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* question-by-question review */}
        <div className="fade-in" style={{ animationDelay: "120ms", marginBottom: 24 }}>
          <h2 className="syne" style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 14 }}>Answer Review</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {questions.map((q, i) => {
              const userAns = answers[i];
              const result = checkAnswer(q, userAns);
              const isCorrect = result === "correct";
              const isWrong = result === "wrong";
              const isUnattempted = result === "unattempted";

              const cardBorder = isCorrect ? "rgba(16,185,129,0.25)" : isWrong ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.06)";
              const cardBg = isCorrect ? "rgba(16,185,129,0.05)" : isWrong ? "rgba(239,68,68,0.05)" : "#0d1117";
              const statusColor = isCorrect ? "#10b981" : isWrong ? "#ef4444" : "#64748b";
              const StatusIcon = isCorrect ? CheckCircle2 : isWrong ? XCircle : Minus;

              return (
                <div key={q._id ?? i} style={{ borderRadius: 16, padding: "18px 20px", background: cardBg, border: `1px solid ${cardBorder}` }}>
                  {/* question header */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#818cf8", flexShrink: 0 }}>
                      Q{i + 1}
                    </div>
                    <p style={{ flex: 1, color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{q.quest}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 99, background: `${statusColor}18`, border: `1px solid ${statusColor}35`, flexShrink: 0 }}>
                      <StatusIcon size={12} color={statusColor} />
                      <span style={{ fontSize: 11, fontWeight: 600, color: statusColor }}>{isCorrect ? "Correct" : isWrong ? "Wrong" : "Skipped"}</span>
                    </div>
                  </div>

                  {/* options */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {OPTIONS.map(({ key, label }) => {
                      const isCorrectOpt = q.answer === key;
                      const isUserOpt = userAns === key;
                      const both = isCorrectOpt && isUserOpt;

                      let bg = "rgba(255,255,255,0.03)";
                      let border = "rgba(255,255,255,0.07)";
                      let textColor = "rgba(255,255,255,0.4)";
                      let letterBg = "rgba(255,255,255,0.06)";
                      let letterColor = "rgba(255,255,255,0.3)";

                      if (isCorrectOpt) {
                        bg = "rgba(16,185,129,0.1)"; border = "rgba(16,185,129,0.35)";
                        textColor = "#6ee7b7"; letterBg = "rgba(16,185,129,0.25)"; letterColor = "#10b981";
                      }
                      if (isUserOpt && !isCorrectOpt) {
                        bg = "rgba(239,68,68,0.1)"; border = "rgba(239,68,68,0.35)";
                        textColor = "#fca5a5"; letterBg = "rgba(239,68,68,0.25)"; letterColor = "#ef4444";
                      }

                      return (
                        <div key={key} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 10, background: bg, border: `1px solid ${border}` }}>
                          <div style={{ width: 22, height: 22, borderRadius: 6, background: letterBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: letterColor, flexShrink: 0, marginTop: 1 }}>
                            {label}
                          </div>
                          <span style={{ fontSize: 13, color: textColor, lineHeight: 1.45, flex: 1 }}>{q[key]}</span>
                          {isCorrectOpt && <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />}
                          {isUserOpt && !isCorrectOpt && <XCircle size={13} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />}
                        </div>
                      );
                    })}
                  </div>

                  {/* your answer summary */}
                  <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {userAns && (
                      <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: isWrong ? "rgba(239,68,68,0.12)" : "rgba(16,185,129,0.12)", color: isWrong ? "#fca5a5" : "#6ee7b7", border: `1px solid ${isWrong ? "rgba(239,68,68,0.25)" : "rgba(16,185,129,0.25)"}` }}>
                        Your answer: {OPTIONS.find((o) => o.key === userAns)?.label}
                      </span>
                    )}
                    <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: "rgba(16,185,129,0.12)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.25)" }}>
                      Correct: {OPTIONS.find((o) => o.key === q.answer)?.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* retry button */}
        <div className="fade-in" style={{ animationDelay: "180ms", textAlign: "center" }}>
          <button onClick={onRetry} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 32px", borderRadius: 14, fontSize: 15, fontWeight: 700, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "white", cursor: "pointer", boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}>
            <RotateCcw size={16} /> Retry Test
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN TEST PANEL
═══════════════════════════════════════════ */
const TestPanel = () => {
  const { id } = useParams();

  /* state */
  const [testData, setTestData] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [qIndex, setQIndex]     = useState(0);
  const [answers, setAnswers]   = useState({});       // { qIndex: "option1"|... }
  const [statuses, setStatuses] = useState({});       // { qIndex: "answered"|"skipped"|"flagged" }
  const [timeLeft, setTimeLeft] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef(null);
  const startRef = useRef(Date.now());

  /* react-hook-form */
  const { register, handleSubmit, reset, watch } = useForm();

  /* fetch */
  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await axiosClient.get(`/test/getById/${id}`);
      // Support both array and object response
      const data = Array.isArray(res.data) ? res.data[0] : res.data;
      setTestData(data);
      setTimeLeft((data?.Duration ?? 60) * 60);
      startRef.current = Date.now();
    } catch {
      setError("Failed to load the test. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  /* timer */
  useEffect(() => {
    if (timeLeft === null || submitted) return;
    if (timeLeft <= 0) { handleFinalSubmit(); return; }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, submitted]);

  /* sync form when question changes */
  useEffect(() => {
    reset({ option: answers[qIndex] ?? "" });
  }, [qIndex, answers, reset]);

  /* derived */
  const questions  = testData?.questions ?? [];
  const total      = questions.length;
  const current    = questions[qIndex];
  const progress   = total > 0 ? ((qIndex + 1) / total) * 100 : 0;
  const timerDanger = timeLeft !== null && timeLeft < 300;

  const statCounts = {
    answered:   Object.values(statuses).filter((s) => s === "answered").length,
    skipped:    Object.values(statuses).filter((s) => s === "skipped").length,
    flagged:    Object.values(statuses).filter((s) => s === "flagged").length,
    unanswered: total - Object.keys(statuses).length,
  };

  /* handlers */
  const saveCurrentAnswer = useCallback((formData) => {
    if (formData.option) {
      setAnswers((prev) => ({ ...prev, [qIndex]: formData.option }));
      setStatuses((prev) => ({ ...prev, [qIndex]: "answered" }));
    }
  }, [qIndex]);

  const handleNext = handleSubmit((data) => {
    saveCurrentAnswer(data);
    if (qIndex < total - 1) setQIndex((i) => i + 1);
  });

  const handlePrev = () => {
    if (qIndex > 0) setQIndex((i) => i - 1);
  };

  const handleSkip = () => {
    setStatuses((prev) => ({ ...prev, [qIndex]: prev[qIndex] ?? "skipped" }));
    if (qIndex < total - 1) setQIndex((i) => i + 1);
  };

  const handleFlag = () => {
    setStatuses((prev) => ({
      ...prev,
      [qIndex]: prev[qIndex] === "flagged"
        ? (answers[qIndex] ? "answered" : "skipped")
        : "flagged",
    }));
  };

  const handleFinalSubmit = () => {
    clearTimeout(timerRef.current);
    setTimeTaken(Math.floor((Date.now() - startRef.current) / 1000));
    setSubmitted(true);
    setPaletteOpen(false);
    setShowModal(false);
  };

  const handleRetry = () => {
    setAnswers({}); setStatuses({});
    setQIndex(0); setSubmitted(false);
    setTimeLeft((testData?.Duration ?? 60) * 60);
    startRef.current = Date.now();
    reset({ option: "" });
  };

  /* ── LOADING ── */
  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: "#080a0f" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Syne:wght@700;800&display=swap'); .syne{font-family:'Syne',sans-serif;} .fade-in{animation:fadeUp 0.4s ease both;} @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}`}</style>
      <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2.5px solid #6366f1", borderTopColor: "transparent", animation: "spin 0.7s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Loading your test…</p>
    </div>
  );

  /* ── ERROR ── */
  if (error) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, background: "#080a0f", padding: 20 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Syne:wght@700&display=swap'); .syne{font-family:'Syne',sans-serif;}`}</style>
      <AlertCircle size={42} color="#f87171" strokeWidth={1.2} />
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center", maxWidth: 300 }}>{error}</p>
      <button onClick={fetchData} style={{ padding: "10px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.35)", color: "#a5b4fc", cursor: "pointer" }}>
        Retry
      </button>
    </div>
  );

  /* ── RESULT ── */
  if (submitted) return (
    <ResultScreen testData={testData} answers={answers} timeTaken={timeTaken} onRetry={handleRetry} />
  );

  /* ── TEST UI ── */
  return (
    <div style={{ minHeight: "100vh", background: "#080a0f", color: "white", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&family=Syne:wght@700;800&display=swap');
        .syne{font-family:'Syne',sans-serif;}
        .fade-in{animation:fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .opt-wrap input[type="radio"]{display:none;}
        .opt-wrap label{
          display:flex;align-items:flex-start;gap:13px;
          padding:13px 15px;border-radius:13px;cursor:pointer;
          border:1.5px solid rgba(255,255,255,0.07);
          background:rgba(255,255,255,0.03);
          transition:all 0.18s ease;width:100%;
          color:rgba(255,255,255,0.65);font-size:14px;line-height:1.55;
        }
        .opt-wrap input[type="radio"]:checked + label{
          border-color:#6366f1;background:rgba(99,102,241,0.13);color:white;
        }
        .opt-wrap label:hover{border-color:rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;}
        .opt-letter{
          min-width:26px;height:26px;border-radius:7px;
          display:flex;align-items:center;justify-content:center;
          font-size:11px;font-weight:700;flex-shrink:0;
          background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.4);
          transition:all 0.18s;
        }
        .opt-wrap input[type="radio"]:checked + label .opt-letter{background:#6366f1;color:white;}
        @keyframes pulse-danger{0%,100%{opacity:1;}50%{opacity:0.5;}}
        .timer-danger{animation:pulse-danger 1s ease infinite;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:99px;}
      `}</style>

      {/* ── TOP BAR ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 40, display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", background: "rgba(8,10,15,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
          <div style={{ padding: 7, borderRadius: 10, background: "rgba(99,102,241,0.18)", flexShrink: 0 }}>
            <Atom size={16} color="#818cf8" />
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, lineHeight: 1, marginBottom: 2 }}>Rakesh Physics Institute</p>
            <h1 className="syne" style={{ fontSize: 14, fontWeight: 800, color: "white", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {testData?.TestName ?? "Test"}
            </h1>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {/* timer */}
          <div className={timerDanger ? "timer-danger" : ""} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 13px", borderRadius: 10, background: timerDanger ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.07)", border: `1px solid ${timerDanger ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.1)"}`, fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: timerDanger ? "#f87171" : "rgba(255,255,255,0.8)" }}>
            <Clock size={13} />
            {formatTime(timeLeft)}
          </div>

          {/* palette toggle mobile */}
          <button onClick={() => setPaletteOpen((o) => !o)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", cursor: "pointer", fontSize: 12 }} className="lg-hide">
            <LayoutGrid size={13} /> <span style={{ display: "none" }}>Palette</span>
          </button>

          {/* submit */}
          <button onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: "0 4px 14px rgba(99,102,241,0.35)" }}>
            <Send size={13} /> Submit
          </button>
        </div>
      </header>

      {/* progress */}
      <div style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#6366f1,#8b5cf6)", transition: "width 0.4s ease" }} />
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px", display: "flex", gap: 20, alignItems: "flex-start" }}>

        {/* ── QUESTION AREA ── */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* meta pills */}
          <div className="fade-in" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
            <span style={{ padding: "5px 13px", borderRadius: 99, fontSize: 12, fontWeight: 600, color: "#a5b4fc", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.22)" }}>
              Q {qIndex + 1} / {total}
            </span>
            <span style={{ padding: "5px 13px", borderRadius: 99, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {testData?.ClassName}
            </span>
            {statuses[qIndex] === "flagged" && (
              <span style={{ padding: "5px 13px", borderRadius: 99, fontSize: 12, fontWeight: 600, color: "#fcd34d", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}>
                <Flag size={10} style={{ display: "inline", marginRight: 5 }} />Flagged
              </span>
            )}
          </div>

          {/* question card */}
          <div className="fade-in" style={{ animationDelay: "40ms", borderRadius: 18, padding: "22px 22px", marginBottom: 18, background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 9, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#818cf8" }} className="syne">
                Q{qIndex + 1}
              </div>
              <p style={{ flex: 1, color: "rgba(255,255,255,0.9)", fontSize: 16, lineHeight: 1.65, margin: 0, paddingTop: 4 }}>
                {current?.quest ?? "Question unavailable."}
              </p>
            </div>
          </div>

          {/* options */}
          <form onSubmit={handleNext}>
            <div className="fade-in" style={{ animationDelay: "70ms", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
              {OPTIONS.map(({ key, label }) => (
                <div key={key} className="opt-wrap" style={{ display: "contents" }}>
                  <input type="radio" id={`opt-${key}`} value={key} {...register("option")} />
                  <label htmlFor={`opt-${key}`} style={{ display: "flex" }}>
                    <span className="opt-letter">{label}</span>
                    <span style={{ flex: 1 }}>{current?.[key] ?? `Option ${label}`}</span>
                  </label>
                </div>
              ))}
            </div>

            {/* action bar */}
            <div className="fade-in" style={{ animationDelay: "100ms", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              <button type="button" onClick={handlePrev} disabled={qIndex === 0} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 11, fontSize: 13, fontWeight: 600, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: qIndex === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)", cursor: qIndex === 0 ? "not-allowed" : "pointer" }}>
                <ChevronLeft size={15} /> Prev
              </button>

              <button type="button" onClick={handleSkip} disabled={qIndex === total - 1} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 11, fontSize: 13, fontWeight: 600, background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: qIndex === total - 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.45)", cursor: qIndex === total - 1 ? "not-allowed" : "pointer" }}>
                <SkipForward size={14} /> Skip
              </button>

              <button type="button" onClick={handleFlag} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 11, fontSize: 13, fontWeight: 600, cursor: "pointer", border: statuses[qIndex] === "flagged" ? "1px solid rgba(245,158,11,0.45)" : "1px solid rgba(255,255,255,0.08)", background: statuses[qIndex] === "flagged" ? "rgba(245,158,11,0.1)" : "transparent", color: statuses[qIndex] === "flagged" ? "#fcd34d" : "rgba(255,255,255,0.45)" }}>
                <Flag size={14} /> {statuses[qIndex] === "flagged" ? "Unflag" : "Flag"}
              </button>

              <button type="submit" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 11, fontSize: 13, fontWeight: 700, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "white", cursor: "pointer", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}>
                {qIndex === total - 1 ? <><CheckCircle2 size={14} /> Save</> : <>Save & Next <ChevronRight size={14} /></>}
              </button>
            </div>
          </form>
        </main>

        {/* ── PALETTE SIDEBAR ── */}
        <aside style={{ width: 268, flexShrink: 0, position: "sticky", top: 72, maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
          <div style={{ borderRadius: 18, background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)", padding: 18 }}>

            {/* legend */}
            <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Question Palette</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 14 }}>
              {[
                { color: "rgba(99,102,241,0.5)", label: "Answered" },
                { color: "rgba(245,158,11,0.5)", label: "Flagged" },
                { color: "rgba(71,85,105,0.6)",  label: "Skipped" },
                { color: "rgba(255,255,255,0.1)", label: "Unanswered" },
              ].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: l.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{l.label}</span>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "10px 0 14px" }} />

            {/* grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6, marginBottom: 14 }}>
              {questions.map((_, i) => (
                <PaletteBtn key={i} index={i} status={statuses[i]} isActive={i === qIndex} onClick={() => setQIndex(i)} />
              ))}
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "10px 0 14px" }} />

            {/* stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {[
                { Icon: CheckCircle2, label: "Answered",   val: statCounts.answered,   color: "#6366f1" },
                { Icon: Flag,         label: "Flagged",    val: statCounts.flagged,    color: "#f59e0b" },
                { Icon: SkipForward,  label: "Skipped",    val: statCounts.skipped,    color: "#64748b" },
                { Icon: Circle,       label: "Remaining",  val: statCounts.unanswered, color: "#374151" },
              ].map(({ Icon, label, val, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon size={13} color={color} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{label}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color }}>{val}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setShowModal(true)} style={{ width: "100%", padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 6px 18px rgba(99,102,241,0.35)" }}>
              <Send size={14} /> Submit Test
            </button>

            {/* instructions */}
            <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 12, background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <BookOpen size={12} color="#818cf8" />
                <span style={{ fontSize: 11, fontWeight: 600, color: "#a5b4fc" }}>Instructions</span>
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.55, margin: 0 }}>
                Select an option and click <strong style={{ color: "rgba(255,255,255,0.5)" }}>Save & Next</strong>. Use <strong style={{ color: "rgba(255,255,255,0.5)" }}>Flag</strong> to revisit later. Answers auto-check on submit.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {showModal && <SubmitModal stats={statCounts} onConfirm={handleFinalSubmit} onCancel={() => setShowModal(false)} />}
    </div>
  );
};

export default TestPanel;