const mongoose = require("mongoose");
const { Schema } = require("mongoose")

const testSchema = new Schema({
    TestName: {
        type: String,
        required: true,
    },
    ClassName: {
        type: String,
        required: true,
    },
    questions:[
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
                enum: ["option1", "option2", "option3", "option4"]
            }
        }
    ]
},{timestamps:true})

const Test = mongoose.model('test',testSchema);

module.exports = Test;