const User = require("../models/userData")


const getAllUser = async (req,res) => {
    try {
        const allData = await User.find().select("_id fullName emailId phoneNumber role");
      
        res.status(200).json({
            data:allData,
            msg:"all data found"
        });
    }
    catch (err) {
        res.status(500).send("Error occured in the admin section " + err.message)
    }
}



module.exports = {getAllUser}