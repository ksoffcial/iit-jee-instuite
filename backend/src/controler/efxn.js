const Enquiry = require("../models/enquiryData");
const { validateQuery } = require("../utils/validate");


const createEnquiry = async (req, res) => {
    try {
        const eData = req.body;
        validateQuery(eData);
        const result = await Enquiry.create(eData);
        res.status(200).send("Enquiry created sucessfully");
    }
    catch(err){
        console.log(err.message)
        res.status(404).send("Error in the create Query " + err.message);
    }
}

const getAllqurey = async (req, res) => {
    try {
        const allQuery = await Enquiry.find();
        res.status(200).send(allQuery);
    }
    catch (err) {
        res.status(404).send("Error to find the query " + err.message)
    }
}

const deleteQuery = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send("User is not valid");
        }
        await Enquiry.findByIdAndDelete(id);
        res.status(200).send("Deleted Sucessfully")
    }
    catch (err) {
        res.status(404).send("Error in deleteQuery " + err.message)
    }
}




module.exports = { createEnquiry,getAllqurey , deleteQuery};