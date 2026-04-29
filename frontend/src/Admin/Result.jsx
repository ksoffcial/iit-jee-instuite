import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    User,
    Mail,
    Phone,
    Trophy,
    Clock,
    ArrowLeft,
    Download,
    CheckCircle2,
    Timer
} from 'lucide-react';
import axiosClient from '../utils/axisoClient';

const Result = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userResult, setUserResult] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axiosClient.get(`/test/testwise/${id}`);
            setUserResult(response.data.result);
        } catch (error) {
            console.error("Error fetching results:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-base-200">
                <span className="loading loading-dots loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200/50 p-4 md:p-8">
            {/* Navigation & Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-ghost gap-2 mb-4 hover:bg-base-300"
                >
                    <ArrowLeft size={18} /> Back to Tests
                </button>

                <div className="flex flex-col md:flex-row md:items-center justify-between bg-base-100 p-6 rounded-2xl shadow-sm border border-base-300">
                    <div>
                        <h1 className="text-2xl font-bold text-base-content flex items-center gap-2">
                            <CheckCircle2 className="text-success" />
                            Student Performance Report
                        </h1>
                        <p className="text-base-content/60">Test ID: <span className="badge badge-ghost font-mono">{id}</span></p>
                    </div>
                    <button className="btn btn-primary mt-4 md:mt-0 gap-2">
                        <Download size={18} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Main Content: Results Table */}
            <div className="max-w-7xl mx-auto">
                <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/* Head */}
                            <thead className="bg-base-200/50">
                                <tr>
                                    <th className="py-4">Student Details</th>
                                    <th>Contact Info</th>
                                    <th className="text-center">Score</th>
                                    <th>Attempt Timeline</th>
                                    <th className="text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userResult.length > 0 ? (
                                    userResult.map((data) => (
                                        <tr key={data._id} className="hover">
                                            {/* Name & Avatar */}
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar placeholder">
                                                        <div className="bg-neutral text-neutral-content rounded-full w-10 flex items-center justify-center">
                                                            <span className='uppercase  text-2xl font-bold'>{data.userId.fullName.charAt(0)}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{data.userId.fullName}</div>
                                                        <div className="text-xs opacity-50 uppercase font-semibold">Student</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email & Phone */}
                                            <td>
                                                <div className="flex flex-col gap-1 text-sm">
                                                    <span className="flex items-center gap-1.5"><Mail size={14} className="text-primary" /> {data.userId.emailId}</span>
                                                    <span className="flex items-center gap-1.5 text-base-content/60"><Phone size={14} /> {data.userId.phoneNumber}</span>
                                                </div>
                                            </td>

                                            {/* Marks */}
                                            <td className="text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center gap-1 font-black text-lg text-primary">
                                                        <Trophy size={16} />
                                                        {data.obtainedMarks}
                                                    </div>
                                                    <div className="text-xs opacity-50">out of {data.totalMarks}</div>
                                                </div>
                                            </td>

                                            {/* Timeline */}
                                            <td>
                                                <div className="flex flex-col gap-1 text-xs font-medium">
                                                    <div className="flex items-center gap-1.5 text-success">
                                                        <Timer size={14} /> Start: {new Date(data.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-error">
                                                        <Clock size={14} /> End: {new Date(data.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="text-center">
                                                <span className={`badge ${data.obtainedMarks >= data.totalMarks * 0.4 ? 'badge-success' : 'badge-warning'} badge-sm`}>
                                                    {data.obtainedMarks >= data.totalMarks * 0.4 ? 'Passed' : 'Review'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-20 text-base-content/40 italic">
                                            No results found for this test session.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;