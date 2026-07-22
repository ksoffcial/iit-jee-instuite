import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axisoClient";
import { useNavigate } from "react-router";
import {
  GraduationCap,
  BookOpen,
  CalendarDays,
  ArrowRight,
  ClipboardList,
  LoaderCircle,
} from "lucide-react";

const MyExam = () => {
  const [enrollData, setEnrollData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const enrollMentData = async () => {
    try {
      const response = await axiosClient.get("/enroll/studentEnrollment");
      setEnrollData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    enrollMentData();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      {/* Header */}
      <div className="hero bg-primary text-primary-content rounded-2xl shadow-lg mb-8">
        <div className="hero-content text-center py-10">
          <div>
            <GraduationCap size={55} className="mx-auto mb-3" />
            <h1 className="text-4xl font-bold">My Exams</h1>
            <p className="mt-3 text-lg opacity-90">
              View all your enrolled courses and start your examination.
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <LoaderCircle className="animate-spin text-primary" size={45} />
        </div>
      )}

      {/* Empty State */}
      {!loading && enrollData.length === 0 && (
        <div className="card bg-base-100 shadow-xl max-w-lg mx-auto">
          <div className="card-body items-center text-center">
            <ClipboardList size={60} className="text-gray-400" />
            <h2 className="card-title text-2xl">No Enrollments Found</h2>
            <p className="text-gray-500">
              You haven't enrolled in any course yet.
            </p>
          </div>
        </div>
      )}

      {/* Course Cards */}
      {!loading && enrollData.length > 0 && (
        <>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Your Courses ({enrollData.length})
            </h2>

            <div className="badge badge-primary badge-lg">
              Ready for Exam
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {enrollData?.map((data) => (
              <div
                key={data._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300"
              >
                <div className="card-body">
                  {/* Icon */}
                  <div className="flex justify-between items-center">
                    <div className="p-3 rounded-full bg-primary/10">
                      <BookOpen className="text-primary" size={30} />
                    </div>

                    <span className="badge badge-success">
                      Active
                    </span>
                  </div>

                  {/* Batch */}
                  <h2 className="card-title mt-3">
                    {data.courseId?.BatchName}
                  </h2>

                  {/* Class */}
                  <p className="text-base-content/70 flex items-center gap-2">
                    <GraduationCap size={18} />
                    {data.courseId?.className}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <CalendarDays size={16} />
                    Ready for Examination
                  </div>

                  <div className="divider"></div>

                  {/* Features */}
                  <ul className="space-y-2 text-sm">
                    <li>✅ Multiple Subjects</li>
                    <li>✅ Instant Result</li>
                    <li>✅ MCQ Based Test</li>
                    <li>✅ Performance Analysis</li>
                  </ul>

                  <div className="card-actions justify-end mt-5">
                    <button
                      className="btn btn-primary w-full"
                      onClick={() =>
                        navigate(`/exam/subject/${data.courseId?.className}`)
                      }
                    >
                      Start Exam
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12">
            <div className="alert alert-info shadow-lg">
              <GraduationCap size={24} />
              <div>
                <h3 className="font-bold">Exam Instructions</h3>
                <div className="text-sm">
                  • Read all questions carefully.
                  <br />
                  • Do not refresh the page during the exam.
                  <br />
                  • Submit before the timer ends.
                  <br />
                  • Your score will be generated automatically after submission.
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyExam;