import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Calendar, 
  Clock, 
  GraduationCap, 
  ChevronRight, 
  Layout, 
  Search 
} from 'lucide-react';
import axiosClient from '../utils/axisoClient';

const TestResult = () => {
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axiosClient.get("/test/getAllTest");
      setTestData(response.data.test);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/50 p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-base-content">Test Results</h1>
          <p className="text-base-content/60 mt-1">Monitor and analyze student performance across all modules.</p>
        </div>
        <div className="flex gap-2">
          <div className="form-control">
            <div className="input-group">
              <label className="input input-bordered flex items-center gap-2 bg-base-100">
                <Search size={18} className="opacity-50" />
                <input type="text" className="grow" placeholder="Search tests..." />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview (Optional extra touch) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Layout size={32} />
            </div>
            <div className="stat-title">Total Tests</div>
            <div className="stat-value text-primary">{testData.length}</div>
            <div className="stat-desc">Across all classes</div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testData?.map((data) => (
          <div 
            key={data._id} 
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 group"
          >
            <div className="card-body p-6">
              {/* Top Row: Class & Schedule Type */}
              <div className="flex justify-between items-start mb-4">
                <div className="badge badge-outline badge-primary font-semibold py-3 px-4">
                  {data.ClassName}
                </div>
                <div className={`badge badge-ghost capitalize ${data.scheduleType === 'instant' ? 'text-success' : 'text-info'}`}>
                  {data.scheduleType}
                </div>
              </div>

              {/* Test Name */}
              <h2 className="card-title text-xl mb-4 group-hover:text-primary transition-colors">
                {data.TestName}
              </h2>

              {/* Details List */}
              <div className="space-y-3 text-sm text-base-content/70">
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-primary" />
                  <span>Created: {new Date(data.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-primary" />
                  <span>{new Date (data.startTime).toLocaleTimeString()} — {new Date (data.endTime).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap size={16} className="text-primary" />
                  <span>Duration: {data.durationMinutes} Minutes</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="card-actions mt-6">
                <button 
                  onClick={() => navigate(`/admin/result/${data._id}`)}
                  className="btn btn-primary btn-block group-hover:translate-y-[-2px] transition-transform"
                >
                  View Full Results
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {testData.length === 0 && (
        <div className="hero h-96 bg-base-100 rounded-box shadow-inner">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold opacity-20 text-base-content">No Test Results Found</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestResult;