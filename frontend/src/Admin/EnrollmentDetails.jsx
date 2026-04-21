import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Users, Clock, BookOpen, ChevronRight, Loader2 } from 'lucide-react';
import axiosClient from '../utils/axisoClient';

const EnrollmentDetails = () => {
    const [batchData, setBatchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/batch/allBatch");
            setBatchData(response.data);
        } catch (err) {
            console.error("Error fetching batches:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-base-200 p-6">
            {/* Header Section */}
            <div className='flex justify-between mx-10'>
                <div className="max-w-6xl mb-8">
                    <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
                        <Users className="w-8 h-8" />
                        Enrollment Management
                    </h1>
                    <p className="text-base-content/70 mt-2">
                        View and manage all active batch enrollments and schedules.
                    </p>
                </div>

                <div>
                    <button onClick={()=>navigate('/admin/totalenrollment')} className='btn btn-primary'> Total Enrollment</button>
                </div>
            </div>



            <div className="max-w-6xl mx-auto">
                {loading ? (
                    /* Loading State using DaisyUI Spinner */
                    <div className="flex flex-col items-center justify-center h-64 space-y-4">
                        <Loader2 className="w-12 h-12 animate-spin text-primary" />
                        <span className="text-lg font-medium">Loading batch records...</span>
                    </div>
                ) : batchData.length > 0 ? (
                    /* Data Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {batchData.map((data) => (
                            <div key={data._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-base-300">
                                <div className="card-body">
                                    <div className="flex justify-between items-start">
                                        <h2 className="card-title text-xl text-secondary">{data.BatchName}</h2>
                                        <div className="badge badge-outline">Active</div>
                                    </div>

                                    <div className="space-y-3 mt-4">
                                        <div className="flex items-center gap-3 text-sm">
                                            <BookOpen className="w-4 h-4 text-primary" />
                                            <span className="font-medium">Class:</span> {data.className}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <span className="font-medium">Duration:</span> {data.timePeriods}
                                        </div>
                                    </div>

                                    <div className="card-actions justify-end mt-6">
                                        <button
                                            onClick={() => navigate(`/enrollment/details/${data._id}`)}
                                            className="btn btn-primary btn-sm md:btn-md gap-2"
                                        >
                                            View Details
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="alert alert-warning shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>No enrollment data found in the system.</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnrollmentDetails;