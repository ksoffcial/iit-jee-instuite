import React, { useEffect, useState } from 'react';
import axiosClient from '../utils/axisoClient';
import { 
  Trash2, 
  Search, 
  BookOpen, 
  Calendar, 
  Hash, 
  AlertCircle,
  Loader2 
} from 'lucide-react';

const DeleteTest = () => {
    const [testData, setTestData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/test/getAllTest");
            // Assuming the array is in response.data or response.data.tests
            setTestData(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        // Simple window confirmation for safety
        if (!window.confirm("Are you sure you want to delete this test? This action cannot be undone.")) return;

        try {
            setDeletingId(id);
            await axiosClient.delete(`/test/delete/${id}`);
            // Update local state to remove the deleted item
            setTestData(prev => prev.filter(test => test._id !== id));
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete the test. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2 text-base-content">
                            <Trash2 className="text-error" /> Manage & Delete Tests
                        </h1>
                        <p className="text-base-content/60">Review and remove examination papers from the system.</p>
                    </div>
                    
                    <div className="stats shadow bg-base-100 hidden md:flex">
                        <div className="stat py-2">
                            <div className="stat-title text-xs">Total Tests</div>
                            <div className="stat-value text-2xl">{testData.length}</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <Loader2 className="animate-spin text-primary w-12 h-12 mb-4" />
                        <p className="text-lg font-medium">Loading database...</p>
                    </div>
                ) : testData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testData.map((test) => (
                            <div key={test._id} className="card bg-base-100 shadow-xl border border-base-300 hover:border-error/30 transition-all group">
                                <div className="card-body">
                                    <div className="flex justify-between items-start">
                                        <div className="badge badge-outline badge-sm">{test.ClassName || "No Class"}</div>
                                        <div className="text-base-content/30 group-hover:text-error transition-colors">
                                            <Trash2 size={18} />
                                        </div>
                                    </div>

                                    <h2 className="card-title text-xl mt-2 font-bold group-hover:text-error transition-colors">
                                        {test.TestName}
                                    </h2>

                                    <div className="space-y-2 mt-4 text-sm text-base-content/70">
                                        <div className="flex items-center gap-2">
                                            <Hash size={14} /> 
                                            <span>{test.questions?.length || 0} Questions Total</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BookOpen size={14} /> 
                                            <span>Subject-wise Assessment</span>
                                        </div>
                                    </div>

                                    <div className="card-actions justify-end mt-6 pt-4 border-t border-base-200">
                                        <button 
                                            disabled={deletingId === test._id}
                                            onClick={() => handleDelete(test._id)}
                                            className="btn btn-error btn-outline btn-sm gap-2 w-full"
                                        >
                                            {deletingId === test._id ? (
                                                <span className="loading loading-spinner loading-xs"></span>
                                            ) : (
                                                <Trash2 size={14} />
                                            )}
                                            {deletingId === test._id ? 'Deleting...' : 'Delete Permanently'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="hero bg-base-100 rounded-2xl shadow-inner py-20 border-2 border-dashed border-base-300">
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <AlertCircle size={48} className="mx-auto text-base-content/20 mb-4" />
                                <h1 className="text-2xl font-bold opacity-50">No tests found</h1>
                                <p className="py-4 opacity-40">Your database is currently empty. Try creating a new test first.</p>
                                <button onClick={() => window.location.href='/test/create'} className="btn btn-primary btn-sm">Create First Test</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeleteTest;