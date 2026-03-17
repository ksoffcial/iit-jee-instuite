import React, { useEffect, useState } from 'react'
import axiosClient from '../utils/axisoClient'
import {
  BookOpen, Calendar, Clock, User,
  ChevronRight, Layers, GraduationCap,
  AlertCircle, Loader2, Atom, Zap, Users
} from 'lucide-react'

/* ── Inline styles injected once ── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .bd-root { font-family: 'DM Sans', sans-serif; }

  .bd-hero-title { font-family: 'Playfair Display', serif; }

  .bd-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 20px;
    backdrop-filter: blur(12px);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    opacity: 0;
    transform: translateY(28px);
    animation: cardReveal 0.55s ease forwards;
  }
  .bd-card:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(232,184,75,0.25);
    border-color: rgba(232,184,75,0.3);
  }

  @keyframes cardReveal {
    to { opacity: 1; transform: translateY(0); }
  }

  .bd-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 11px; border-radius: 999px;
    font-size: 11.5px; font-weight: 500; letter-spacing: 0.03em;
  }

  .bd-subject-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 12px; border-radius: 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    transition: background 0.2s;
  }
  .bd-subject-row:hover { background: rgba(232,184,75,0.07); }

  .bd-schedule-chip {
    display: inline-flex; align-items: center; gap-6px; 
    padding: 6px 12px; border-radius: 10px;
    background: rgba(99,179,237,0.1);
    border: 1px solid rgba(99,179,237,0.2);
    font-size: 12px; color: #90cdf4;
    transition: background 0.2s;
  }
  .bd-schedule-chip:hover { background: rgba(99,179,237,0.18); }

  .bd-enroll-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 22px; border-radius: 12px;
    background: linear-gradient(135deg, #e8b84b, #d4943a);
    color: #1a1200; font-weight: 600; font-size: 14px;
    border: none; cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 18px rgba(232,184,75,0.35);
  }
  .bd-enroll-btn:hover {
    opacity: 0.92; transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(232,184,75,0.45);
  }
  .bd-enroll-btn:active { transform: scale(0.97); }

  .bd-section-label {
    font-size: 10.5px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.14em;
    color: rgba(255,255,255,0.35);
    display: flex; align-items: center; gap: 6px;
    margin-bottom: 10px;
  }

  .bd-divider {
    height: 1px; background: rgba(255,255,255,0.07); margin: 16px 0;
  }

  .bd-badge-class {
    font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
    padding: 3px 10px; border-radius: 6px;
    background: rgba(232,184,75,0.15);
    color: #e8b84b;
    border: 1px solid rgba(232,184,75,0.25);
  }

  .bd-stat {
    display: flex; flex-direction: column; align-items: center;
    gap: 4px; padding: 12px 16px; border-radius: 12px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    flex: 1; text-align: center;
  }

  .bd-bg-orb {
    position: absolute; border-radius: 50%;
    filter: blur(90px); pointer-events: none; z-index: 0;
  }

  .bd-spin-slow { animation: spin 18s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Stagger delays */
  .bd-card:nth-child(1) { animation-delay: 0.05s; }
  .bd-card:nth-child(2) { animation-delay: 0.13s; }
  .bd-card:nth-child(3) { animation-delay: 0.21s; }
  .bd-card:nth-child(4) { animation-delay: 0.29s; }
  .bd-card:nth-child(5) { animation-delay: 0.37s; }
  .bd-card:nth-child(6) { animation-delay: 0.45s; }
