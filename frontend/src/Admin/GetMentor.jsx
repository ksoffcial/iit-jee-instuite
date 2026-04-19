import React, { useEffect, useState } from 'react';
import axiosClient from '../utils/axisoClient'; // Double check this filename typo (axiso vs axios)
import { Trash2, GraduationCap, Award, BookOpen, User, AlertCircle } from 'lucide-react';

const GetMentor = () => {
  const [mentorData, setMentorData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch mentors on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/mentor/getMentor");
        // Ensure we are setting an array even if backend returns null/undefined
        setMentorData(response.data || []);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;

    // Corrected logic: only proceed if user clicks "OK"
    const confirmDelete = window.confirm("Are you sure you want to delete this mentor?");
    
    if (confirmDelete) {
      try {
        await axiosClient.delete(`/mentor/deleteMentor/${id}`);
        
        // Optimistic UI update: filter out the deleted mentor from state
        setMentorData((prev) => prev.filter((mentor) => mentor._id !== id));
      } catch (error) {
        console.error("Error deleting mentor:", error);
        alert("Failed to delete the mentor. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-sm animate-pulse">Loading Mentors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-3 text-base-content">
          <User className="text-primary" size={36} /> 
          Our Mentors
        </h1>
        <p className="text-base-content/60 mt-2">Manage your institute's teaching faculty</p>
      </header>

      {mentorData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mentorData.map((data) => (
            <div 
              key={data._id} 
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 group"
            >
              <div className="card-body p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="card-title text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                    {data.mentorName}
                  </h2>
                  <div className="badge badge-accent badge-outline font-bold p-3">
                    {data.rating} ⭐
                  </div>
                </div>

                <div className="space-y-3 text-base-content/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-base-200 rounded-lg">
                      <BookOpen size={18} className="text-primary" />
                    </div>
                    <p><span className="font-bold">Subject:</span> {data.subject}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-base-200 rounded-lg">
                      <Award size={18} className="text-primary" />
                    </div>
                    <p><span className="font-bold">Experience:</span> {data.experince}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-base-200 rounded-lg">
                      <Award size={18} className="text-primary" />
                    </div>
                    <p><span className="font-bold">contact Number:</span> {data.contactNumber}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-base-200 rounded-lg">
                      <GraduationCap size={18} className="text-primary" />
                    </div>
                    <p><span className="font-bold">Degree:</span> {data.degree}</p>
                  </div>
                </div>

                <div className="card-actions justify-end mt-8 pt-4 border-t border-base-200">
                  <button 
                    onClick={() => handleDelete(data._id)}
                    className="btn btn-error btn-sm btn-ghost hover:btn-error gap-2 normal-case"
                  >
                    <Trash2 size={16} />
                    Remove Mentor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <div className="alert alert-warning shadow-lg max-w-md flex items-center gap-4">
            <AlertCircle className="shrink-0" />
            <span>No mentor records found. Start by adding a new mentor!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetMentor;