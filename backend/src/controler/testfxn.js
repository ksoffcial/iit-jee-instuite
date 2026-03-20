const Test = require("../models/testData");
const { testValidator } = require("../utils/validate");


const createTest = async (req, res) => {
    try {
        const data = req.body;
        testValidator(data);
        const test = await Test.create(data)

        res.status(200).send("test has created ")
    }
    catch (err) {
        res.status(404).send("Error in the Create Test " + err.message)
    }
}

const deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Test.findByIdAndDelete(id)
        res.status(200).send(" test is Deleted sucessfully ")
    }
    catch (err) {
        res.status(404).send("Error in the delete Test " + err.message)
    }
}

const getAllTest = async (req,res) =>{
    try{
        const testData = await Test.find().select("_id TestName ClassName questions");
        res.status(200).send(testData)

    }
    catch(err){
        res.status(404).send("not found data" + err.message)
    }
}

module.exports = { createTest, deleteTest,getAllTest  };