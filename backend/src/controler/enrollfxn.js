const Enrollement = require("../models/enrolledStudent");

const enrollNow = async (req, res) => {
    try {
        const userId = req.result._id;
        const courseId = req.params.id;
        const existing = await Enrollement.findOne({ courseId: courseId,userId:userId });
        if (existing) {
            return res.send("you are already enrolled in the courses");
        }
        const enrolStudent = await Enrollement.create({
            userId: userId,
            courseId: courseId,
            paymentStatus: "paid"
        })
        res.status(200).send("You Are enrolled sucessfully ");
    }
    catch (err) {
        res.status(404).send("some error in the enroll section of the coures " + err.message)
    }

}


const studenEnrollment = async (req, res) => {
    try {
        const userId = req.result._id;

        if (!userId) {
            return res.status(404).send("Id does not exist ")
        }

        const enrolDetails = await Enrollement.find({ userId }).populate("courseId");

        if (!enrolDetails) {
            return res.status(404).send("Enrollment does not exist ")
        }

        res.status(200).send(enrolDetails);


    }
    catch (err) {
        res.status(404).send("some error to get sudent details" + err.message)
    }
}

// for admin uses 

const totalEnrollment = async (req, res) => {
    try {

        const allData = await Enrollement.find();

        if (!allData) {
            return res.status(404).send("Not able to fetch data")
        }

        res.status(200).send(allData);


    }
    catch (err) {
        res.status(404).send("Error in Total enrolled student " + err.message)
    }
}






module.exports = { enrollNow, studenEnrollment, totalEnrollment }