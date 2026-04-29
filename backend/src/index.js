const express = require("express");
const authRouter = require("./routes/userAuth");
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const main = require("./dbConnector/db");
const redisClient = require("./dbConnector/redis");
const cors = require('cors');
const adminRouter = require("./routes/adminRoute");
const batchRouter = require("./routes/batchroute");
const testRouter = require("./routes/testSection");
const aiRouter = require("./routes/ai");
const mentorRouter = require("./routes/mentorRoute");
const eRouter = require("./routes/enquiryRoute");
const enrollRouter = require("./routes/enrollCourse");


app.use(cors(
    {
        origin: ['http://localhost:5173',
            'https://iit-jee-instuite.vercel.app',
            'https://rakeshphysics.com'],

        credentials: true
    }
))



app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));




app.use("/user", authRouter);
app.use("/admin", adminRouter);
app.use("/batch", batchRouter);
app.use("/test", testRouter)
app.use("/ai", aiRouter)
app.use("/mentor", mentorRouter)
app.use("/query",eRouter)
app.use("/enroll",enrollRouter)




const startConnection = async () => {
    try {
        await Promise.all([main(), redisClient.connect()])
        console.log("DataBase is connected sucessfully....")
        app.listen(process.env.PORT_NUM, () => {
            console.log(process.env.PORT_NUM);
            console.log("port is Listening ....")
        })
    }
    catch (err) {
        console.log("Some error occured in the connection  " + err.message)
    }
}

startConnection();
