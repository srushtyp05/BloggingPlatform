const router = require("express").Router()
const Category = require("../model/Category")

// create comment

router.post("/",async (req,res) =>{
    const newCat = new Category(req.body)
    try {
        const saveCat = await newCat.save()
        res.status(200).json(saveCat)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router