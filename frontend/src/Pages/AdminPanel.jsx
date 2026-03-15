import React from 'react';
import { Users, UserPlus, FileText, FolderPlus, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router'; // Assuming you use react-router

const AdminPanel = () => {
    const AdminData = [
        {
            id: 1,
            name: "All Users",
            route: '/admin/getAllUser',
            icon: <Users size={20} />
        },
        {
            id: 2,
            name: "Add Admin",
            route: "/admin/createAdmin",
            icon: <UserPlus size={20} />
        },
        {
            id: 3,
            name: "Test Section",
            route: "/admin/createTest",
            icon: <FileText size={20} />
        },
        {
            id: 4,
            name: "Create Batch",
            route: "/admin/createBatch",
            icon: <FolderPlus size={20} />
        }
    ];

    return (
        <div className="flex h-screen bg-base-200">
            {/* Sidebar Container */}
            <div className="w-64 bg-base-100 shadow-xl border-r border-base-300">
                <div className="p-6 flex items-center gap-3 border-b border-base-300">
                    <div className="p-2 bg-primary rounded-lg text-primary-content">
                        <LayoutDashboard size={24} />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Admin Console</h1>
                </div>

                <ul className="menu p-4 w-full gap-2">
                    <li className="menu-title text-xs uppercase opacity-50 font-bold mb-2">
                        Management
                    </li>
                    {AdminData.map((item) => (
                        <li key={item.id}>
                            <a 
                                href={item.route} 
                                className="flex items-center gap-4 py-3 hover:bg-primary hover:text-primary-content transition-all duration-200 rounded-lg group"
                            >
                                <span className="group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </span>
                                <span className="font-medium">{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Optional Profile Footer */}
                <div className="absolute bottom-0 w-64 p-4 border-t border-base-300">
                    <div className="flex items-center gap-3 p-2">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                <span>AD</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-bold">Admin User</p>
                            <p className="text-xs opacity-60">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 p-10 overflow-y-auto">
                <header className="mb-8">
                    <h2 className="text-3xl font-extrabold text-base-content">Dashboard Overview</h2>
                    <p className="text-base-content/70">Select a section from the sidebar to manage your application.</p>
                </header>
                
                {/* Content Cards Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {AdminData.map((item) => (
                        <div key={item.id} className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="text-primary mb-2">
                                    {item.icon}
                                </div>
                                <h2 className="card-title text-sm">{item.name}</h2>
                                <div className="card-actions mt-4">
                                    <button className="btn btn-sm btn-outline btn-primary">Open</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;