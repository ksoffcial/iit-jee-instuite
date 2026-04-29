import React, { useEffect, useState } from "react";
import {
    Award,
    CheckCircle2,
    XCircle,
    Clock,
    FileText,
    Loader2,
    Trophy,
} from "lucide-react";
import axios from "axios";

const TestResult = () => {
    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(true);

    const testId = "TEST_ID_HERE";

    useEffect(() => {
        const fetchResult = async () => {
            try {
                // Dummy API - change later
                const response = await axios.get(`/test/result`);
                setResultData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, []);

    const getOptionLabel = (key) => {
        const labels = {
            option1: "A",
            option2: "B",
            option3: "C",
            option4: "D",
        };
        return labels[key] || "-";
    };

    const getOptionText = (question, key) => {
        return question[key] || "Not Attempted";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin text-primary" size={40} />
                    <p className="font-semibold">Loading result...</p>
                </div>
            </div>
        );
    }

    const score = resultData.score;
    const percentage = Number(score.percentage);

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                            <div>
                                <h1 className="text-3xl font-bold flex items-center gap-2">
                                    <FileText className="text-primary" />
                                    {resultData.test.TestName}
                                </h1>
                                <p className="text-base-content/60 mt-1">
                                    Class: {resultData.test.ClassName}
                                </p>
                            </div>

                            <div className="badge badge-success badge-outline p-4 gap-2">
                                <Trophy size={18} />
                                Result Published
                            </div>
                        </div>
                    </div>
                </div>

                {/* Score Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="card bg-base-100 shadow-lg border border-base-300">
                        <div className="card-body items-center text-center">
                            <Award className="text-primary" size={36} />
                            <h2 className="text-sm text-base-content/60">Total Marks</h2>
                            <p className="text-3xl font-bold">{score.totalMarks}</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg border border-base-300">
                        <div className="card-body items-center text-center">
                            <CheckCircle2 className="text-success" size={36} />
                            <h2 className="text-sm text-base-content/60">Obtained Marks</h2>
                            <p className="text-3xl font-bold text-success">
                                {score.obtainedMarks}
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg border border-base-300">
                        <div className="card-body items-center text-center">
                            <Trophy className="text-warning" size={36} />
                            <h2 className="text-sm text-base-content/60">Percentage</h2>
                            <p className="text-3xl font-bold">{score.percentage}%</p>
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="card bg-base-100 shadow border border-base-300">
                    <div className="card-body">
                        <div className="flex justify-between text-sm font-semibold mb-2">
                            <span>Performance</span>
                            <span>{score.percentage}%</span>
                        </div>
                        <progress
                            className={`progress w-full ${percentage >= 70
                                    ? "progress-success"
                                    : percentage >= 40
                                        ? "progress-warning"
                                        : "progress-error"
                                }`}
                            value={percentage}
                            max="100"
                        ></progress>
                    </div>
                </div>

                {/* Submitted Time */}
                <div className="alert bg-base-100 shadow border border-base-300">
                    <Clock size={20} />
                    <span>
                        Submitted At:{" "}
                        {new Date(resultData.submittedAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </span>
                </div>

                {/* Question Wise Result */}
                <div className="space-y-5">
                    <h2 className="text-2xl font-bold">Question-wise Analysis</h2>

                    {resultData.result.map((item, index) => (
                        <div
                            key={item.questionId}
                            className={`card shadow-md border ${item.isCorrect
                                    ? "bg-success/5 border-success/30"
                                    : "bg-error/5 border-error/30"
                                }`}
                        >
                            <div className="card-body">
                                <div className="flex justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`badge p-4 font-bold ${item.isCorrect ? "badge-success" : "badge-error"
                                                }`}
                                        >
                                            {index + 1}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg leading-relaxed">
                                                {item.question}
                                            </h3>

                                            <p className="text-sm mt-2">
                                                Marks Obtained:{" "}
                                                <span className="font-bold">
                                                    {item.marksObtained}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {item.isCorrect ? (
                                        <CheckCircle2 className="text-success shrink-0" />
                                    ) : (
                                        <XCircle className="text-error shrink-0" />
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                                    {["option1", "option2", "option3", "option4"].map((optionKey) => {
                                        const isCorrectOption = item.correctAnswer === optionKey;
                                        const isSelectedOption = item.selectedAnswer === optionKey;

                                        return (
                                            <div
                                                key={optionKey}
                                                className={`p-4 rounded-xl border flex items-center justify-between ${isCorrectOption
                                                        ? "border-success bg-success/10"
                                                        : isSelectedOption
                                                            ? "border-error bg-error/10"
                                                            : "border-base-300 bg-base-100"
                                                    }`}
                                            >
                                                <span>
                                                    <span className="font-bold">
                                                        {getOptionLabel(optionKey)}.
                                                    </span>{" "}
                                                    {item[optionKey]}
                                                </span>

                                                <div className="flex gap-2">
                                                    {isCorrectOption && (
                                                        <span className="badge badge-success">Correct</span>
                                                    )}

                                                    {isSelectedOption && !isCorrectOption && (
                                                        <span className="badge badge-error">Your Answer</span>
                                                    )}

                                                    {isSelectedOption && isCorrectOption && (
                                                        <span className="badge badge-primary">Your Answer</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {item.selectedAnswer === null && (
                                    <div className="alert alert-warning mt-4">
                                        You did not attempt this question.
                                    </div>
                                )}

                                <div className="mt-4 text-sm">
                                    <p>
                                        Your Answer:{" "}
                                        <span className="font-bold">
                                            {getOptionLabel(item.selectedAnswer)} -{" "}
                                            {getOptionText(item, item.selectedAnswer)}
                                        </span>
                                    </p>

                                    <p>
                                        Correct Answer:{" "}
                                        <span className="font-bold text-success">
                                            {getOptionLabel(item.correctAnswer)} -{" "}
                                            {getOptionText(item, item.correctAnswer)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TestResult;