import React from 'react';
import { useNavigate } from 'react-router';
import { UserPlus, UserMinus, GraduationCap } from 'lucide-react';

const Mentordetails = () => {
  const navigate = useNavigate();

  const MentorSection = [
    {
      id: 1,
      name: "Add Teacher",
      route: "/mentor/addmentor",
      desc: 'This section is used to add new teacher details into the system.',
      icon: <UserPlus className="w-6 h-6" />
    },
    {
      id: 2,
      name: 'Delete Teacher',
      route: "/mentor/deletementor",
      desc: 'This section is used to remove teacher records permanently.',
      icon: <UserMinus className="w-6 h-6" />
    }
  ];

  return (
    <div className="p-8 min-h-screen bg-base-200">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <GraduationCap className="w-10 h-10 text-primary" />
        <h1 className="text-3xl font-bold text-base-content">Mentor Management</h1>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MentorSection.map((data) => (
          <div 
            key={data.id} 
            className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300"
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                  {data.icon}
                </div>
                <h2 className="card-title text-xl">{data.name}</h2>
              </div>
              
              <p className="text-base-content/70 mt-2">
                {data.desc}
              </p>

              <div className="card-actions justify-end mt-4">
                <button 
                  onClick={() => navigate(data.route)}
                  className="btn btn-primary btn-md gap-2"
                >
                  Go to Section
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentordetails;