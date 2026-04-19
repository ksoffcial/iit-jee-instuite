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

const makeAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send("Id is not defined ")
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).send("User does not exist ")
        }

        if (user.role === 'admin') {
            return res.status(400).send("User is already an admin");
        }
        user.role = 'admin';

        await user.save()

        res.send("User converted into the admin")

    }
    catch (err) {
        res.status(500).send("error in create admin " + err.message)
    }
}


module.exports = { getAllUser, deleteUser,makeAdmin}