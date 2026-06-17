import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosClient from "../utils/axisoClient";
import {
  ArrowLeft,
  ClipboardList,
  Clock,
  FileQuestion,
  PlayCircle,
  BookOpen,
  AlertCircle,
} from "lucide-react";

const TestDetails = () => {
  const { id } = useParams();
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/test/mockbyclass/${id}`);
      console.log("response", response.data);

      setTestData(response.data.data || []);
    } catch (error) {
      console.log("Error fetching test data:", error);
      setTestData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 px-4 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline border-blue-500 text-blue-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white mb-8"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full mb-4">
            <ClipboardList size={18} />
            <span className="text-sm font-medium">Mock Test Series</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mock Tests
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Choose your test and start practicing. Improve your speed, accuracy,
            and exam confidence with well-structured mock tests.
          </p>
        </div>

        {/* Test Cards */}
        {testData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testData.map((data, index) => (
              <div
                key={data._id}
                className="card bg-slate-900/80 border border-blue-500/20 shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <FileQuestion className="text-white" size={30} />
                    </div>

                    <div className="badge bg-blue-600 text-white border-none">
                      Test {index + 1}
                    </div>
                  </div>

                  <h2 className="card-title text-white text-2xl">
                    {data.TestName}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {data.description ||
                      "This mock test is designed to help you practice important questions and analyze your preparation."}
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock size={18} className="text-blue-400" />
                      <span>
                        Duration: {data.durationMinutes || 60} Minutes
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-300">
                      <BookOpen size={18} className="text-blue-400" />
                      <span>
                        Questions: {data.questions?.length || "Available"}
                      </span>
                    </div>
                  </div>

                  <div className="card-actions mt-7">
                    <button
                      onClick={() => navigate(`/test/Attempts/${data._id}`)}
                      className="btn bg-blue-600 hover:bg-blue-700 text-white border-none w-full rounded-xl"
                    >
                      <PlayCircle size={20} />
                      Attempt Test
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-slate-900/80 border border-blue-500/20 rounded-3xl p-10 text-center shadow-xl">
            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="text-blue-400" size={40} />
            </div>

            <h2 className="text-3xl font-bold text-white mb-3">
              No Test Found
            </h2>

            <p className="text-gray-400 mb-6">
              Currently no mock test is available for {id?.toUpperCase()}.
              Please check again later.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="btn bg-blue-600 hover:bg-blue-700 text-white border-none"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDetails;