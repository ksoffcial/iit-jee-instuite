const express = require("express");
const { createEnquiry, getAllqurey, deleteQuery } = require("../controler/efxn");
const adminMiddleWare = require("../middleware/adminMiddleware");
const eRouter = express.Router();


eRouter.post("/create",createEnquiry);
eRouter.get("/getAll",getAllqurey);
eRouter.delete("/delete/:id", adminMiddleWare,deleteQuery)



module.exports = eRouter;