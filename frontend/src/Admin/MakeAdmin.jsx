import React, { useEffect, useState } from 'react';
import axiosClient from '../utils/axisoClient';
import { User, Mail, Phone, Shield, Trash2, Loader2, AlertCircle } from 'lucide-react';

const MakeAdmin = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/admin/getAllUser");
            console.log(response.data.data)
            setUserData(response.data.data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                // Fixed the URL: removed the ":" which is usually only for backend route definitions
                await axiosClient.delete(`/admin/deleteUser/${id}`);
                // Update UI locally after successful deletion
                setUserData(userData.filter(user => user._id !== id));
            } catch (err) {
                alert("Failed to delete user: " + err.message);
            }
        }
    };

    const markToAdmin = async (id) => {
        if (window.confirm("Are you sure want to create an Admin")) {
            try {
                const response = await axiosClient.post(`/admin/makeAdmin/${id}`);
                console.log(response.data)
                alert("Converted into admin ");
            }
            catch (err) {
                alert("Failed to delete user: " + err.message);
            }
        }
    }

    if (loading) {
        return (
            <div className="flex h-64 flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-primary" size={48} />
                <p className="text-lg font-medium">Fetching users...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <User className="text-primary" /> User Management
                    </h1>
                    <p className="text-base-content/60">Manage all registered accounts and roles</p>
                </div>
                <div className="badge badge-primary badge-outline p-4 font-semibold">
                    Total Users: {userData.length}
                </div>
            </div>

            {error ? (
                <div className="alert alert-error shadow-lg max-w-2xl mx-auto">
                    <AlertCircle />
                    <span>{error}</span>
                    <button onClick={fetchData} className="btn btn-sm btn-ghost">Retry</button>
                </div>
            ) : userData.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-base-300 shadow-sm">
                    <table className="table table-zebra w-full">
                        {/* Table Head */}
                        <thead className="bg-base-200">
                            <tr>
                                <th>Name</th>
                                <th>Contact Info</th>
                                <th>Role</th>
                                <th className="text-center">Edit</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user) => (
                                <tr key={user._id} className="hover">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral flex justify-center items-center text-neutral-content rounded-full w-10">
                                                    <span className='uppercase text-2xl'>{user.fullName.charAt(0)}</span>
                                                </div>
                                            </div>
                                            <div className="font-bold">{user.fullName}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-sm opacity-70">
                                                <Mail size={14} /> {user.emailId}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm opacity-70">
                                                <Phone size={14} /> {user.phoneNumber}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="badge badge-ghost gap-2">
                                            <Shield size={14} /> {user.role}
                                        </div>
                                    </td>
                                    <th className="text-center">
                                        <button
                                            onClick={() => markToAdmin(user._id)}
                                            className="btn  btn-sm btn-outline gap-2"
                                        >
                                            Mark Admin
                                        </button>
                                    </th>
                                    <th className="text-center">
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn btn-error btn-sm btn-outline gap-2"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">📭</div>
                    <h2 className="text-2xl font-semibold italic text-base-content/40">No users found.</h2>
                </div>
            )}
        </div>
    );
};

export default MakeAdmin;