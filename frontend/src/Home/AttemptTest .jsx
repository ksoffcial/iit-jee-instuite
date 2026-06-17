import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import axiosClient from '../utils/axisoClient';
import ResultCard from './ResultCard';

const AttemptTest = () => {
  const [testData, setTestData] = useState(null);
  const [index, setIndex] = useState(0);
  
  // Stores answers as an object: { [questionIdOrIndex]: "option text or number" }
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resultdata ,setResultData] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/test/getById/${id}`);
      setTestData(response?.data?.data || null);
    } catch (error) {
      console.error("Error fetching test data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const questions = testData?.questions || [];
  const lastIndex = questions.length - 1;
  const currentQuestion = questions[index];

  const handleOptionChange = (optionValue) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [index]: optionValue, // tracking by index for simplicity
    }));
  };

  const prevFxn = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const nextFxn = () => {
    if (index < lastIndex) {
      setIndex((prev) => prev + 1);
    }
  };

  const submitTest = async () => {
    try {
      setSubmitting(true);
      // Format answers map into an array format if your backend expects it
      const formattedAnswers = questions.map((question, idx) => ({
        questionIndex: question._id,
        selectedOption: selectedAnswers[idx] || null,
      }));
      alert("Test submitted successfully");
      const response = await axiosClient.post(`/test/submit/${id}`, { answers: formattedAnswers });
      console.log("response data :- ",response.data)
      setResultData(response.data);
      
      // navigate('/home'); // Adjust destination redirect as needed
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextOrSubmit = () => {
    if (index === lastIndex) {
      submitTest();
    } else {
      nextFxn();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center gap-4">
        <span className="loading loading-ring loading-lg text-blue-500"></span>
        <p className="text-slate-400 font-medium animate-pulse">Loading test environment...</p>
      </div>
    );
  }

  if (!testData || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center p-4">
        <div className="card w-full max-w-md bg-slate-900 border border-slate-800 shadow-2xl p-6 text-center items-center">
          <AlertCircle className="w-16 h-16 text-error mb-4" />
          <h2 className="text-2xl font-bold tracking-tight mb-2">Test Data Not Found</h2>
          <p className="text-slate-400 mb-6">We couldn't retrieve this test assessment. It might have expired or been removed.</p>
          <button onClick={() => navigate(-1)} className="btn btn-blue bg-blue-600 hover:bg-blue-700 text-white border-none w-full">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if(resultdata){
    return(
      <div>
        <ResultCard resultdata={resultdata} navigate={navigate}/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header Navigation Panel */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-950 text-blue-400 rounded-lg border border-blue-900">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">{testData.TestName || "Assessment"}</h1>
              <p className="text-xs text-slate-400">Answer all questions before submitting</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 w-full sm:w-auto justify-center">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Duration: {testData.durationMinutes} mins</span>
            </div>
            <div className="divider divider-horizontal m-0 before:bg-slate-800 after:bg-slate-800"></div>
            <div className="text-xs text-slate-400">
              End: {testData.endTime ? new Date(testData.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}
            </div>
          </div>
        </div>
      </header>

      {/* Main Body Layout */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        
        {/* Left Column: Progress Sidebar */}
        <section className="card bg-slate-900 border border-slate-800 shadow-xl p-4 md:col-span-1">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-400 mb-3">Questions Progress</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, idx) => {
              const isCurrent = idx === index;
              const isAnswered = selectedAnswers[idx] !== undefined;
              
              return (
                <button
                  key={idx}
                  onClick={() => setIndex(idx)}
                  className={`btn btn-sm font-semibold rounded-lg border transition-all ${
                    isCurrent 
                      ? 'bg-blue-600 border-blue-500 text-white ring-2 ring-blue-400/50' 
                      : isAnswered 
                        ? 'bg-blue-950/40 border-blue-900 text-blue-400 hover:bg-blue-900/40' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-600 inline-block"></span>
              <span>Current Question</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-950/40 border border-blue-900 inline-block"></span>
              <span>Attempted</span>
            </div>
          </div>
        </section>

        {/* Right Column: Question Card Frame */}
        <section className="md:col-span-3 flex flex-col gap-4">
          <div className="card bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
            {/* Question Progress Bar Header */}
            <div className="w-full bg-slate-950 h-1.5">
              <div 
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${((index + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="p-6">
              <span className="badge bg-blue-950 text-blue-400 border-blue-900 font-semibold mb-4">
                Question {index + 1} of {questions.length}
              </span>
              
              <h2 className="text-xl font-medium text-white mb-6 leading-relaxed">
                {currentQuestion?.quest}
              </h2>

              {/* Options Selection List Form */}
              <div className="space-y-3">
                {[
                  currentQuestion?.option1,
                  currentQuestion?.option2,
                  currentQuestion?.option3,
                  currentQuestion?.option4
                ].map((option, i) => {
                  if (!option) return null;
                  const optionLabel = `option${i + 1}`;
                  const isChecked = selectedAnswers[index] === optionLabel;

                  return (
                    <label 
                      key={i} 
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-blue-950/30 border-blue-500 text-white shadow-md shadow-blue-950/20' 
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name={`question-${index}`} 
                        checked={isChecked}
                        onChange={() => handleOptionChange(optionLabel)}
                        className="radio border-slate-600 checked:bg-blue-500 checked:border-blue-500" 
                      />
                      <span className="text-base break-words flex-1">{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Footer Control Actions */}
            <div className="px-6 py-4 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center">
              <button 
                onClick={prevFxn} 
                disabled={index === 0}
                className="btn border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 btn-md gap-2 normal-case disabled:bg-slate-900 disabled:text-slate-600 disabled:border-slate-800"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <button 
                onClick={handleNextOrSubmit} 
                disabled={submitting}
                className={`btn btn-md gap-2 normal-case border-none text-white ${
                  index === lastIndex 
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-950/30' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-950/30'
                }`}
              >
                {submitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : index === lastIndex ? (
                  <>
                    Submit Assessment
                    <CheckCircle className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next Question
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AttemptTest;