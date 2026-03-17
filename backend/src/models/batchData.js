const mongoose = require("mongoose");
const { Schema } = require("mongoose");


const batchSchema = new Schema({
    BatchName: {
        type: String,
        required: true,
        minLenght: 5,
        maxLength: 30,

    },
    className: {
        type: String,
        enum: ["12th", "11th", "dropper", "jee", "neet"]
    },
    startDate: {
        type: String,
        required: true,
    },
    time: [
        {
            subject: {
                type: String,
                required: true,
            },
            subTime: {
                type: String,
                required: true
            }
        }
    ],
    subjects: [
        {
            subjectName: {
                type: String,
                required: true
            },
            teacherName: {
                type: String,
                required: true,
            }

        }
    ],
    description: {
        type: String,
        required: true,
        minLenght: 100,
        maxLength: 200,
    },
    timePeriods: {
        type: String,
        required: true
    }

}, { timestamps: true })

const Batch = mongoose.model("batch", batchSchema);

module.exports = Batch;