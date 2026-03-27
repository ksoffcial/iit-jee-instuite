const User = require("../models/userData");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateData } = require("../utils/validate");




const registerUser = async (req, res) => {
    try {
        validateData(req.body)
        req.body.role = 'user';
        const { fullName, emailId, password, gender } = req.body;
        const hashPass = await bcrypt.hash(password, 10)
        req.body.password = hashPass;
        const newUser = await User.create(req.body);

        const reply = {
            fullName: newUser.fullName,
            emailId: newUser.emailId,
            _id: newUser._id,
            role: newUser.role
        }

        const token = jwt.sign({ _id: newUser._id, emailId: newUser.emailId, role: newUser.role }, process.env.PRIVATE_KEY, { expiresIn: 3600 })
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 3600 * 1000 })

        res.status(200).json({
            user: reply,
            message: "User Register sucessfully"
        })

    }
    catch (err) {
        res.status(404).send("some error in register user" + err.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        if (!phoneNumber) {
            throw new Error("Invalid crendentials")
        }

        if (!password) {
            throw new Error("Invalid crendentials")
        }

        const user = await User.findOne({ phoneNumber: phoneNumber });

        if (!user) {
            return res.status(404).send("User is does not exist...")
        }

        const validatePass = await bcrypt.compare(password, user.password)

        if (!validatePass) {
            return res.status(400).send("Invalide crendintials")
        }

        const token = jwt.sign({ _id: user._id, emailId: user.emailId, role: user.role }, process.env.PRIVATE_KEY, { expiresIn: 3600 })
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 3600 * 1000 })


        const reply = {
            fullName: user.fullName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role
        }

        res.status(200).json(
            {
                user: reply,
                message: "User login sucessfully "
            }
        )

    }
    catch (err) {
        res.status(500).send('some error occured in login :- ' + err.message)
    }
}


const logOut = (req, res) => {
    try {
        res.cookie("token", null, { httpOnly: true, secure: true, sameSite: "none", expires: new Date(Date.now()) })
        res.send("logout sucesfully ")
    }
    catch (err) {
        res.send("NOt Logout till now" + err.message)
    }
}

module.exports = { registerUser, loginUser, logOut }