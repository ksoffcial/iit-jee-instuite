const Batch = require("../models/batchData");
const Enrollement = require("../models/enrolledStudent");
const { batchValidator } = require("../utils/validate");


const createBatch = async (req, res) => {
    try {
        const data = req.body;
        batchValidator(data)
        const dataAdded = await Batch.create(data);
        res.send("batch created sucessfullly ");
    }
    catch (err) {
        res.send("Error Batch creation " + err.message);
    }
}

const getAllBatch = async (req, res) => {
    try {
        const batchData = await Batch.find().select("_id BatchName className timePeriods startDate time subjects createAt description");
        if (!batchData) {
            return res.status(400).send("Batch data is not avaible");
        }
        res.status(200).send(batchData);
    }
    catch (err) {
        res.status(404).send("Error in get all batch " + err.message);
    }
}

const deleteBatch = async (req, res) => {
    try {
        const { batchId } = req.params;


        if (!batchId) {
            return res.status(500).send("batch id is not defiend ");
        }

        await Enrollement.deleteMany({ courseId: batchId });
        const batchData = await Batch.findByIdAndDelete(batchId);

        if (!batchData) {
            return res.status(500).send("batch Data is not avaible ");
        }

        res.status(200).send("deleted sucessfully");
    }
    catch (err) {
        res.status(500).send("error in delete batch " + err.message);
    }

}

const batchById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).send("Id is not defined ")
        }
        const batchData = await Batch.findById(id);
        if (!batchData) {
            return res.status(404).send("batch does not exist ")
        }

        res.status(200).send(batchData);
    }
    catch (err) {
        res.status(404).send("some error in the get by id " + err.message)
    }
}


module.exports = { createBatch, getAllBatch, deleteBatch, batchById }