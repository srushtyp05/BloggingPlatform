const router = require("express").Router()
const User = require("../model/user")
const bcrypt = require("bcrypt")

//register
router.post("/register", async(req,res) => {
    try{
        const salt= await bcrypt.genSalt(10) //password type
        const hashedPass= await bcrypt.hash(req.body.password, salt)

        const newUser= new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })
        
        const user= await newUser.save()
        res.status(200).json(user)
    } catch (error){
        res.status(500).json(error)
    }
})

//login
router.post("/login",async (req,res) =>{
    try{
        const user = await User.findOne({ username: req.body.username })

        //if user is not registered
        !user && res.status(400).json("User is not registered")

        //if username already exist then compare password
        const validate = await bcrypt.compare(req.body.password, user.password)

        //if not validate the password
        !validate && res.status(400).json("credentials are wrong")

        const { password, ...other } = user._doc
        res.status(200).json(other)
    } catch(error) {
        res.status(500).json(error)
    }
})
module.exports=router