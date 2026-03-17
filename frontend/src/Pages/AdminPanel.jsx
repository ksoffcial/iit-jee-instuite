import React from 'react';
import { useNavigate } from 'react-router';
import { Users, UserPlus, FileText, FolderPlus, ArrowRight } from 'lucide-react';

const AdminPanel = () => {
    const navigate = useNavigate();

    const adminData = [
        {
            id: 1,
            name: "All Users",
            route: '/admin/getAllUser',
            icon: <Users className="text-primary" size={24} />,
            desc: "View, manage, and delete existing user accounts."
        },
        {
            id: 2,
            name: "Add Admin",
            route: "/admin/createAdmin",
            icon: <UserPlus className="text-secondary" size={24} />,
            desc: "Grant administrative privileges to new team members."
        },
        {
            id: 3,
            name: "Test Section",
            route: "/admin/createTest",
            icon: <FileText className="text-accent" size={24} />,
            desc: "Create and manage examination modules for students."
        },
        {
            id: 4,
            name: "Create Batch",
            route: "/admin/createBatch",
            icon: <FolderPlus className="text-info" size={24} />,
            desc: "Organize students into specific academic batches."
        },
        {
            id: 4,
            name: " Batch Details",
            route: "/admin/batchDetails",
            icon: <FolderPlus className="text-info" size={24} />,
            desc: "Organize students into specific academic batches."
        }
    ];

    return (
        <div className="min-h-screen bg-base-200 p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-base-content">Admin Dashboard</h1>
                <p className="text-base-content/60 mt-2">Manage your institute's users, tests, and batches</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {adminData.map((data) => (
                    <div
                        key={data.id}
                        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 group"
                    >
                        <div className="card-body items-center text-center">
                            {/* Icon Wrapper */}
                            <div className="p-4 bg-base-200 rounded-full mb-2 group-hover:scale-110 transition-transform">
                                {data.icon}
                            </div>

                            <h2 className="card-title text-xl font-bold">{data.name}</h2>
                            <p className="text-sm text-base-content/70">{data.desc}</p>

                            <div className="card-actions mt-4 w-full">
                                <button
                                    onClick={() => navigate(data.route)}
                                    className="btn btn-primary btn-block gap-2"
                                >
                                    Access Section
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;