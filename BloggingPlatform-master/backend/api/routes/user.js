const router = require("express").Router()
const User = require("../model/user")
const Post = require("../model/post")
const Comment = require("../model/comment")
const bcrypt = require("bcrypt")

//to update profile
router.put("/:id",async (req,res) =>{
    if(req.body.userId === req.params.id) {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.passsword = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body
                },{
                    new: true, //this is just for postman
                }
            )
            res.status(200).json(updateUser)
        } catch (error){
            res.status(500).json(error)
        }
    }else{
        res.status(401).json("Update your account")
    }
})

//to delete 
router.delete("/:id",async (req,res) =>{
    if(req.body.userId == req.params.id){
        //delete all post of user and user account
        try{
            const user = await User.findById(req.params.id)
            try{
                await Post.deleteMany({username:user.username})

                await User.findByIdAndDelete(req.params.id)  //only for deleting user
                res.status(200).json("User is deleted!!")
            } catch(error){
                res.status(500).json(error)
            }
        }catch(error){
            res.status(404).json("User is not found!!") //user is already deleted
        }
    }else{
        res.status(401).json("You can only delete your account") //can only delete account
    }
})

//to get user
router.get("/:id",async(req,res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(400).json(other)
    }
})

module.exports = router