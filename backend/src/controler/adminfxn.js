const User = require("../models/userData")


const getAllUser = async (req, res) => {
    try {
        const allData = await User.find().select("_id fullName emailId phoneNumber role");

        res.status(200).json({
            data: allData,
            msg: "all data found"
        });
    }
    catch (err) {
        res.status(500).send("Error occured in the admin section " + err.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).send('id is not defined ')
        }

        const deleteUser = await User.findByIdAndDelete(id)

        if (!deleteUser) {
            return res.status(404).send("user is not defined ")
        }

        res.status(200).send("user delelted sucessfully")

    }
    catch (err) {
        res.status(500).send("Error in delete user " + err.message)
    }
}



module.exports = { getAllUser,deleteUser}