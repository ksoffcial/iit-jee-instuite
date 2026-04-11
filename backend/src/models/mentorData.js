const mongoose = require("mongoose");
const { Schema } = require("mongoose"); 


const mentorSchema = new Schema({
    mentorName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: "String",
        required: true,
    },
    subject: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experince: {
        type: String,
        required: true,
    },
    contactNumber:{
        type:String,
        required:true,
        unique:true
    }

}, { timestamps: true })

const Mentor = mongoose.model('mentor', mentorSchema);

module.exports = Mentor;