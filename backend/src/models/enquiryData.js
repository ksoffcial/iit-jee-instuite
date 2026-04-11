const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const enquirySchema = new Schema({
    studenName:{
        type:String,
        required:true
    },
    standard:{
        type:String,
        enum:["9th","10th","11th","12th"],
        required:true,
        
    },
    contactNumber:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true
    },
    batchDetails:{
        type:String,
        enum:["9th","10th","11th","12th","dropper"],
        required:true
    },
    batchStatus:{
        type:String,
        enum:["running","upcoming"]
    },
    desc:{
        type:String,
    },
   
},{timestamps:true})


const Enquiry = mongoose.model('enquiryData', enquirySchema);

module.exports = Enquiry;