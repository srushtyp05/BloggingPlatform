const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute=require("./routes/auth")
const authUser=require("./routes/user") //update profile
const authPost=require("./routes/post") //post
const authCat=require("./routes/categories") // categories

dotenv.config()
app.use(express.json())

mongoose
.connect(process.env.CONNECTION_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Connected to MongoDb"))
.catch((err) => console.log(err))

app.use("/auth",authRoute)
app.use("/users", authUser) //update profile
app.use("/post", authPost)  //post
app.use("/category", authCat)  //category

app.listen("5000",() =>{
    console.log("backend running")
})