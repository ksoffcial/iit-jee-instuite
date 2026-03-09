const mongoose = require("mongoose");
require("dotenv").config();

const main = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_KEY);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed:", error.message);
    }
};

module.exports = main;