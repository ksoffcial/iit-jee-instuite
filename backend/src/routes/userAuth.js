const express = require("express");
const { registerUser, loginUser, logOut } = require("../controler/userfxn");
const userMiddleware = require("../middleware/userMiddleware");
const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser)
authRouter.post('/logout', userMiddleware, logOut)
authRouter.get('/check', userMiddleware, (req, res) => {
    const reply = {
        fullName: req.result.fullName,
        emailId: req.result.emailId,
        _id: req.result._id,
        role: req.result.role,
    }

    try {
        res.status(200).json({
            user: reply,
            message: "Valide User"
        })

    }
    catch (err) {
        console.log("error occured in check url " + err.message)
        res.status(500).send("error occured in check url " + err.message)
    }
})



module.exports = authRouter;
