const Batch = require("../models/batchData");
const Enrollement = require("../models/enrolledStudent");

const enrollNow = async (req, res) => {
    try {
        const userId = req.result._id;
        const courseId = req.params.id;
        if (!userId) {
            return res.status(400).send("User is not verified ");
        }
        if (!courseId) {
            return res.status(400).send("Course is not defined ");
        }

        const existing = await Enrollement.findOne({ courseId: courseId, userId: userId });
        if (existing) {
            return res.send("you are already enrolled in the courses");
        }


        const batchData = await Batch.findById(courseId);
        if (!batchData) {
            res.status(404).send("batch data is not defined");
        }
        const courseFee = parseInt(batchData.finalPrice);

        const enrolStudent = await Enrollement.create({
            userId: userId,
            courseId: courseId,
            paymentStatus: "paid",
            paymentAmount: courseFee
        })
        if (!enrolStudent) {
            return res.status(400).send("Error in the enrolstundent");
        }
        res.status(200).send("You Are enrolled sucessfully ");
    }
    catch (err) {
        console.log(err.message)
        res.status(404).send("some error in the enroll section of the coures " + err.message)
    }

}


const studenEnrollment = async (req, res) => {
    try {
        const userId = req.result._id;

        if (!userId) {
            return res.status(404).send("Id does not exist ")
        }

        // const enrolDetails = await Enrollement.find({ userId }).populate({path:"courseId", select:"BatchName className startDate timePeriods totalAmount totalDiscount finalPrice"});
        const enrolDetails = await Enrollement.find({ userId }).populate({path:"courseId"});

        if (!enrolDetails) {
            return res.status(404).send("Enrollment does not exist ")
        }

        res.status(200).json({
            message:"data found sucessfully",
            data:enrolDetails,
        });


    }
    catch (err) {
        res.status(404).send("some error to get sudent details" + err.message)
    }
}

const courseEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send("Id is not valid ");
        }
        const batchData = await Enrollement.find({ courseId: id }).populate({ path: 'userId', select: "fullName emailId phoneNumber" });
        if (!batchData) {
            return res.status(404).send("Id does not exist ");
        }
        const totalAmount = batchData.reduce((total, curr) => {
            return total + (curr.paymentAmount || 0);
        }, 0);

        const totalStudent = batchData.length;

        res.status(200).json({
            data: batchData,
            totalcollection: totalAmount,
            totalStudent: totalStudent
        });

    }
    catch (err) {
        res.status(404).send("Error in courseEnrollment " + err.message)
    }
}

// for admin uses 

const totalEnrollment = async (req, res) => {
    try {

        const allData = await Enrollement.find().populate({ path: 'userId', select: "fullName emailId phoneNumber" }).populate({ path: "courseId", select: "BatchName timePeriods" });

        if (!allData) {
            return res.status(404).send("Not able to fetch data")
        }

        const totalAmount = allData.reduce((total, curr) => {
            return total + (curr.paymentAmount || 0);
        }, 0)

        const totalStudent = allData.length;

        res.status(200).json({
            data: allData,
            totalcollection: totalAmount,
            totalStudent: totalStudent
        });


    }
    catch (err) {
        res.status(404).send("Error in Total enrolled student " + err.message)
    }
}






module.exports = { enrollNow, studenEnrollment, totalEnrollment, courseEnrollment };