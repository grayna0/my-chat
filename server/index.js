const express= require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
app.use(cors())
require("dotenv").config()


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connection success");
}).catch (err => {
    console.log(err.message,"22");
})


const server = app.listen(process.env.PORT, () =>{
    console.log("server listening on port " + process.env.PORT);
})