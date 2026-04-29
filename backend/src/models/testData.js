const mongoose = require("mongoose");
const { Schema } = mongoose;

const testSchema = new Schema({
    TestName: {
        type: String,
        required: true,
    },

    ClassName: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    // 👉 Result behavior
    resultType: {
        type: String,
        enum: ["instant", "scheduled"],
        required: true
    },

    // 👉 Test availability
    scheduleType: {
        type: String,
        enum: ["anytime", "fixed"],
        required: true
    },

    // 👉 Timing control
    startTime: {
        type: Date
    },

    endTime: {
        type: Date
    },

    resultPublishTime: {
        type: Date
    },

    durationMinutes: {
        type: Number,
        required: true
    },

    // 👉 Paid or free test
    isPaid: {
        type: Boolean,
        default: false
    },

    // 👉 Admin control
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },

    // 👉 Questions
    questions: [
        {
            quest: {
                type: String,
                required: true,
            },

            option1: {
                type: String,
                required: true,
            },
            option2: {
                type: String,
                required: true,
            },
            option3: {
                type: String,
                required: true,
            },
            option4: {
                type: String,
                required: true,
            },

            answer: {
                type: String,
                enum: ["option1", "option2", "option3", "option4"],
                required: true
            },

            // 👉 Add marks system
            marks: {
                type: Number,
                default: 1
            },

            negativeMarks: {
                type: Number,
                default: 0
            }
        }
    ],

    // 👉 Who created the test
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

}, { timestamps: true });

const Test = mongoose.model('test', testSchema);

module.exports = Test;