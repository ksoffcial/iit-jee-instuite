const express = require("express")
const enrollRouter = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const { enrollNow, studenEnrollment, totalEnrollment, courseEnrollment } = require("../controler/enrollfxn");
const adminMiddleWare = require("../middleware/adminMiddleware");


enrollRouter.post("/enrollCourse/:id", userMiddleware,enrollNow);
enrollRouter.get('/studentenrollDetails',userMiddleware,studenEnrollment)
enrollRouter.get("/allData",adminMiddleWare,totalEnrollment)
enrollRouter.get("/courseById/:id",adminMiddleWare,courseEnrollment)

module.exports = enrollRouter;