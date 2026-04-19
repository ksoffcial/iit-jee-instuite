const express = require("express");
const adminRouter = express.Router();
const adminMiddleWare = require("../middleware/adminMiddleware");
const { getAllUser, deleteUser, makeAdmin } = require("../controler/adminfxn");


adminRouter.get("/getAllUser", adminMiddleWare, getAllUser);
adminRouter.delete("/deleteUser/:id", adminMiddleWare, deleteUser)
adminRouter.post("/makeAdmin/:id",adminMiddleWare,makeAdmin)



module.exports = adminRouter;