import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axiosClient from '../utils/axisoClient'
import {
  BookOpen,
  CalendarDays,
  Clock,
  GraduationCap,
  Timer,
  ChevronRight,
  Layers,
  CreditCard,
  ArrowLeft,
  User
} from 'lucide-react'

const EnrollPage = () => {
  const { id } = useParams()
  const [batchData, setBatchData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(`/batch/getById/${id}`)
      setBatchData(response.data)
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handletoClick = async (id) => {
    try {
      console.log(id)
      const response = await axiosClient.post(`/enroll/enrollCourse/${id}`)
      alert("You Have Enrolled in this course ")
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="loading loading-ring loading-lg text-primary"></span>
          <p className="text-base-content/50 text-sm tracking-widest uppercase">Loading course details</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 font-sans">

      {/* Top Nav */}
      <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-base-content"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-xs tracking-widest uppercase text-base-content/40 font-medium">Course Enrollment</span>
          <div className="w-20" />
        </div>
      </div>

      {batchData && (
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">

          {/* Hero Card */}
          <div className="card bg-primary text-primary-content shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-focus/30 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-focus/20 rounded-full translate-y-1/2 -translate-x-1/4" />
            <div className="card-body relative z-10 p-8 md:p-12">
              <div className="badge badge-outline border-primary-content/40 text-primary-content/80 text-xs tracking-widest mb-4">
                {batchData.className}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                {batchData.BatchName}
              </h1>
              <p className="text-primary-content/70 text-base md:text-lg max-w-xl leading-relaxed">
                {batchData.description}
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm text-primary-content/80">
                  <CalendarDays size={16} />
                  <span>Starts {formatDate(batchData.startDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary-content/80">
                  <Timer size={16} />
                  <span>{batchData.timePeriod}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Subjects Card */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <BookOpen size={20} className="text-secondary" />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight">Subjects Covered</h2>
                </div>
                <ul className="space-y-3">
                  {batchData.subjects.map((subject, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between bg-base-200 rounded-xl px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Layers size={14} className="text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold leading-tight">{subject.subjectName}</p>
                          <p className="text-xs text-base-content/50 flex items-center gap-1 mt-0.5">
                            <User size={11} /> {subject.teacherName}
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-base-content/30" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Clock size={20} className="text-accent" />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight">Class Schedule</h2>
                </div>
                <ul className="space-y-3">
                  {batchData.time.map((slot, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between bg-base-200 rounded-xl px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                          <GraduationCap size={14} className="text-accent" />
                        </div>
                        <p className="text-sm font-semibold">{slot.subject}</p>
                      </div>
                      <span className="badge badge-outline text-xs font-mono">{slot.subTime}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Enroll CTA */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Ready to get started?</h3>
                <p className="text-base-content/50 text-sm">
                  Secure your spot in <span className="text-base-content font-medium">{batchData.BatchName}</span> today.
                </p>
              </div>
              <button
                onClick={() => handletoClick(batchData._id)}
                className="btn btn-primary btn-wide gap-3 text-base shadow-lg shadow-primary/30"
              >
                <CreditCard size={18} />
                Pay & Enroll Now
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default EnrollPage