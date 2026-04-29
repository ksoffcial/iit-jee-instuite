import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router'
import axiosClient from '../utils/axisoClient';
import {
    Users,
    IndianRupee,
    UserX,
    Mail,
    Phone,
    Calendar,
    Clock,
    BookOpen,
    Search,
    IdCard,
    CreditCard
} from 'lucide-react';

const EnrollmentBatch = () => {
    
    const params = useParams();
    const [result, setResult] = useState({ totalStudent: 0, totalcollection: 0, data: [] });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get(`/enroll/courseById/${params.id}`);
            setResult(response.data);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = result.data?.filter(item =>
        item.userId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userId?.rollNo?.toString().includes(searchTerm)
    );

    return (
        <div className="p-6 bg-base-200 min-h-screen text-base-content">
            {/* Stats Header */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="stats shadow bg-base-100 flex-1">
                    <div className="stat">
                        <div className="stat-figure text-primary"><Users size={30} /></div>
                        <div className="stat-title font-semibold uppercase text-xs">Total Enrollment</div>
                        <div className="stat-value text-primary">{result.totalStudent}</div>
                    </div>
                </div>
                <div className="stats shadow bg-base-100 flex-1 border-l-4 border-success">
                    <div className="stat">
                        <div className="stat-figure text-success"><IndianRupee size={30} /></div>
                        <div className="stat-title font-semibold uppercase text-xs">Total Collection</div>
                        <div className="stat-value text-success">₹{result.totalcollection?.toLocaleString()}</div>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="card bg-base-100 shadow-xl">
                <div className="p-6 border-b border-base-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-bold">Student Management</h2>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                        <input
                            type="text"
                            placeholder="Search student or roll no..."
                            className="input input-bordered w-full pl-10 h-10"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-lg w-full">
                        {/* head */}
                        <thead className="bg-base-200 text-base-content/70">
                            <tr>
                                <th className="rounded-none">Student Details</th>
                                <th>Payment Status</th>

                                <th>Contact</th>
                                <th>Time and data</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></td></tr>
                            ) : filteredData?.map((item) => (
                                <tr key={item._id} className="hover:bg-base-200/50 transition-colors border-b border-base-200">
                                    {/* Student Info */}
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-12 h-12 flex text-center justify-center items-center">
                                                    <span className=" text-3xl font-bold uppercase">{item.userId?.fullName?.charAt(0)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-extrabold text-md uppercase tracking-tight">{item.userId?.fullName}</div>
                                                <div className="text-xs flex items-center gap-1 opacity-60 mt-1">
                                                    <IdCard size={12} /> Roll: <span className="font-mono">{item.userId?.rollNo || "N/A"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                   
                                    

                                    {/* Payment Info */}
                                    <td>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1 font-bold text-success">
                                                <CreditCard size={14} /> ₹{item.paymentAmount}
                                            </div>
                                            <span className={`badge badge-sm font-bold ${item.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                                                {item.paymentStatus}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Contact Info */}
                                    <td>
                                        <div className="flex flex-col gap-1 text-sm">
                                            <div className="flex items-center gap-2 opacity-80">
                                                <Mail size={14} className="text-info" /> {item.userId?.emailId}
                                            </div>
                                            <div className="flex items-center gap-2 opacity-80">
                                                <Phone size={14} className="text-warning" /> {item.userId?.phoneNumber}
                                            </div>
                                        </div>
                                    </td>

                                    {/* for date and time */}
                                    <td>
                                        <div className="flex flex-col gap-1 text-sm">
                                            <div className="flex items-center gap-2 opacity-80">
                                                <Calendar size={14} className="text-info" /> Date of admission
                                            </div>
                                            <div className="flex items-center gap-2 opacity-80">
                                                <Clock size={14} className="text-primary" /> {new Date(item.enrolledAt).toLocaleString('en-IN', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                            </div>
                                        </div>
                                    </td>



                                    {/* Actions */}
                                    <td className="text-center">
                                        <button className='btn btn-warning'>
                                            Block User
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer info */}
                {!loading && (
                    <div className="p-4 bg-base-300/30 text-center text-xs opacity-50 font-medium">
                        Showing {filteredData?.length} out of {result.totalStudent} total enrollments
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnrollmentBatch;