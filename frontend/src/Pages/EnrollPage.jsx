import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axiosClient from '../utils/axisoClient'
import {
  BookOpen, CalendarDays, Clock, GraduationCap,
  Timer, ChevronRight, Layers, CreditCard, ArrowLeft, User
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

  useEffect(() => { fetchData() }, [])

  const handletoClick = async (id) => {
    try {
      await axiosClient.post(`/enroll/enrollCourse/${id}`)
      alert('You have enrolled in this course')
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4fa] flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="loading loading-ring loading-lg text-blue-600"></span>
          <p className="text-xs tracking-widest uppercase text-gray-400">Loading course details</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f4fa] font-sans text-black">

      {/* ── Top Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#d1d9e8]">
        <div className="max-w-4xl mx-auto px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[13px] text-gray-500 border border-[#d1d9e8]
                       px-3.5 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <span className="text-[11px] tracking-[0.12em] uppercase text-gray-400 font-medium">
            Course Enrollment
          </span>
          <div className="w-20" />
        </div>
      </nav>

      {batchData && (
        <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-5">

          {/* ── Hero ── */}
          <div className="relative overflow-hidden bg-blue-700 text-white rounded-[20px] px-10 py-11">
            {/* decorative circles */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/[0.07] rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/[0.05] rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10">
              <span className="inline-flex items-center bg-white/15 border border-white/25 text-white/80
                               text-[11px] tracking-[0.1em] uppercase px-3 py-1 rounded-full mb-4">
                {batchData.className}
              </span>
              <h1 className="text-[38px] font-extrabold leading-[1.1] tracking-tight mb-3">
                {batchData.BatchName}
              </h1>
              <p className="text-white/70 text-[15px] leading-relaxed max-w-lg mb-6">
                {batchData.description}
              </p>
              <div className="flex gap-6 flex-wrap">
                <span className="flex items-center gap-2 text-[13px] text-white/75">
                  <CalendarDays size={15} /> Starts {formatDate(batchData.startDate)}
                </span>
                <span className="flex items-center gap-2 text-[13px] text-white/75">
                  <Timer size={15} /> {batchData.timePeriod}
                </span>
              </div>
            </div>
          </div>

          {/* ── Two-column cards ── */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* Subjects */}
            <div className="bg-white rounded-2xl border border-[#dde3ef] p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-[10px] bg-blue-50 flex items-center justify-center">
                  <BookOpen size={18} className="text-blue-700" />
                </div>
                <h2 className="text-[15px] font-bold tracking-tight">Subjects Covered</h2>
              </div>
              <ul className="space-y-2.5">
                {batchData.subjects.map((subject, idx) => (
                  <li key={idx}
                    className="flex items-center justify-between bg-[#f7f9fc] border border-[#e8edf5]
                               rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-[7px] bg-blue-50 flex items-center justify-center">
                        <Layers size={13} className="text-blue-700" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold leading-tight">{subject.subjectName}</p>
                        <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <User size={10} /> {subject.teacherName}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={13} className="text-gray-300" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl border border-[#dde3ef] p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-[10px] bg-gray-100 flex items-center justify-center">
                  <Clock size={18} className="text-black" />
                </div>
                <h2 className="text-[15px] font-bold tracking-tight">Class Schedule</h2>
              </div>
              <ul className="space-y-2.5">
                {batchData.time.map((slot, idx) => (
                  <li key={idx}
                    className="flex items-center justify-between bg-[#f7f9fc] border border-[#e8edf5]
                               rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-[7px] bg-gray-100 flex items-center justify-center">
                        <GraduationCap size={13} className="text-black" />
                      </div>
                      <span className="text-[13px] font-semibold">{slot.subject}</span>
                    </div>
                    <span className="bg-black text-white text-[11px] font-medium tracking-wide
                                     px-3 py-1 rounded-full">
                      {slot.subTime}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Pricing ── */}
          <div className="bg-white rounded-2xl border border-[#dde3ef] p-6">
            <h2 className="flex items-center gap-2 text-[15px] font-bold mb-5">
              <CreditCard size={17} className="text-blue-700" /> Price Details
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#f7f9fc] border border-[#e8edf5] rounded-xl p-4 text-center">
                <p className="text-[11px] uppercase tracking-[0.08em] text-gray-400 mb-2">Actual Price</p>
                <p className="text-[22px] font-extrabold">₹{batchData.totalAmount}</p>
              </div>
              <div className="bg-[#f7f9fc] border border-[#e8edf5] rounded-xl p-4 text-center">
                <p className="text-[11px] uppercase tracking-[0.08em] text-gray-400 mb-2">Discount</p>
                <p className="text-[22px] font-extrabold text-blue-700">₹{batchData.totalDiscount}</p>
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[12px]
                                 font-medium px-2.5 py-0.5 rounded-full mt-1.5">
                  ✓ Savings
                </span>
              </div>
              <div className="bg-black rounded-xl p-4 text-center text-white">
                <p className="text-[11px] uppercase tracking-[0.08em] text-white/50 mb-2">Final Price</p>
                <p className="text-[22px] font-extrabold">₹{batchData.finalPrice}</p>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="bg-white rounded-2xl border border-[#dde3ef] px-8 py-6
                          flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <h3 className="text-[18px] font-extrabold mb-1">Ready to get started?</h3>
              <p className="text-[13px] text-gray-400">
                Secure your spot in{' '}
                <span className="text-blue-700 font-semibold">{batchData.BatchName}</span> today.
              </p>
            </div>
            <button
              onClick={() => handletoClick(batchData._id)}
              className="flex items-center gap-2.5 bg-blue-700 text-white px-7 py-3.5 rounded-xl
                         text-[15px] font-bold whitespace-nowrap
                         hover:bg-blue-800 hover:-translate-y-0.5
                         hover:shadow-[0_8px_24px_rgba(26,86,219,0.28)]
                         transition-all duration-200"
            >
              <CreditCard size={17} />
              Pay &amp; Enroll Now
            </button>
          </div>

        </div>
      )}
    </div>
  )
}

export default EnrollPage