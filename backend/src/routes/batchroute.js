const express = require("express");
const adminMiddleWare = require("../middleware/adminMiddleware");
const { createBatch, deleteBatch, getAllBatch, batchById } = require("../controler/batchfxn");
const batchRouter = express.Router();

batchRouter.post("/create", adminMiddleWare, createBatch)
batchRouter.delete("/delete/:batchId", adminMiddleWare, deleteBatch)
batchRouter.get("/allBatch", getAllBatch)
batchRouter.get("/getById/:id", batchById)


module.exports = batchRouter;