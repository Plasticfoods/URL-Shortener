const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })
const Url = require('../models/Url')
const express = require('express')
const router = express.Router()


// find and return original url
router.get('/:shortUrlId', async (req, res) => {
    const { shortUrlId } = req.params

    try {
        const urlDoc = await Url.findOne({shortUrlId})
        // checking if short url is present
        if(urlDoc === null) {
            res.status(404).json({message: 'No Url found'})
            return
        } 

        // $inc increase the clicks by 1
        await Url.findByIdAndUpdate(urlDoc._id, { $inc: { "clicks" : 1 } })
        // redirect to the original url
        return res.status(200).redirect(urlDoc.url)
    }
    catch(err) {
        console.log(err)
        res.status(500).json('Server Error')
    }
})

router.get('/', (req, res) => {
    res.json({message: 'Success'})
})

module.exports = router