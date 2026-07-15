const Test = require("../models/testData");
const { testValidator } = require("../utils/validate");
const Attempt = require("../models/testSubmit")

// this api is used to create the test 
const createTest = async (req, res) => {
    try {
        const data = req.body;
        // testValidator(data);
        const test = await Test.create(data)

        res.status(200).send("test has created ")
    }
    catch (err) {
        res.status(404).send("Error in the Create Test " + err.message)
    }
}

// to delete the test data using the admin panel
const deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Test.findByIdAndDelete(id)
        res.status(200).send(" test is Deleted sucessfully ")
    }
    catch (err) {
        res.status(404).send("Error in the delete Test " + err.message)
    }
}

// Fetch the all test data using this api in the admin panel 
const getAllTest = async (req, res) => {
    try {
        const testData = await Test.find();

        if (!testData) {
            res.status(200).json({
                message: "Data does not found 👀"
            })
        }

        res.status(200).json({
            test: testData,
            message: "Data fetch sucessfully ✔"
        })

    }
    catch (err) {
        res.status(404).send("not found data" + err.message)
    }
}

// get test data using the test id and some other filter 
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const now = new Date();
        if (!id) {
            return res.status(500).send("error in getById" + err.message)
        }

        const testData = await Test.findById(id);

        if (testData.scheduleType === "fixed" && now < testData.startTime) {
            return res.status(201).json({
                message: `Test not Start yet, Test will be start at ${testData.startTime.toLocaleString()}`,
            });
        }

        if (testData.scheduleType === "fixed" && now > testData.endTime) {
            return res.status(200).json({
                message: "Test submission time is over",
            });
        }

        res.status(200).json({
            data: testData,
            message: "data found success fully"
        })
    }
    catch (err) {
        res.status(500).send("Error in the getbyid" + err.message)
    }
}

// fetch the mock test using the class name/std
const mockByClass = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(200).json({
                message: "Test not found"
            })
        }


        const testData = await Test.find({ ClassName: id }).select(" _id TestName description durationMinutes");

        if (!testData) {
            return res.status(200).json({
                message: "Some internal Error"
            })
        }

        res.status(200).json({
            data: testData,
            message: "Data found sucessfully"
        })
    }
    catch (err) {
        res.status(404).json({
            message: "some error in get mock" + err.message
        })
    }
}

// this api is used to create the 
const submitTest = async (req, res) => {
    try {
        const userId = req.result._id;
        const testId = req.params.id;
        const { answers } = req.body;



        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({
                message: "Answers are required",
            });
        }
        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({
                message: "Test not found",
            });
        }
        const now = new Date();

        if (test.scheduleType === "fixed" && now > test.endTime) {
            return res.status(403).json({
                message: "Test submission time is over",
            });
        }

        let attempt = await Attempt.findOne({
            userId,
            testId,
        });

        if (!attempt) {
            attempt = await Attempt.create({
                userId,
                testId,
                startedAt: now,
            });
        }



        if (attempt.status === "submitted") {
            return res.status(400).json({
                message: "You have already submitted this test",
            });
        }

        let totalMarks = 0;
        let obtainedMarks = 0;

        const checkedAnswers = test.questions.map((question) => {
            totalMarks += question.marks;

            const userAnswer = answers.find(
                (ans) => ans.questionIndex.toString() === question._id.toString()
            );

            const selectedAnswer = userAnswer?.selectedOption || null;

            let isCorrect = false;
            let marksObtained = 0;

            if (selectedAnswer === question.answer) {
                isCorrect = true;
                marksObtained = question.marks;
            } else if (selectedAnswer === null) {
                marksObtained = 0;
            } else {
                marksObtained = -question.negativeMarks;
            }

            obtainedMarks += marksObtained;

            return {
                questionId: question._id,
                selectedAnswer,
                isCorrect,
                marksObtained,
            };
        });



        attempt.answers = checkedAnswers;
        attempt.totalMarks = totalMarks;
        attempt.obtainedMarks = obtainedMarks;
        attempt.submittedAt = now;
        attempt.status = "submitted";
        if (test.resultType === "instant") {
            attempt.resultVisible = true;
        } else {
            attempt.resultVisible = false;
        }
        await attempt.save();

        if (test.resultType === "instant") {
            return res.status(200).json({
                message: "Test submitted successfully",
                resultVisible: true,
                totalMarks,
                obtainedMarks,
                answers: checkedAnswers,
            });
        }


        return res.status(200).json({
            message: "Test submitted successfully. Result will be published later.",
            resultVisible: false,
            resultPublishTime: test.resultPublishTime,
        });

    } catch (err) {
        res.status(500).json({
            message: "Error while submitting test",
            error: err.message,
        });
        console.log(err.message)
    }
};

