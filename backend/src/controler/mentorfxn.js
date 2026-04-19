const Mentor = require("../models/mentorData");


const createMentor = async (req, res) => {
    try {
        const mentorData = req.body;
        await Mentor.create(mentorData)

        res.status(200).send("create sucessfully")
    }
    catch (err) {
        res.status(404).send("Error in creating " + err.message)
    }
}

const getAllMentor = async (req, res) => {
    try {
        const mentorData = await Mentor.find();
        res.status(200).send(mentorData)
    }
    catch (err) {
        res.status(404).send("Error in the fetching data " + err.message)
    }

}

const deleteMentor = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        if (!id) {
            res.status(500).send("Id does not exist in the delete ")
        }
        const mentorData = await Mentor.findByIdAndDelete(id);

        res.status(200).send("Mentor deleted sucessfully");
    }
    catch (err) {
        res.status(404).send("Error in Delete Section " + err.message);
    }
}


module.exports = { createMentor, deleteMentor, getAllMentor };
