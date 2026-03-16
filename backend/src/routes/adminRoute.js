const express = require("express");
const adminRouter = express.Router();
const adminMiddleWare = require("../middleware/adminMiddleware");
const { getAllUser } = require("../controler/adminfxn");


adminRouter.get("/getAllUser", adminMiddleWare, getAllUser);



module.exports = adminRouter;