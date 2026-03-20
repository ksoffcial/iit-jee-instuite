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


app.use(cors(
    {
        origin: ['http://localhost:5173',
            'https://iit-jee-instuite.vercel.app'],
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
