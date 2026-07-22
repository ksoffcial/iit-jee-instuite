import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Clock, Calendar, PlayCircle, BookOpen, Layers } from 'lucide-react';
import axiosClient from '../utils/axisoClient';

const ExamSub = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/test/getExam/${id}`);
      console.log(response.data.data);
      setTestData(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch exam data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]); // Included 'id' dependency to follow React hooks best practices

  // Date Formatter Helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="border-b border-blue-900/40 pb-6">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <BookOpen className="w-6 h-6" />
            <span className="text-sm font-semibold tracking-wider uppercase">
              Batch Code: <span className="text-blue-200">{id}</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Available Examinations
          </h1>
          <p className="text-slate-400 mt-2">
            Select an exam below to begin your test session.
          </p>
        </header>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-blue-500"></span>
          </div>
        ) : testData.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-xl font-medium text-slate-300">No Exams Found</h3>
            <p className="text-slate-500 mt-1">There are currently no active exams for this batch.</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testData.map((data) => (
              <div
                key={data._id}
                className="card bg-slate-900 border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-900/20"
              >
                <div className="card-body p-6">
                  {/* Class Name Badge */}
                  <div className="flex justify-between items-start mb-2">
                    <span className="badge badge-primary bg-blue-600 border-none text-white text-xs px-3 py-2 font-medium">
                      {data?.ClassName || 'General'}
                    </span>
                  </div>

                  {/* Test Title */}
                  <h2 className="card-title text-xl text-slate-100 font-bold mb-4 line-clamp-2">
                    {data?.TestName || 'Untitled Test'}
                  </h2>

                  {/* Test Details */}
                  <div className="space-y-2.5 text-sm text-slate-300 mb-6">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>
                        <strong className="text-slate-400">Duration:</strong> {data?.durationMinutes} mins
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>
                        <strong className="text-slate-400">Starts:</strong> {formatDate(data?.startTime)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>
                        <strong className="text-slate-400">Result Publishes:</strong> {formatDate(data?.resultPublishTime)}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="card-actions justify-end mt-auto pt-4 border-t border-slate-800">
                    <button
                      onClick={() => navigate(`/test/Attempts/${data._id}`)}
                      className="btn btn-primary bg-blue-600 hover:bg-blue-500 border-none text-white w-full flex items-center justify-center gap-2 transition-colors"
                    >
                      <PlayCircle className="w-5 h-5" />
                      Start Test
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamSub;