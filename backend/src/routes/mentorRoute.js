const express = require("express");
const { createMentor, getAllMentor, deleteMentor } = require("../controler/mentorfxn");
const mentorRouter = express.Router();
const adminMiddleWare = require("../middleware/adminMiddleware");


mentorRouter.post("/create", adminMiddleWare, createMentor)
mentorRouter.get("/getMentor",getAllMentor);
mentorRouter.delete("/deleteMentor/:id",adminMiddleWare,deleteMentor)




module.exports = mentorRouter;