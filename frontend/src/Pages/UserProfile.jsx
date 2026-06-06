import React, { useEffect, useState } from 'react';
import axiosClient from '../utils/axisoClient';
import { 
  User, 
  BookOpen, 
  Award, 
  Phone, 
  Mail, 
  ShieldAlert, 
  Calendar, 
  Clock, 
  XCircle,
  HelpCircle,
  ArrowLeft
} from 'lucide-react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [batchData, setBatchData] = useState(null);
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [batchRes, userRes, testRes] = await Promise.all([
          axiosClient.get("/enroll/studentEnrollment").catch(err => ({ data: { data: [] } })),
          axiosClient.get("/user/userData").catch(err => ({ data: { data: null } })),
          axiosClient.get("/test/getStudentAllResult").catch(err => ({ data: { data: [] } }))
        ]);

        setBatchData(batchRes.data.data);
        setUserData(userRes.data.data);
        setTestData(testRes.data.data);
      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full p-4 md:p-8 max-w-6xl mx-auto min-h-screen bg-black text-white">
        <div className="skeleton bg-slate-900 h-10 w-32 rounded-lg border border-slate-800"></div>
        <div className="skeleton bg-slate-900 h-36 w-full rounded-2xl border border-slate-800"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="skeleton bg-slate-900 h-80 w-full rounded-2xl border border-slate-800"></div>
          <div className="skeleton bg-slate-900 h-80 w-full rounded-2xl border border-slate-800"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 p-4 md:p-8 selection:bg-blue-600 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Navigation / Top Bar */}
        <div className="flex items-center justify-start pt-2">
          {/* Note: Replace 'href="/"' with 'to="/"' if using react-router-dom Link component */}
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-semibold text-slate-300 hover:text-blue-400 hover:border-blue-900 transition-all duration-200 shadow-md group"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>
        </div>
        
        {/* Profile Card Header */}
        <div className="card bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden rounded-2xl">
          <div className="bg-gradient-to-r from-blue-950 via-slate-950 to-black p-6 border-b border-slate-800">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="avatar placeholder">
                <div className="bg-slate-900 text-blue-400 rounded-full w-24 h-24 ring-2 flex  justify-center items-center ring-blue-500 ring-offset-4 ring-offset-slate-950">
                  <span className="text-7xl  font-black tracking-wider">
                    {userData?.fullName?.charAt(0).toUpperCase() || <User size={36} />}
                  </span>
                </div>
              </div>
              <div className="text-center sm:text-left space-y-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {userData?.fullName || 'Student Profile'}
                </h1>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-950/60 border border-blue-800/60 text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  {userData?.role || 'Student'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick User Meta Info */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-slate-950/40">
            <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 p-4 rounded-xl hover:border-blue-900 transition-colors">
              <Mail className="text-blue-500 shrink-0" size={20} />
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email Address</p>
                <p className="font-semibold text-sm text-slate-200 truncate">{userData?.emailId || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 p-4 rounded-xl hover:border-blue-900 transition-colors">
              <Phone className="text-blue-500 shrink-0" size={20} />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Phone Number</p>
                <p className="font-semibold text-sm text-slate-200">{userData?.phoneNumber || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 p-4 rounded-xl hover:border-blue-900 transition-colors">
              <User className="text-blue-500 shrink-0" size={20} />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Gender</p>
                <p className="font-semibold text-sm text-slate-200 capitalize">{userData?.gender || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Enrolled Courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2.5">
                <BookOpen className="text-blue-500" size={22} />
                <h2 className="text-xl font-bold tracking-tight text-white">Enrolled Courses</h2>
              </div>
              <span className="px-2.5 py-0.5 bg-blue-950 text-blue-400 border border-blue-900 rounded-full text-xs font-bold">
                {batchData?.length || 0}
              </span>
            </div>

            {batchData && batchData.length > 0 ? (
              <div className="space-y-4">
                {batchData.map((data) => (
                  <div key={data._id} className="card bg-slate-950 border border-slate-800 hover:border-blue-900/60 transition-all rounded-xl shadow-lg">
                    <div className="card-body p-5 space-y-4">
                      
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-white tracking-tight">{data?.courseId?.BatchName}</h3>
                          <p className="text-xs text-blue-400 font-medium mt-0.5">Class: {data?.courseId?.className}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${
                          data?.paymentStatus === 'Paid' 
                            ? 'bg-emerald-950/80 border-emerald-800 text-emerald-400' 
                            : 'bg-amber-950/80 border-amber-800 text-amber-400'
                        }`}>
                          {data?.paymentStatus || 'Pending'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 p-3 bg-slate-900/40 border border-slate-900 rounded-lg text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-blue-500" /> 
                          <span>Start: <strong className="text-slate-200">{new Date(data?.courseId?.startDate).toLocaleDateString() || 'N/A'}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-blue-500" /> 
                          <span>Period: <strong className="text-slate-200">{data?.courseId?.timePeriods || 'N/A'}</strong></span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-900 pt-3">
                        <div className="p-2 rounded bg-slate-900/30">
                          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Price</p>
                          <p className="font-bold text-sm text-slate-200">₹{data?.courseId?.finalPrice}</p>
                        </div>
                        <div className="p-2 rounded bg-slate-900/30">
                          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Paid</p>
                          <p className="font-bold text-sm text-blue-400">₹{data?.paymentAmount}</p>
                        </div>
                        <div className="p-2 rounded bg-slate-900/30">
                          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Discount</p>
                          <p className="font-bold text-sm text-slate-400">₹{data?.courseId?.totalDiscount}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 p-4 rounded-xl text-slate-400 text-sm">
                <HelpCircle size={18} className="text-blue-500" />
                <span>You are not enrolled in any batches yet.</span>
              </div>
            )}
          </div>

          {/* Test Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2.5">
                <Award className="text-blue-500" size={22} />
                <h2 className="text-xl font-bold tracking-tight text-white">Test History</h2>
              </div>
              <span className="px-2.5 py-0.5 bg-blue-950 text-blue-400 border border-blue-900 rounded-full text-xs font-bold">
                {testData?.length || 0}
              </span>
            </div>

            {testData && testData.length > 0 ? (
              <div className="space-y-4">
                {testData.map((data) => {
                  const scorePercentage = data?.totalMarks ? Math.round((data.obtainedMarks / data.totalMarks) * 100) : 0;
                  const isPassed = data?.status === 'Passed' || data?.status === 'completed' || scorePercentage >= 40;

                  return (
                    <div key={data._id} className="card bg-slate-950 border border-slate-800 hover:border-blue-900/60 transition-all rounded-xl shadow-lg">
                      <div className="card-body p-5 space-y-4">
                        
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="text-lg font-bold text-white tracking-tight">{data?.testId?.TestName}</h3>
                            <p className="text-xs text-slate-500">Target Class: {data?.testId?.ClassName}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                            isPassed ? 'text-blue-400 bg-blue-950/40 border border-blue-900' : 'text-slate-400 bg-slate-900 border border-slate-800'
                          }`}>
                            {data?.status || 'Submitted'}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-slate-900">
                          <div className="space-y-1.5 text-xs text-slate-400">
                            <div className="flex items-center gap-1.5">
                              <Clock size={13} className="text-blue-500" />
                              <span>Duration: {data?.testId?.durationMinutes} mins</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar size={13} className="text-blue-500" />
                              <span>Date: {data?.startedAt ? new Date(data.startedAt).toLocaleDateString() : 'N/A'}</span>
                            </div>
                          </div>
                          
                          {/* Dark Styled Score Meter */}
                          <div className="flex flex-col items-start sm:items-end bg-slate-900/50 p-3 rounded-lg border border-slate-900 min-w-[130px]">
                            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-0.5">Performance</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-black text-white">{data?.obtainedMarks}</span>
                              <span className="text-xs text-slate-500">/ {data?.totalMarks} mks</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-1 mt-1.5 overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-500" 
                                style={{ width: `${Math.min(scorePercentage, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-2">
                <XCircle className="text-slate-700" size={32} />
                <p className="text-sm font-semibold text-slate-300">No Tests Found</p>
                <p className="text-xs text-slate-500 max-w-xs">You haven't undertaken or completed any assessments under this profile yet.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;