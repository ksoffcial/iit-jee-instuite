import React, { useState, useEffect } from 'react'
import axiosClient from '../utils/axisoClient';
import {
  Inbox, User, BookOpen, Phone,
  MapPin, Layers, FileText, Trash2,
  CheckCircle, AlertTriangle, Loader2
} from 'lucide-react'

// ─── Single Query Card ────────────────────────────────────────────────────────

const QueryCard = ({ data, onDelete }) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">

    {/* Card Header — Name + Delete Button */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <User size={18} className="text-blue-600" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-base">{data.studenName}</p>
          <p className="text-xs text-gray-400">Student Query</p>
        </div>
      </div>

      <button
        onClick={() => onDelete(data._id)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                   text-red-500 border border-red-200 bg-red-50
                   hover:bg-red-100 text-xs font-semibold transition"
      >
        <Trash2 size={13} />
        Delete
      </button>
    </div>

    {/* Divider */}
    <hr className="border-gray-100" />

    {/* Info Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

      <InfoRow icon={BookOpen} label="Standard" value={data.standard} />
      <InfoRow icon={Phone} label="Contact" value={data.contactNumber} />
      <InfoRow icon={MapPin} label="Location" value={data.location} />
      <InfoRow icon={Layers} label="Batch" value={data.batchDetails} />

    </div>

    {/* Description */}
    <div className="flex gap-2 bg-gray-50 rounded-xl p-3">
      <FileText size={15} className="text-blue-500 mt-0.5 shrink-0" />
      <p className="text-sm text-gray-600 leading-relaxed">{data.desc}</p>
    </div>

    {/* Batch Status Badge */}
    <div className="flex items-center gap-2">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold
        ${data.batchStatus === 'running'
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'
        }`}
      >
        {data.batchStatus === 'running' ? '● Running' : '◌ Upcoming'}
      </span>
    </div>

  </div>
)

// ─── Info Row (icon + label + value) ─────────────────────────────────────────

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2">
    <Icon size={14} className="text-blue-500 shrink-0" />
    <span className="text-xs text-gray-400 w-16 shrink-0">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value}</span>
  </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────

const Query = () => {
  const [queryData, setQueryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all queries on mount
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axiosClient.get("/query/getAll")
      setQueryData(response?.data)
    } catch (err) {
      setError("Failed to load queries. Please try again.")
      console.error("Fetch error:", err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Delete a query by id
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this query?")  // fixed: conform → confirm
    if (!confirmed) return

    try {
      await axiosClient.delete(`/query/delete/${id}`)
      setQueryData(prev => prev.filter(item => item._id !== id))  // remove from UI instantly
    } catch (err) {
      console.error("Delete failed:", err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* ── Page Header ── */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 mb-4">
            <Inbox size={26} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">All Raised Queries</h1>
          <p className="text-gray-400 text-sm mt-2">
            Manage and resolve student queries from here.
          </p>

          {/* Query count badge */}
          {!loading && !error && (
            <span className="inline-block mt-3 px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold">
              {queryData.length} {queryData.length === 1 ? 'Query' : 'Queries'} Found
            </span>
          )}
        </div>

        {/* ── Loading State ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 size={32} className="text-blue-500 animate-spin" />
            <p className="text-gray-400 text-sm">Loading queries...</p>
          </div>
        )}

        {/* ── Error State ── */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <AlertTriangle size={36} className="text-red-400" />
            <p className="text-red-400 font-semibold">{error}</p>
            <button
              onClick={fetchData}
              className="mt-2 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && !error && queryData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <CheckCircle size={36} className="text-green-400" />
            <p className="text-gray-400 font-semibold">No queries found.</p>
            <p className="text-gray-600 text-sm">All queries have been resolved!</p>
          </div>
        )}

        {/* ── Query Cards Grid ── */}
        {!loading && !error && queryData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {queryData.map((data) => (
              <QueryCard key={data._id} data={data} onDelete={handleDelete} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Query