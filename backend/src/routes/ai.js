const express = require("express");
const solveDoubt = require("../controler/aichat");
const aiRouter = express.Router();

aiRouter.post("/doubt", solveDoubt);


module.exports = aiRouter;