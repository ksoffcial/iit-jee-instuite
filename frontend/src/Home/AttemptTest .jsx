import React, { useEffect, useState } from "react";
import {
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  FileText,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { useParams } from "react-router";
import axiosClient from "../utils/axisoClient";

const AttemptTest = () => {
  const [testData, setTestData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  const {id} = useParams();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        // dummy API - change this later
        const response = await axiosClient.get(`/test/getById/${id}`);
        console.log("response is here" ,response.data)
        setTestData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmitTest = async () => {
    try {
      setSubmitting(true);

      const answers = testData.questions.map((question) => ({
        questionId: question._id,
        selectedAnswer: selectedAnswers[question._id] || null,
      }));

      const payload = {
        answers,
      };

      console.log("Submit Payload:", payload);

      // dummy API - change this later
      const response = await axiosClient.post(`/test/submit/${id}`, payload);

      console.log("Submit Response:", response.data);

      if (response.data.resultVisible) {
        alert(
          `Test Submitted!\nScore: ${response.data.obtainedMarks}/${response.data.totalMarks}`
        );
      } else {
        alert("Test submitted successfully. Result will be published later.");
      }
    } catch (error) {
      console.log(error);
      // alert("Test submitted successfully! Dummy mode.");
      alert(testData?.message || "something went wrong")
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-primary" size={36} />
          <p className="font-semibold">Loading test...</p>
        </div>
      </div>
    );
  }

  const totalQuestions = testData?.questions?.length || 0;
  const attemptedQuestions = Object.keys(selectedAnswers).length;

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                  <FileText className="text-primary" />
                  {testData?.TestName}
                </h1>
                <p className="text-base-content/60 mt-1">
                  Class: {testData.ClassName}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="badge badge-primary badge-outline p-4 gap-2">
                  <HelpCircle size={16} />
                  {totalQuestions} Questions
                </div>

                <div className="badge badge-secondary badge-outline p-4 gap-2">
                  <CheckCircle2 size={16} />
                  {attemptedQuestions} Attempted
                </div>

                <div className="badge badge-accent badge-outline p-4 gap-2">
                  <Clock size={16} />
                  {testData.durationMinutes} Min
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="card bg-base-100 shadow border border-base-300">
          <div className="card-body py-4">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>Progress</span>
              <span>
                {attemptedQuestions}/{totalQuestions}
              </span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={attemptedQuestions}
              max={totalQuestions}
            ></progress>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-5">
          {testData.questions?.map((question, index) => (
            <div
              key={question._id}
              className="card bg-base-100 shadow-md border border-base-300"
            >
              <div className="card-body">
                <div className="flex items-start gap-3">
                  <div className="badge badge-primary p-4 font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">
                    <h2 className="font-semibold text-lg leading-relaxed">
                      {question.quest}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                      {["option1", "option2", "option3", "option4"].map(
                        (optionKey, optIndex) => (
                          <label
                            key={optionKey}
                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedAnswers[question._id] === optionKey
                                ? "border-primary bg-primary/10"
                                : "border-base-300 hover:border-primary"
                              }`}
                          >
                            <input
                              type="radio"
                              name={`question-${question._id}`}
                              className="radio radio-primary"
                              checked={
                                selectedAnswers[question._id] === optionKey
                              }
                              onChange={() =>
                                handleAnswerChange(question._id, optionKey)
                              }
                            />

                            <span className="font-medium">
                              {String.fromCharCode(65 + optIndex)}.
                            </span>

                            <span>{question[optionKey]}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="sticky bottom-4">
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body p-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-base-content/70">
                  You attempted{" "}
                  <span className="font-bold text-primary">
                    {attemptedQuestions}
                  </span>{" "}
                  out of{" "}
                  <span className="font-bold">{totalQuestions}</span> questions.
                </p>

                <button
                  onClick={handleSubmitTest}
                  disabled={submitting}
                  className="btn btn-primary w-full md:w-auto gap-2"
                >
                  {submitting ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <Send size={18} />
                  )}
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <dialog id="submit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Submit Test?</h3>
          <p className="py-4">
            Are you sure you want to submit this test? You cannot change answers
            after submission.
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button className="btn">Cancel</button>
              <button
                type="button"
                onClick={handleSubmitTest}
                className="btn btn-primary"
              >
                Yes, Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AttemptTest;