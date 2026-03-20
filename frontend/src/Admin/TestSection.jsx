import React from 'react';
import { useNavigate } from 'react-router'; // Ensure correct import for web
import { 
  GraduationCap, 
  BookOpen, 
  UserPlus, 
  Atom, 
  Stethoscope, 
  PlusCircle,
  Trash2,
  Edit,
  BarChart
} from 'lucide-react';

const TestSection = () => {
    const navigate = useNavigate();

    const testData = [
        {
            id: 1,
            name: "Create Test",
            route: "/test/create",
            icon: <PlusCircle className="w-8 h-8 text-primary" />,
            desc: 'Create mock tests and assessments for Class 12 students.',
            buttonText: 'Create New'
        },
        {
            id: 2,
            name: "Update Test",
            route: "/test/update",
            icon: <Edit className="w-8 h-8 text-accent" />,
            desc: 'Modify existing question papers or update test parameters.',
            buttonText: 'Edit Test'
        },
        {
            id: 3,
            name: "Delete Test",
            route: "/test/delete",
            icon: <Trash2 className="w-8 h-8 text-error" />,
            desc: 'Remove outdated tests or archived practice papers from the database.',
            buttonText: 'Manage Deletion'
        },
        {
            id: 4,
            name: "JEE Main & Adv",
            route: "/test/jee",
            icon: <Atom className="w-8 h-8 text-info" />,
            desc: 'Physics, Chemistry, and Math focused engineering entrance tests.',
            buttonText: 'View Tests'
        },
        {
            id: 5,
            name: "NEET UG",
            route: "/test/neet",
            icon: <Stethoscope className="w-8 h-8 text-secondary" />,
            desc: 'Biology-centric medical entrance exams and practice sets.',
            buttonText: 'View Tests'
        },
        {
            id: 6,
            name: "Results & Analytics",
            route: "/test/result",
            icon: <BarChart className="w-8 h-8 text-success" />,
            desc: 'Check student performance and detailed score analytics.',
            buttonText: 'View Results'
        }
    ];

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
                    Test Management Portal
                </h2>
                <p className="text-base-content/70 max-w-2xl mx-auto">
                    Manage the full lifecycle of student assessments, from creation and categorization to deletion and result tracking.
                </p>
            </div>

            {/* Grid Container */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testData.map((data) => (
                    <div 
                        key={data.id} 
                        className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 group"
                    >
                        <div className="card-body items-center text-center">
                            {/* Icon Wrapper */}
                            <div className="p-4 rounded-full bg-base-200 group-hover:bg-opacity-80 transition-colors mb-2">
                                {data.icon}
                            </div>
                            
                            <h2 className="card-title text-xl font-bold capitalize">{data.name}</h2>
                            <p className="text-sm text-base-content/60 min-h-[3rem]">
                                {data.desc}
                            </p>

                            <div className="card-actions justify-end mt-4 w-full">
                                <button 
                                    onClick={() => navigate(data.route)} 
                                    className="btn btn-primary btn-block gap-2 group-hover:scale-[1.02] transition-transform"
                                >
                                    {/* Using data.icon here or a generic arrow if preferred */}
                                    {data.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestSection;