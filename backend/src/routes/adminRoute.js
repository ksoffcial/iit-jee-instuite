const express = require("express");
const adminRouter = express.Router();
const adminMiddleWare = require("../middleware/adminMiddleware");
const { getAllUser, deleteUser } = require("../controler/adminfxn");


adminRouter.get("/getAllUser", adminMiddleWare, getAllUser);
adminRouter.delete("/deleteUser/:id", adminMiddleWare, deleteUser)



module.exports = adminRouter;