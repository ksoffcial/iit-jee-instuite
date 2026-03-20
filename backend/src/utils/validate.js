var validator = require('validator');


const validateData = (data) => {
    if (!data) {
        throw new Error("Data is not coming.......");
    }

    const maditoryField = ["fullName", "emailId", "password", "phoneNumber"];
    const isAllowed = maditoryField.every((k) => Object.keys(data).includes(k))

    if (!isAllowed) {
        throw new Error("All filed are required to fill");
    }

    if (!validator.isEmail(data.emailId)) {
        throw new Error("Email is not correct....")
    }

    if (!validator.isStrongPassword(data.password)) {
        throw new Error("password is not correct....")
    }

    if (!validator.isMobilePhone(data.phoneNumber, 'en-IN')) {
        throw new Error("please enter the valid mobile number")
    }
}

const batchValidator = (data) => {

    if (!data) {
        throw new Error("Data not avaible ");
    }

    const maditoryField = ["BatchName", "className", "time", "subjects", "description", "timePeriods"];

    const isAllowed = maditoryField.every((k) => Object.keys(data).includes(k))

    if (!isAllowed) {
        throw new Error("All filed are required to fill");
    }

}

const testValidator =(data)=>{
   if(!data){
    throw new Error("data is not avaible from the client side")

    const maditoryField = ["TestName","ClassName","question"]

    const isAllowed = maditoryField.every((k)=>Object.keys(data).includes(k))

    if(!isAllowed){
        throw new Error("All field are required")
    }
   }
}


module.exports = {validateData, batchValidator, testValidator};