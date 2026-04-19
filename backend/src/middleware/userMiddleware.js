const jwt = require("jsonwebtoken")
const redisClient = require("../dbConnector/redis")
const User = require("../models/userData")



const userMiddleware = async (req, res,next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(500).send("Token does not exist")
        }

        const payload = jwt.verify(token, process.env.PRIVATE_KEY)

        const { _id } = payload;

        if (!_id) {
            throw new Error("invalide token")
        }

        const result = await User.findById(_id);

        if (!result) {
            throw new Error("User not exist")
        }

        const isBlocked = await redisClient.exists(`token:${token}`)

        if (isBlocked) {
            throw new Error("Invalid Token")
        }

        req.result = result
        next()

    }
    catch (err) {
        res.status(500).send("Error occured in user middleware " + err.message)
    }

}

module.exports = userMiddleware;