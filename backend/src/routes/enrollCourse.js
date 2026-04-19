const express = require("express")
const enrollRouter = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const { enrollNow, studenEnrollment, totalEnrollment } = require("../controler/enrollfxn");
const adminMiddleWare = require("../middleware/adminMiddleware");


enrollRouter.post("/enrollCourse/:id", userMiddleware,enrollNow);
enrollRouter.get('/enrollDetails',userMiddleware,studenEnrollment)
enrollRouter.get("/allData",adminMiddleWare,totalEnrollment)

module.exports = enrollRouter;