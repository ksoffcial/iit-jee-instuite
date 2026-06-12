const express = require("express");
const adminMiddleWare = require("../middleware/adminMiddleware");
const { createTest, deleteTest, getAllTest, getById, submitTest,getStudentResult, getSudentAllResult, testWiseResult,getStudentAllResult, mockByClass} = require("../controler/testfxn");
const testRouter = express.Router();
const userMiddleWare = require("../middleware/userMiddleware")

testRouter.post("/create", adminMiddleWare, createTest);
testRouter.delete("/delete/:id", adminMiddleWare, deleteTest)
testRouter.get('/getAllTest', getAllTest)
testRouter.get("/getById/:id",getById)
testRouter.post("/submit/:id",userMiddleWare,submitTest);
testRouter.get("/result/:id", userMiddleWare, getStudentResult);
testRouter.get("/studentAll",userMiddleWare,getSudentAllResult);
testRouter.get("/testwise/:id",adminMiddleWare,testWiseResult)
testRouter.get("/getStudentAllResult",userMiddleWare,getStudentAllResult)
testRouter.get("/mockbyclass/:id",userMiddleWare,mockByClass)


module.exports = testRouter;