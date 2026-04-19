const mongoose = require("mongoose")
const { Schema } = require("mongoose");

const enrolledSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch"
    }
    ,
    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    }
})

const Enrollement = mongoose.model('enrolled', enrolledSchema)

module.exports = Enrollement;