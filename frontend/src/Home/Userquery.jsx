import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axiosClient from '../utils/axisoClient';
import {
    User, Phone, MapPin, BookOpen,
    Layers, Activity, MessageSquare, Send, AlertCircle
} from 'lucide-react'
import { useNavigate } from 'react-router';

// ─── Validation Schema ───────────────────────────────────────────────────────

const querySchema = z.object({
    studenName: z.string().min(3, "Name must be at least 3 characters"),
    standard: z.string().min(1, "Please select a standard"),
    contactNumber: z.string()
        .min(10, "Must be at least 10 digits")
        .max(15, "Too long")
        .regex(/^\d+$/, "Only digits allowed"),
    location: z.string().min(2, "Location must be at least 2 characters"),
    batchDetails: z.string().min(1, "Please select a batch"),
    batchStatus: z.string().min(1, "Please select batch status"),
    
})

// ─── Reusable Field Wrapper ───────────────────────────────────────────────────

const Field = ({ label, icon: Icon, error, children }) => (
    <div className="flex flex-col gap-1">

        {/* Label */}
        <label className="flex items-center gap-1.5 text-sm font-semibold text-black">
            <Icon size={14} className="text-blue-600" />
            {label}
        </label>

        {/* Input / Select / Textarea goes here */}
        {children}

        {/* Error message */}
        {error && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
                <AlertCircle size={12} />
                {error.message}
            </p>
        )}

    </div>
)

// ─── Shared Class Strings ─────────────────────────────────────────────────────

const inputStyle = (hasError) => `
  w-full px-3 py-2.5 rounded-lg border text-sm text-black bg-white
  outline-none transition
  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  ${hasError ? 'border-red-400' : 'border-gray-300'}
`

const selectStyle = (hasError) => `
  w-full px-3 py-2.5 rounded-lg border text-sm text-black bg-white
  outline-none transition
  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  ${hasError ? 'border-red-400' : 'border-gray-300'}
`

// ─── Main Component ───────────────────────────────────────────────────────────

const Userquery = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(querySchema) })

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axiosClient.post("/query/create", data)
            // console.log(response.data)
            reset();
            alert("query generated sucessfully")
            navigate("/")

        } catch (err) { 
            console.error("Submission failed:", err.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl">

                {/* ── Header ── */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 mb-4">
                        <MessageSquare size={26} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">
                        Resolve Your Query
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        Fill out the form — our counselor will contact you shortly.
                    </p>
                </div>

                {/* ── Form Card ── */}
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">

                    {/* Row 1 — Name & Standard */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <Field label="Your Name" icon={User} error={errors.studenName}>
                            <input
                                type="text"
                                placeholder="e.g. Swati Sharma"
                                className={inputStyle(errors.studenName)}
                                {...register("studenName")}
                            />
                        </Field>

                        <Field label="Standard" icon={BookOpen} error={errors.standard}>
                            <select className={selectStyle(errors.standard)} {...register("standard")}>
                                <option value="">Select standard</option>
                                {["9th", "10th", "11th", "12th"].map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </Field>

                    </div>

                    {/* Row 2 — Contact & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <Field label="Contact Number" icon={Phone} error={errors.contactNumber}>
                            <input
                                type="text"
                                placeholder="e.g. 9876543210"
                                className={inputStyle(errors.contactNumber)}
                                {...register("contactNumber")}
                            />
                        </Field>

                        <Field label="Location" icon={MapPin} error={errors.location}>
                            <input
                                type="text"
                                placeholder="e.g. Purnia"
                                className={inputStyle(errors.location)}
                                {...register("location")}
                            />
                        </Field>

                    </div>

                    {/* Row 3 — Batch Details & Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <Field label="Batch Details" icon={Layers} error={errors.batchDetails}>
                            <select className={selectStyle(errors.batchDetails)} {...register("batchDetails")}>
                                <option value="">Select batch</option>
                                {["9th", "10th", "11th", "12th", "JEE", "NEET", "Dropper"].map(b => (
                                    <option key={b} value={b.toLowerCase()}>{b}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Batch Status" icon={Activity} error={errors.batchStatus}>
                            <select className={selectStyle(errors.batchStatus)} {...register("batchStatus")}>
                                <option value="">Select status</option>
                                <option value="running">Running</option>
                                <option value="upcoming">Upcoming</option>
                            </select>
                        </Field>

                    </div>

                    {/* Description */}
                    <Field label="Describe Your Query" icon={MessageSquare} error={errors.desc}>
                        <textarea
                            rows={4}
                            placeholder="Write your query in detail..."
                            className={`${inputStyle(errors.desc)} resize-none`}
                            {...register("desc")}
                        />
                    </Field>

                    {/* Divider */}
                    <hr className="border-gray-200" />

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                       bg-blue-600 hover:bg-blue-700 active:scale-95
                       text-white font-semibold text-sm transition-all
                       disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send size={16} />
                                Submit Query
                            </>
                        )}
                    </button>

                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-gray-500 mt-4">
                    We typically respond within 24 hours on working days.
                </p>

            </div>
        </div>
    )
}

export default Userquery