// to get the result of the all student in admin panel 
const getSudentAllResult = async (req, res) => {
    try {
        const userId = req.result._id;

        if (!userId) {
            return res.status(404).json({
                message: "User id is not defined",
            });
        }

        const userResult = await Attempt.find({ userId: userId }).select("testId totalMarks obtainedMarks status submittedAt");

        if (!userResult) {
            return res.status(404).json({
                message: "User has not sumbitted any test",
            });
        }

        res.status(200).json({
            message: 'User data got sucessfully',
            data: userResult
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Error while fetching all Result",
            error: err.message,
        });
    }
}

// applied filter to get test wise test result 
const testWiseResult = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.result._id;

        const testResult = await Attempt.find({ testId: id }).select('totalMarks obtainedMarks startedAt submittedAt').populate({ path: 'userId', select: 'fullName emailId phoneNumber' })

        if (!testResult) {
            return res.status(404).json({
                message: "Test Id is not defined ",
            });
        }

        res.status(200).json({
            message: "TestWise result fetch sucessfully",
            result: testResult
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Error while fetching test wise result",
            error: err.message,
        });
    }
}

// get result using the student id and student for the student purpose only
const getStudentResult = async (req, res) => {
    try {
        const userId = req.result._id;
        const testId = req.params.id;

        const test = await Test.findById(testId).select(
            "TestName ClassName resultType resultPublishTime questions"
        );

        if (!test) {
            return res.status(404).json({
                message: "Test not found",
            });
        }

        const attempt = await Attempt.findOne({
            userId,
            testId,
            status: "submitted",
        });

        if (!attempt) {
            return res.status(404).json({
                message: "You have not submitted this test yet",
            });
        }

        const now = new Date();

        if (test.resultType === "scheduled" && now < test.resultPublishTime) {
            return res.status(403).json({
                message: "Result is not published yet",
                resultPublishTime: test.resultPublishTime,
            });
        }

        const resultAnswers = attempt.answers.map((attemptAns) => {
            const question = test.questions.find(
                (q) => q._id.toString() === attemptAns.questionId.toString()
            );

            return {
                questionId: attemptAns.questionId,
                question: question?.quest,
                option1: question?.option1,
                option2: question?.option2,
                option3: question?.option3,
                option4: question?.option4,

                selectedAnswer: attemptAns.selectedAnswer,
                correctAnswer: question?.answer,

                isCorrect: attemptAns.isCorrect,
                marksObtained: attemptAns.marksObtained,
            };
        });

        return res.status(200).json({
            message: "Result fetched successfully",

            test: {
                id: test._id,
                TestName: test.TestName,
                ClassName: test.ClassName,
            },

            score: {
                totalMarks: attempt.totalMarks,
                obtainedMarks: attempt.obtainedMarks,
                percentage: ((attempt.obtainedMarks / attempt.totalMarks) * 100).toFixed(2),
            },

            result: resultAnswers,
            submittedAt: attempt.submittedAt,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error while fetching result",
            error: err.message,
        });
    }
};

const getStudentAllResult = async (req, res) => {
    try {
        const userId = req.result._id;

        if (!userId) {
            return res.status(500).send("userId not found or user Id is not valid");
        }


        const result = await Attempt.find({ userId }).select("totalMarks obtainedMarks startedAt status").populate({ path: "testId", select: "TestName ClassName durationMinutes startTime endTime" })

        if (!result) {
            return res.status(500).send("Data not found")
        }

        res.status(200).json({
            message: "data found sucessfully",
            data: result
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error while fetching student result",
            error: err.message,
        })
    }

}






module.exports = { createTest, deleteTest, getAllTest, getById, submitTest, getStudentResult, getSudentAllResult, testWiseResult, getStudentAllResult, mockByClass };