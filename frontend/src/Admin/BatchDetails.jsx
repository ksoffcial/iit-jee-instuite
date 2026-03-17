import React, { useEffect, useState } from 'react';
import axiosClient from '../utils/axisoClient';
import { Calendar, Clock, BookOpen, Trash2, Plus, Loader2, Layers } from 'lucide-react';
import { useNavigate } from 'react-router';

const BatchDetails = () => {
    const [batchData, setBatchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [batchError, setBatchError] = useState('');

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/batch/allBatch");
            setBatchData(response.data);
            setBatchError('');
        } catch (err) {
            setBatchError(err.message || "Failed to load batches");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleToDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this batch? This action cannot be undone.")) {
            try {
                await axiosClient.delete(`/batch/delete/${id}`);
                // Optimistic UI update: remove the batch from state immediately
                setBatchData(batchData.filter(batch => batch._id !== id));
            } catch (err) {
                alert("Error deleting batch: " + err.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-primary mb-4" size={40} />
                <p className="text-lg font-medium animate-pulse">Loading active batches...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Layers className="text-secondary" /> Academic Batches
                    </h1>
                    <p className="text-base-content/60">Manage enrollment dates and class schedules</p>
                </div>
                <button onClick={()=>navigate("/admin/createBatch")} className="btn btn-primary gap-2">
                    <Plus size={20} /> New Batch
                </button>
            </div>

            {batchError ? (
                <div className="alert alert-error shadow-lg">
                    <span>{batchError}</span>
                </div>
            ) : batchData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {batchData.map((data) => (
                        <div key={data._id} className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
                            {/* Card Header with Batch Name */}
                            <div className="bg-primary p-4 text-primary-content flex justify-between items-center">
                                <h2 className="card-title font-bold uppercase tracking-wide">
                                    {data.BatchName}
                                </h2>
                                <div className="badge badge-secondary font-mono">{data.className}</div>
                            </div>

                            <div className="card-body p-5">
                                <div className="space-y-4">
                                    {/* Start Date Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-base-200 rounded-lg">
                                            <Calendar size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase opacity-50 font-bold">Start Date</p>
                                            <p className="font-semibold">{data.startDate}</p>
                                        </div>
                                    </div>

                                    {/* Timing Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-base-200 rounded-lg">
                                            <Clock size={20} className="text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase opacity-50 font-bold">Time Period</p>
                                            <p className="font-semibold">{data.timePeriods}</p>
                                        </div>
                                    </div>

                                    {/* Class Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-base-200 rounded-lg">
                                            <BookOpen size={20} className="text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase opacity-50 font-bold">Subject/Course</p>
                                            <p className="font-semibold">{data.className}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-actions justify-end mt-6 pt-4 border-t border-base-200">
                                    <button 
                                        onClick={() => handleToDelete(data._id)} 
                                        className="btn btn-ghost btn-sm text-error gap-2 hover:bg-error/10"
                                    >
                                        <Trash2 size={16} />
                                        Delete Batch
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
                    <Layers size={64} className="opacity-10 mb-4" />
                    <p className="text-xl font-medium text-base-content/40 italic">No batches scheduled yet.</p>
                </div>
            )}
        </div>
    );
};

export default BatchDetails;