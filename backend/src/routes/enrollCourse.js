const express = require("express")
const enrollRouter = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const { enrollNow, studenEnrollment, totalEnrollment, courseEnrollment, studentEnrollById } = require("../controler/enrollfxn");
const adminMiddleWare = require("../middleware/adminMiddleware");


enrollRouter.post("/enrollCourse/:id", userMiddleware,enrollNow);
enrollRouter.get('/studentEnrollment',userMiddleware,studenEnrollment)
enrollRouter.get("/allData",adminMiddleWare,totalEnrollment)
enrollRouter.get("/courseById/:id",adminMiddleWare,courseEnrollment)
enrollRouter.get("/studentEnrollById/:id",userMiddleware,studentEnrollById)

module.exports = enrollRouter;