const express = require("express");
const adminMiddleWare = require("../middleware/adminMiddleware");
const { createBatch, deleteBatch, getAllBatch } = require("../controler/batchfxn");
const batchRouter = express.Router();

batchRouter.post("/create", adminMiddleWare, createBatch)
batchRouter.delete("/delete/:batchId", adminMiddleWare, deleteBatch)
batchRouter.get("/allBatch", adminMiddleWare, getAllBatch)


module.exports = batchRouter;