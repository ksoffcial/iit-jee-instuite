const express = require("express");
const adminMiddleWare = require("../middleware/adminMiddleware");
const { createTest, deleteTest, getAllTest, getById, submitTest,getStudentResult, getSudentAllResult, testWiseResult,getStudentAllResult, mockByClass, getExamClass} = require("../controler/testfxn");
const testRouter = express.Router();
const userMiddleWare = require("../middleware/userMiddleware")

testRouter.post("/create", adminMiddleWare, createTest);
testRouter.delete("/delete/:id", adminMiddleWare, deleteTest)
testRouter.get('/getAllTest',adminMiddleWare,getAllTest)
testRouter.get("/getById/:id",userMiddleWare,getById)
testRouter.post("/submit/:id",userMiddleWare,submitTest);
testRouter.get("/result/:id", userMiddleWare, getStudentResult);
testRouter.get("/studentAll",userMiddleWare,getSudentAllResult);
testRouter.get("/testwise/:id",adminMiddleWare,testWiseResult)
testRouter.get("/getStudentAllResult",userMiddleWare,getStudentAllResult)
testRouter.get("/mockbyclass/:id",userMiddleWare,mockByClass)
testRouter.get("/getExam/:id",userMiddleWare,getExamClass);


module.exports = testRouter;