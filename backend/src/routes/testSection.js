const express = require("express");
const adminMiddleWare = require("../middleware/adminMiddleware");
const { createTest, deleteTest, getAllTest, getById } = require("../controler/testfxn");
const testRouter = express.Router();

testRouter.post("/create", adminMiddleWare, createTest);
testRouter.delete("/delete/:id", adminMiddleWare, deleteTest)
testRouter.get('/getAllTest', getAllTest)
testRouter.get("/getById/:id",getById)

module.exports = testRouter;