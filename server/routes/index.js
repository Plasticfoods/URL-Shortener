const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })
const Url = require('../models/Url')
const express = require('express')
const router = express.Router()


// find and return original url
router.get('/:urlId', async (req, res) => {
    const {urlId} = req.params

    try {
        const urlObject = await Url.findOne({urlId})
        // checking if short url is present
        if(urlObject === null) {
            res.status(404).json({msg: 'No Url found'})
            return
        } 

        // redirect to the original url and $inc increase the clicks by 1
        await Url.findByIdAndUpdate(urlObject._id, { $inc: { "clicks" : 1 } })
        return res.status(200).redirect(urlObject.originalUrl)
    }
    catch(err) {
        console.log(err)
        res.status(500).json('Server Error')
    }
})


module.exports = router