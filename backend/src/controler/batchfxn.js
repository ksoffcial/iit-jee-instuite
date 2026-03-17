const Batch = require("../models/batchData");
const { batchValidator } = require("../utils/validate");


const createBatch = async (req, res) => {
    try {
        const data = req.body;
        batchValidator(data)
        const dataAdded = await Batch.create(data);

        res.send("batch created sucessfullly ")
    }
    catch (err) {
        res.send("Error  Batch creation " + err.message);
    }
}

const getAllBatch = async (req, res) => {
    try {
        const batchData = await Batch.find().select("_id BatchName className timePeriods startDate time subjects description");
        console.log(batchData)

        res.status(200).send(batchData);
    }
    catch (err) {
        res.status(404).send("Error in get all batch " + err.message)
    }
}

const deleteBatch = async (req, res) => {
    try {
        const { batchId } = req.params;

        if (!batchId) {
            return res.status(500).send("batch id is not defiend ")
        }

        const batchData = await Batch.findByIdAndDelete(batchId);

        if (!batchData) {
            return res.status(500).send("batch Data is not avaible ");
        }

        res.status(200).send("deleted sucessfully")
    }
    catch (err) {
        res.status(500).send("error in delete batch " + err.message)
    }

}


module.exports = { createBatch, getAllBatch, deleteBatch }