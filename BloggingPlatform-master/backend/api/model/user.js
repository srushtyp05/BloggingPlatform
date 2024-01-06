const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
   username :{
    type: String,
    require: true,
    unique: true,
   },
   email:{
    type: String,
    require: true,
    unique: true,
   },
   password:{
    type: String,
    require: true,
   },
   registrationDate:{
    type: Date,
    default: Date.now, //it sets the default value to the current date and time
   },
},{
    timestamps: true,
})
module.exports = mongoose.model("User", UserSchema)