import React, { useState, useRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axisoClient";
import {
  Send, Bot, Atom, Sparkles, BookOpen, Loader2, RotateCcw,
  Copy, Check, ThumbsUp, ThumbsDown, ChevronDown, Menu, X,
  Plus, MessageSquare, GraduationCap, Zap, FlaskConical,
  Calculator, Microscope, History, Trash2, User,
  ArrowUp, ChevronRight,
} from "lucide-react";

/* ══════════════════════════════════════════════════
   MARKDOWN RENDERER
   Parses bold, italic, code, headings, bullets, numbered lists
══════════════════════════════════════════════════ */
const renderMarkdown = (text) => {
  if (!text) return null;

  const lines = text.split("\n");
  const elements = [];
  let i = 0;
  let key = 0;

  const inlineFormat = (str) => {
    // code spans
    str = str.replace(/`([^`]+)`/g, (_, c) =>
      `<code class="md-code">${c}</code>`
    );
    // bold
    str = str.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    str = str.replace(/__(.+?)__/g, "<strong>$1</strong>");
    // italic
    str = str.replace(/\*(.+?)\*/g, "<em>$1</em>");
    str = str.replace(/_(.+?)_/g, "<em>$1</em>");
    return str;
  };

  while (i < lines.length) {
    const line = lines[i];

    // skip blank lines (just add spacing)
    if (line.trim() === "") {
      i++;
      continue;
    }

    // headings
    const h3 = line.match(/^###\s+(.*)/);
    const h2 = line.match(/^##\s+(.*)/);
    const h1 = line.match(/^#\s+(.*)/);
    if (h1) {
      elements.push(
        <h1 key={key++} className="md-h1" dangerouslySetInnerHTML={{ __html: inlineFormat(h1[1]) }} />
      );
      i++; continue;
    }
    if (h2) {
      elements.push(
        <h2 key={key++} className="md-h2" dangerouslySetInnerHTML={{ __html: inlineFormat(h2[1]) }} />
      );
      i++; continue;
    }
    if (h3) {
      elements.push(
        <h3 key={key++} className="md-h3" dangerouslySetInnerHTML={{ __html: inlineFormat(h3[1]) }} />
      );
      i++; continue;
    }

    // fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "text";
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={key++} className="md-code-block">
          <div className="md-code-header">
            <span className="md-code-lang">{lang}</span>
          </div>
          <pre className="md-pre"><code>{codeLines.join("\n")}</code></pre>
        </div>
      );
      i++; continue;
    }

    // horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={key++} className="md-hr" />);
      i++; continue;
    }

    // blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={key++} className="md-blockquote"
          dangerouslySetInnerHTML={{ __html: inlineFormat(line.slice(2)) }} />
      );
      i++; continue;
    }

    // bullet list — collect consecutive items
    if (/^[-*•]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*•]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*•]\s/, ""));
        i++;
      }
      elements.push(
        <ul key={key++} className="md-ul">
          {items.map((item, idx) => (
            <li key={idx} className="md-li" dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
          ))}
        </ul>
      );
      continue;
    }

    // numbered list
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="md-ol">
          {items.map((item, idx) => (
            <li key={idx} className="md-li" dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
          ))}
        </ol>
      );
      continue;
    }

    // paragraph
    elements.push(
      <p key={key++} className="md-p" dangerouslySetInnerHTML={{ __html: inlineFormat(line) }} />
    );
    i++;
  }

  return elements;
};

/* ══════════════════════════════════════════════════
   COPY BUTTON
══════════════════════════════════════════════════ */
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="action-btn" title="Copy">
      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
    </button>
  );
};

/* ══════════════════════════════════════════════════
   SUGGESTIONS
══════════════════════════════════════════════════ */
const SUGGESTIONS = [
  { icon: Atom,         text: "Explain Newton's Laws of Motion", subject: "Physics" },
  { icon: Calculator,  text: "How to solve integration by parts?", subject: "Maths" },
  { icon: FlaskConical,text: "Periodic Table trends explained", subject: "Chemistry" },
  { icon: Microscope,  text: "Difference between Mitosis and Meiosis", subject: "Biology" },
  { icon: Zap,         text: "JEE Advanced vs JEE Main — key differences", subject: "Exam" },
  { icon: BookOpen,    text: "Best strategy for NEET preparation", subject: "Strategy" },
];

/* ══════════════════════════════════════════════════
   CHAT SESSION TYPE
══════════════════════════════════════════════════ */
const newSession = (id) => ({ id, title: "New Chat", messages: [], createdAt: new Date() });

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
const AiChat = () => {
  const [sessions, setSessions] = useState([newSession("s1")]);
  const [activeId, setActiveId] = useState("s1");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [feedback, setFeedback] = useState({});        // { msgIndex: "up"|"down" }
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messageEndRef = useRef(null);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const inputValue = watch("doubt", "");

  const activeSession = sessions.find((s) => s.id === activeId);
  const messages = activeSession?.messages ?? [];

  /* scroll to bottom when messages change */
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 150);
  };

  /* update messages in active session */
  const addMessage = useCallback((msg) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== activeId) return s;
        const updated = [...s.messages, msg];
        const title = s.title === "New Chat" && msg.role === "user"
          ? msg.parts[0].text.slice(0, 36) + (msg.parts[0].text.length > 36 ? "…" : "")
          : s.title;
        return { ...s, messages: updated, title };
      })
    );
  }, [activeId]);

  const updateLastModelMessage = useCallback((text) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== activeId) return s;
        const msgs = [...s.messages];
        for (let i = msgs.length - 1; i >= 0; i--) {
          if (msgs[i].role === "model") { msgs[i] = { ...msgs[i], parts: [{ text }] }; break; }
        }
        return { ...s, messages: msgs };
      })
    );
  }, [activeId]);

  /* new chat */
  const startNewChat = () => {
    const id = "s" + Date.now();
    setSessions((prev) => [newSession(id), ...prev]);
    setActiveId(id);
    reset();
  };

  /* delete session */
  const deleteSession = (id) => {
    setSessions((prev) => {
      const next = prev.filter((s) => s.id !== id);
      if (id === activeId && next.length > 0) setActiveId(next[0].id);
      if (next.length === 0) { const ns = newSession("s" + Date.now()); setActiveId(ns.id); return [ns]; }
      return next;
    });
  };

  /* submit */
  const onSubmit = async (data) => {
    const text = data.doubt?.trim();
    if (!text || isTyping) return;

    addMessage({ role: "user", parts: [{ text }] });
    reset();
    if (textareaRef.current) { textareaRef.current.style.height = "24px"; }
    setIsTyping(true);

    try {
      const response = await axiosClient.post("/ai/doubt", { doubt: text });
      const reply = response.data.message || "I couldn't generate a response.";
      setIsTyping(false);
      addMessage({ role: "model", parts: [{ text: reply }] });
    } catch (err) {
      console.error("API Error:", err);
      setIsTyping(false);
      addMessage({
        role: "model",
        isError: true,
        parts: [{ text: "**Connection Error**\n\nI couldn't reach the AI server. Please check your connection and try again." }],
      });
    }
  };

  /* regenerate last answer */
  const regenerate = async () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser || isTyping) return;
    setIsTyping(true);
    try {
      const response = await axiosClient.post("/ai/doubt", { doubt: lastUser.parts[0].text });
      setIsTyping(false);
      updateLastModelMessage(response.data.message);
    } catch {
      setIsTyping(false);
    }
  };

  /* keyboard submit */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  /* auto-resize textarea */
  const handleInput = (e) => {
    e.target.style.height = "24px";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="ai-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ai-root { display:flex; height:100vh; background:#0a0a0a; color:#e8e8e6; font-family:'DM Sans',sans-serif; overflow:hidden; }

        /* ── SIDEBAR ── */
        .sidebar {
          width: 260px; flex-shrink:0;
          background: #141414;
          border-right: 1px solid rgba(255,255,255,0.06);
          display:flex; flex-direction:column;
          transition: width 0.25s ease, opacity 0.25s ease;
          overflow:hidden;
        }
        .sidebar.closed { width:0; opacity:0; }
        .sidebar-top { padding:16px 12px 10px; border-bottom:1px solid rgba(255,255,255,0.06); }
        .new-chat-btn {
          display:flex; align-items:center; gap:10px;
          width:100%; padding:10px 12px; border-radius:10px;
          background:transparent; border:1px solid rgba(255,255,255,0.12);
          color:rgba(255,255,255,0.75); font-size:14px; font-weight:500;
          cursor:pointer; transition:all 0.18s; font-family:inherit;
        }
        .new-chat-btn:hover { background:rgba(255,255,255,0.06); color:white; }
        .sidebar-sessions { flex:1; overflow-y:auto; padding:8px; }
        .sidebar-sessions::-webkit-scrollbar { width:3px; }
        .sidebar-sessions::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:99px; }
        .session-label { font-size:11px; color:rgba(255,255,255,0.3); font-weight:600; letter-spacing:0.08em; text-transform:uppercase; padding:8px 8px 4px; }
        .session-item {
          display:flex; align-items:center; gap:8px;
          padding:8px 10px; border-radius:8px; cursor:pointer;
          transition:all 0.15s; margin-bottom:2px; group:true;
        }
        .session-item:hover { background:rgba(255,255,255,0.05); }
        .session-item.active { background:rgba(255,255,255,0.08); }
        .session-title { flex:1; font-size:13px; color:rgba(255,255,255,0.6); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .session-item.active .session-title { color:rgba(255,255,255,0.9); }
        .session-del { opacity:0; background:none; border:none; cursor:pointer; color:rgba(255,255,255,0.35); padding:3px; border-radius:4px; transition:all 0.15s; }
        .session-item:hover .session-del { opacity:1; }
        .session-del:hover { color:#f87171; background:rgba(239,68,68,0.1); }
        .sidebar-bottom { padding:12px; border-top:1px solid rgba(255,255,255,0.06); }
        .sidebar-brand { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:10px; background:rgba(99,102,241,0.08); border:1px solid rgba(99,102,241,0.18); }

        /* ── MAIN ── */
        .main { flex:1; display:flex; flex-direction:column; min-width:0; background:#0a0a0a; }

        /* ── TOPBAR ── */
        .topbar {
          display:flex; align-items:center; gap:12px;
          padding:12px 20px; border-bottom:1px solid rgba(255,255,255,0.06);
          background:rgba(10,10,10,0.95); backdrop-filter:blur(16px);
          flex-shrink:0;
        }
        .topbar-menu { background:none; border:none; cursor:pointer; color:rgba(255,255,255,0.5); padding:6px; border-radius:8px; transition:all 0.15s; display:flex; }
        .topbar-menu:hover { background:rgba(255,255,255,0.07); color:white; }
        .model-badge { display:flex; align-items:center; gap:6px; padding:6px 12px; border-radius:99px; background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.25); font-size:12px; font-weight:600; color:#a5b4fc; }

        /* ── MESSAGES ── */
        .messages-wrap { flex:1; overflow-y:auto; scroll-behavior:smooth; }
        .messages-wrap::-webkit-scrollbar { width:4px; }
        .messages-wrap::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.08); border-radius:99px; }
        .messages-inner { max-width:760px; margin:0 auto; padding:24px 20px 40px; }

        /* ── WELCOME ── */
        .welcome { text-align:center; padding:60px 20px 32px; }
        .welcome-logo { width:64px; height:64px; border-radius:20px; background:linear-gradient(135deg,#1e1b4b,#312e81); border:1px solid rgba(99,102,241,0.35); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; }
        .welcome h1 { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:white; margin-bottom:8px; }
        .welcome p { font-size:15px; color:rgba(255,255,255,0.4); max-width:420px; margin:0 auto; line-height:1.6; }
        .suggestion-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:28px; }
        @media(max-width:540px){ .suggestion-grid { grid-template-columns:1fr; } }
        .suggestion-card {
          display:flex; align-items:flex-start; gap:10px;
          padding:12px 14px; border-radius:12px; text-align:left; cursor:pointer;
          background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08);
          transition:all 0.18s; font-family:inherit;
        }
        .suggestion-card:hover { background:rgba(99,102,241,0.08); border-color:rgba(99,102,241,0.3); }
        .suggestion-card .icon-wrap { width:28px; height:28px; border-radius:8px; background:rgba(99,102,241,0.15); display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
        .suggestion-card .s-text { font-size:13px; color:rgba(255,255,255,0.65); line-height:1.4; }
        .suggestion-card .s-subject { font-size:11px; color:rgba(99,102,241,0.8); font-weight:600; margin-bottom:2px; }

        /* ── MESSAGE ROW ── */
        .msg-row { display:flex; gap:14px; padding:6px 0; }
        .msg-row.user { flex-direction:row-reverse; }
        .avatar { width:32px; height:32px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px; }
        .avatar.bot { background:linear-gradient(135deg,#1e1b4b,#312e81); border:1px solid rgba(99,102,241,0.4); }
        .avatar.user { background:linear-gradient(135deg,#1d4ed8,#2563eb); }
        .msg-content { flex:1; min-width:0; }
        .msg-row.user .msg-content { display:flex; flex-direction:column; align-items:flex-end; }

        /* USER BUBBLE */
        .user-bubble {
          display:inline-block; max-width:85%;
          background:#1e293b; border:1px solid rgba(255,255,255,0.1);
          color:rgba(255,255,255,0.9); font-size:15px; line-height:1.65;
          padding:12px 16px; border-radius:18px 18px 4px 18px;
        }

        /* BOT ANSWER */
        .bot-answer { font-size:15px; line-height:1.75; color:rgba(255,255,255,0.87); }
        .bot-answer.error { color:#fca5a5; }

        /* MARKDOWN STYLES */
        .md-h1 { font-family:'Syne',sans-serif; font-size:20px; font-weight:800; color:white; margin:18px 0 8px; }
        .md-h2 { font-family:'Syne',sans-serif; font-size:17px; font-weight:700; color:white; margin:16px 0 6px; }
        .md-h3 { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; color:#a5b4fc; margin:12px 0 4px; }
        .md-p  { margin:6px 0; color:rgba(255,255,255,0.82); line-height:1.75; }
        .md-ul { margin:8px 0 8px 0; padding:0; list-style:none; }
        .md-ol { margin:8px 0 8px 0; padding:0; list-style:none; counter-reset:md-ol; }
        .md-li { position:relative; padding:4px 0 4px 20px; color:rgba(255,255,255,0.78); font-size:15px; line-height:1.65; }
        .md-ul .md-li::before { content:''; position:absolute; left:4px; top:13px; width:6px; height:6px; border-radius:50%; background:#6366f1; }
        .md-ol .md-li { counter-increment:md-ol; }
        .md-ol .md-li::before { content:counter(md-ol)'.'; position:absolute; left:0; top:4px; font-size:13px; font-weight:700; color:#6366f1; }
        .md-code { font-family:monospace; font-size:13px; background:rgba(99,102,241,0.15); color:#a5b4fc; padding:2px 6px; border-radius:5px; border:1px solid rgba(99,102,241,0.2); }
        .md-code-block { margin:12px 0; border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); background:#0d0d0d; }
        .md-code-header { display:flex; align-items:center; justify-content:space-between; padding:8px 14px; background:rgba(255,255,255,0.04); border-bottom:1px solid rgba(255,255,255,0.07); }
        .md-code-lang { font-size:11px; font-weight:600; color:rgba(255,255,255,0.35); text-transform:uppercase; letter-spacing:0.08em; }
        .md-pre { padding:16px; overflow-x:auto; font-family:monospace; font-size:13px; color:#e2e8f0; line-height:1.65; }
        .md-pre::-webkit-scrollbar { height:3px; }
        .md-pre::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:99px; }
        .md-hr { border:none; border-top:1px solid rgba(255,255,255,0.08); margin:16px 0; }
        .md-blockquote { border-left:3px solid #6366f1; padding:8px 14px; margin:10px 0; background:rgba(99,102,241,0.06); border-radius:0 8px 8px 0; color:rgba(255,255,255,0.65); font-style:italic; }

        /* ACTION ROW */
        .action-row { display:flex; gap:4px; margin-top:10px; }
        .action-btn { display:flex; align-items:center; gap:5px; padding:5px 8px; border-radius:8px; background:none; border:1px solid transparent; color:rgba(255,255,255,0.3); cursor:pointer; font-size:12px; transition:all 0.15s; font-family:inherit; }
        .action-btn:hover { background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.1); color:rgba(255,255,255,0.7); }
        .action-btn.liked { color:#34d399; }
        .action-btn.disliked { color:#f87171; }

        /* TYPING */
        .typing-row { display:flex; gap:14px; padding:6px 0; }
        .typing-dots { display:flex; gap:5px; padding:14px 18px; background:transparent; align-items:center; }
        .typing-dot { width:7px; height:7px; border-radius:50%; background:#6366f1; animation:typingBounce 1.3s ease-in-out infinite; }
        .typing-dot:nth-child(2){animation-delay:0.15s;}
        .typing-dot:nth-child(3){animation-delay:0.3s;}
        @keyframes typingBounce { 0%,60%,100%{transform:translateY(0);opacity:0.4;} 30%{transform:translateY(-7px);opacity:1;} }

        /* INPUT AREA */
        .input-area { flex-shrink:0; padding:14px 20px 18px; background:#0a0a0a; border-top:1px solid rgba(255,255,255,0.06); }
        .input-box-wrap { max-width:760px; margin:0 auto; }
        .input-box {
          position:relative; display:flex; align-items:flex-end; gap:8px;
          background:#141414; border:1.5px solid rgba(255,255,255,0.1);
          border-radius:16px; padding:12px 14px; transition:border-color 0.2s, box-shadow 0.2s;
        }
        .input-box:focus-within { border-color:rgba(99,102,241,0.5); box-shadow:0 0 0 3px rgba(99,102,241,0.1); }
        .input-textarea {
          flex:1; background:transparent; border:none; outline:none; resize:none;
          font-family:'DM Sans',sans-serif; font-size:15px; color:rgba(255,255,255,0.87);
          line-height:1.6; height:24px; max-height:160px; overflow-y:auto;
        }
        .input-textarea::placeholder { color:rgba(255,255,255,0.25); }
        .input-textarea::-webkit-scrollbar { width:3px; }
        .input-textarea::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); }
        .send-btn {
          width:36px; height:36px; border-radius:10px; border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
          background:linear-gradient(135deg,#4338ca,#1e40af);
          transition:all 0.18s; box-shadow:0 2px 10px rgba(67,56,202,0.35);
        }
        .send-btn:hover:not(:disabled) { transform:scale(1.06); box-shadow:0 4px 16px rgba(67,56,202,0.5); }
        .send-btn:disabled { background:rgba(255,255,255,0.07); box-shadow:none; cursor:not-allowed; }
        .input-footer { display:flex; align-items:center; justify-content:space-between; margin-top:8px; }
        .quick-chips { display:flex; gap:6px; overflow-x:auto; scrollbar-width:none; }
        .quick-chips::-webkit-scrollbar { display:none; }
        .chip { flex-shrink:0; padding:4px 10px; border-radius:99px; font-size:12px; font-weight:500; cursor:pointer; background:rgba(99,102,241,0.08); border:1px solid rgba(99,102,241,0.2); color:rgba(255,255,255,0.45); transition:all 0.15s; font-family:inherit; white-space:nowrap; }
        .chip:hover { background:rgba(99,102,241,0.15); border-color:rgba(99,102,241,0.4); color:rgba(255,255,255,0.8); }
        .hint-text { font-size:11px; color:rgba(255,255,255,0.2); flex-shrink:0; }

        /* SCROLL BTN */
        .scroll-btn {
          position:fixed; bottom:110px; right:24px; z-index:20;
          width:34px; height:34px; border-radius:50%; border:1px solid rgba(255,255,255,0.12);
          background:#1c1c1c; color:rgba(255,255,255,0.6); cursor:pointer;
          display:flex; align-items:center; justify-content:center; transition:all 0.15s;
        }
        .scroll-btn:hover { background:#2a2a2a; color:white; }

        /* ANIMATIONS */
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
        .msg-enter { animation:fadeSlideIn 0.3s cubic-bezier(0.22,1,0.36,1) both; }

        /* MOBILE */
        @media(max-width:640px){
          .sidebar { position:fixed; top:0; left:0; bottom:0; z-index:40; }
          .sidebar.closed { width:0; }
          .messages-inner { padding:16px 14px 32px; }
          .suggestion-grid { grid-template-columns:1fr; }
          .input-area { padding:10px 12px 14px; }
        }
      `}</style>

      {/* ══ SIDEBAR ══════════════════════════════════ */}
      <div className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
        <div className="sidebar-top">
          <button className="new-chat-btn" onClick={startNewChat}>
            <Plus size={16} /> New chat
          </button>
        </div>

        <div className="sidebar-sessions">
          {sessions.length > 0 && <div className="session-label">Recent</div>}
          {sessions.map((s) => (
            <div
              key={s.id}
              className={`session-item ${s.id === activeId ? "active" : ""}`}
              onClick={() => setActiveId(s.id)}
            >
              <MessageSquare size={13} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
              <span className="session-title">{s.title}</span>
              <button
                className="session-del"
                onClick={(e) => { e.stopPropagation(); deleteSession(s.id); }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-brand">
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#4338ca,#1e40af)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <GraduationCap size={15} style={{ color: "white" }} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "white", fontFamily: "'Syne',sans-serif" }}>Rakesh Physics</div>
              <div style={{ fontSize: 11, color: "rgba(99,102,241,0.8)" }}>JEE · NEET · AI Tutor</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MAIN PANEL ══════════════════════════════ */}
      <div className="main">

        {/* topbar */}
        <div className="topbar">
          <button className="topbar-menu" onClick={() => setSidebarOpen((o) => !o)}>
            <Menu size={18} />
          </button>
          <div className="model-badge">
            <Atom size={13} />
            AI Doubt Solver
          </div>
          {messages.length > 0 && (
            <button
              onClick={startNewChat}
              className="topbar-menu"
              style={{ marginLeft: "auto" }}
              title="New chat"
            >
              <Plus size={17} />
            </button>
          )}
        </div>

        {/* messages */}
        <div className="messages-wrap" ref={scrollRef} onScroll={handleScroll}>
          <div className="messages-inner">

            {/* ── WELCOME SCREEN ── */}
            {isEmpty && (
              <div className="welcome msg-enter">
                <div className="welcome-logo">
                  <Sparkles size={28} style={{ color: "#a5b4fc" }} />
                </div>
                <h1>What's your doubt today?</h1>
                <p>Ask anything about Physics, Chemistry, Maths or Biology. I'll explain it clearly for JEE & NEET.</p>

                <div className="suggestion-grid">
                  {SUGGESTIONS.map(({ icon: Icon, text, subject }) => (
                    <button
                      key={text}
                      className="suggestion-card"
                      onClick={() => { setValue("doubt", text); handleSubmit(onSubmit)(); }}
                    >
                      <div className="icon-wrap"><Icon size={14} style={{ color: "#a5b4fc" }} /></div>
                      <div>
                        <div className="s-subject">{subject}</div>
                        <div className="s-text">{text}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── MESSAGES ── */}
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              const isLastModel = !isUser && idx === messages.length - 1;

              return (
                <div key={idx} className={`msg-row msg-enter ${isUser ? "user" : ""}`} style={{ animationDelay: `${Math.min(idx * 20, 100)}ms` }}>
                  {/* avatar */}
                  <div className={`avatar ${isUser ? "user" : "bot"}`}>
                    {isUser
                      ? <User size={15} style={{ color: "white" }} />
                      : <Bot size={15} style={{ color: "#a5b4fc" }} />
                    }
                  </div>

                  {/* content */}
                  <div className="msg-content">
                    {isUser ? (
                      <div className="user-bubble">{msg.parts[0].text}</div>
                    ) : (
                      <>
                        <div className={`bot-answer ${msg.isError ? "error" : ""}`}>
                          {renderMarkdown(msg.parts[0].text)}
                        </div>

                        {/* action row */}
                        <div className="action-row">
                          <CopyButton text={msg.parts[0].text} />
                          <button
                            className={`action-btn ${feedback[idx] === "up" ? "liked" : ""}`}
                            onClick={() => setFeedback((f) => ({ ...f, [idx]: f[idx] === "up" ? null : "up" }))}
                          >
                            <ThumbsUp size={13} />
                          </button>
                          <button
                            className={`action-btn ${feedback[idx] === "down" ? "disliked" : ""}`}
                            onClick={() => setFeedback((f) => ({ ...f, [idx]: f[idx] === "down" ? null : "down" }))}
                          >
                            <ThumbsDown size={13} />
                          </button>
                          {isLastModel && (
                            <button className="action-btn" onClick={regenerate} disabled={isTyping}>
                              <RotateCcw size={13} />
                              <span>Regenerate</span>
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {/* typing indicator */}
            {isTyping && (
              <div className="typing-row msg-enter">
                <div className="avatar bot">
                  <Bot size={15} style={{ color: "#a5b4fc" }} />
                </div>
                <div className="typing-dots">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messageEndRef} />
          </div>
        </div>

        {/* scroll to bottom */}
        {showScrollBtn && (
          <button className="scroll-btn" onClick={() => messageEndRef.current?.scrollIntoView({ behavior: "smooth" })}>
            <ChevronDown size={15} />
          </button>
        )}

        {/* ══ INPUT AREA ══════════════════════════════ */}
        <div className="input-area">
          <div className="input-box-wrap">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-box">
                <textarea
                  {...register("doubt")}
                  ref={(el) => { textareaRef.current = el; register("doubt").ref(el); }}
                  className="input-textarea"
                  placeholder="Ask your doubt… (Enter to send, Shift+Enter for new line)"
                  onKeyDown={handleKeyDown}
                  onInput={handleInput}
                  disabled={isTyping}
                  rows={1}
                />
                <button
                  type="submit"
                  className="send-btn"
                  disabled={isTyping || !inputValue?.trim()}
                >
                  {isTyping
                    ? <Loader2 size={16} style={{ color: "rgba(255,255,255,0.5)", animation: "spin 0.8s linear infinite" }} />
                    : <ArrowUp size={17} style={{ color: "white" }} />
                  }
                </button>
              </div>
            </form>

            <div className="input-footer">
              <div className="quick-chips">
                {["Newton's Laws", "Organic Chemistry", "Integration", "NEET Strategy"].map((c) => (
                  <button key={c} className="chip" onClick={() => { setValue("doubt", c); }}>
                    {c}
                  </button>
                ))}
              </div>
              <div className="hint-text">Shift+Enter for new line</div>
            </div>
          </div>
        </div>

      </div>

      {/* mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{ display: "none" }}
        />
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

export default AiChat;