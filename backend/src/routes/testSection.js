const express = require("express");
const adminMiddleWare = require("../middleware/adminMiddleware");
const { createTest, deleteTest, getAllTest } = require("../controler/testfxn");
const testRouter = express.Router();

testRouter.post("/create", adminMiddleWare, createTest);
testRouter.delete("/delete/:id", adminMiddleWare, deleteTest)
testRouter.get('/getAllTest', getAllTest)

module.exports = testRouter;