`

const BatchUi = () => {
  const [batchData, setBatchData] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(false)

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = globalStyles
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('/batch/allBatch')
        setBatchData(response.data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  /* ── Loading ── */
  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#070d18'
    }}>
      <div style={{ textAlign: 'center' }}>
        <Atom size={44} color="#e8b84b" className="bd-spin-slow" style={{ margin: '0 auto 14px' }} />
        <p style={{ color: '#94a3b8', fontFamily: "'DM Sans',sans-serif", fontSize: 15 }}>
          Fetching batches…
        </p>
      </div>
    </div>
  )

  /* ── Error ── */
  if (error || batchData.length === 0) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#070d18'
    }}>
      <div style={{
        background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
        borderRadius: 16, padding: '28px 36px', textAlign: 'center', maxWidth: 380
      }}>
        <AlertCircle size={36} color="#f87171" style={{ margin: '0 auto 12px' }} />
        <p style={{ color: '#fca5a5', fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
          Unable to load batches
        </p>
        <p style={{ color: '#94a3b8', fontFamily: "'DM Sans',sans-serif", fontSize: 13 }}>
          Please check your connection and try again.
        </p>
      </div>
    </div>
  )

  /* ── Main ── */
  return (
    <div className="bd-root" style={{
      minHeight: '100vh', background: '#070d18',
      position: 'relative', overflow: 'hidden'
    }}>

      {/* Background orbs */}
      <div className="bd-bg-orb" style={{
        width: 520, height: 520, top: -120, left: -160,
        background: 'rgba(232,184,75,0.07)'
      }} />
      <div className="bd-bg-orb" style={{
        width: 400, height: 400, top: 80, right: -100,
        background: 'rgba(99,179,237,0.06)'
      }} />
      <div className="bd-bg-orb" style={{
        width: 350, height: 350, bottom: 0, left: '40%',
        background: 'rgba(139,92,246,0.05)'
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '60px 16px 80px' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 999,
            background: 'rgba(232,184,75,0.1)',
            border: '1px solid rgba(232,184,75,0.2)',
            marginBottom: 20
          }}>
            <Zap size={13} color="#e8b84b" />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#e8b84b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Rakesh Physics Institute
            </span>
          </div>

          <h1 className="bd-hero-title" style={{
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700,
            color: '#f1f5f9', lineHeight: 1.15, margin: '0 0 14px'
          }}>
            Upcoming &amp; Running{' '}
            <span style={{ color: '#e8b84b' }}>Batches</span>
          </h1>

          <p style={{ color: '#64748b', fontSize: 15, maxWidth: 460, margin: '0 auto' }}>
            Choose your batch and take the next step toward JEE &amp; NEET excellence
          </p>

          {/* Stats row */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32,
            flexWrap: 'wrap'
          }}>
            {[
              { icon: <Users size={15} color="#e8b84b" />, val: `${batchData.length}`, label: 'Active Batches' },
              { icon: <BookOpen size={15} color="#63b3ed" />, val: `${batchData.reduce((s, b) => s + (b.subjects?.length || 0), 0)}`, label: 'Subjects' },
              { icon: <GraduationCap size={15} color="#a78bfa" />, val: '500+', label: 'Students Enrolled' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 18px', borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                {s.icon}
                <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15 }}>{s.val}</span>
                <span style={{ color: '#64748b', fontSize: 12 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
          gap: 24, maxWidth: 1200, margin: '0 auto'
        }}>
          {batchData.map((data, idx) => (
            <div key={data._id} className="bd-card" style={{ padding: 26 }}>

              {/* Card top bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(232,184,75,0.12)',
                    border: '1px solid rgba(232,184,75,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <GraduationCap size={20} color="#e8b84b" />
                  </div>
                  <div>
                    <h2 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                      {data.BatchName}
                    </h2>
                    <p style={{ color: '#64748b', fontSize: 12, margin: '2px 0 0', fontWeight: 400 }}>
                      Batch #{String(idx + 1).padStart(2, '0')}
                    </p>
                  </div>
                </div>
                <span className="bd-badge-class">{data.className}</span>
              </div>

              <div className="bd-divider" />

              {/* Meta chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                <span className="bd-pill" style={{ background: 'rgba(99,179,237,0.1)', color: '#90cdf4', border: '1px solid rgba(99,179,237,0.18)' }}>
                  <Calendar size={11} />
                  {new Date(data.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="bd-pill" style={{ background: 'rgba(167,139,250,0.1)', color: '#c4b5fd', border: '1px solid rgba(167,139,250,0.18)' }}>
                  <Clock size={11} />
                  {data.timePeriods}
                </span>
              </div>

              {/* Description */}
              {data.description && (
                <p style={{
                  fontSize: 13, color: '#64748b', lineHeight: 1.65,
                  margin: '0 0 16px', display: '-webkit-box',
                  WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {data.description}
                </p>
              )}

              {/* Schedule */}
              {data.time?.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <p className="bd-section-label">
                    <Clock size={11} color="rgba(255,255,255,0.35)" />
                    Class Schedule
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {data.time.map((slot, i) => (
                      <span key={i} className="bd-schedule-chip">
                        <Clock size={11} style={{ marginRight: 4 }} />
                        <strong style={{ color: '#bfdbfe' }}>{slot.subject}</strong>
                        <span style={{ opacity: 0.5, margin: '0 3px' }}>·</span>
                        {slot.subTime}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Subjects */}
              {data.subjects?.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <p className="bd-section-label">
                    <BookOpen size={11} color="rgba(255,255,255,0.35)" />
                    Subjects &amp; Faculty
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {data.subjects.map((sub, i) => (
                      <div key={i} className="bd-subject-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Layers size={13} color="#e8b84b" />
                          <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 500 }}>
                            {sub.subjectName}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <User size={12} color="#94a3b8" />
                          <span style={{ color: '#94a3b8', fontSize: 12 }}>{sub.teacherName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bd-divider" />

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <span style={{ fontSize: 12, color: '#475569' }}>
                  Limited seats available
                </span>
                <button className="bd-enroll-btn">
                  Enroll Now
                  <ChevronRight size={15} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BatchUi