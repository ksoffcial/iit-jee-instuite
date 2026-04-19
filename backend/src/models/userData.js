const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        minLenght: 3,
        maxLength: 30
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    }
}, { timestamps: true });


const User = mongoose.model("user", userSchema);

module.exports = User;