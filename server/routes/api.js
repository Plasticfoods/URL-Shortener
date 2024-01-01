const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })
const validateUrl = require('../utils/validateUrl')
const generateUniqueId = require('../utils/generateUniqueId')
const Url = require('../models/Url')
const express = require('express')
const router = express.Router()


// create short urls
router.post('/short-url', async (req, res) => {
    const { url } = req.body
    const clientUrl = process.env.BASE_URL

    // checking if the url is valid or not
    if(!validateUrl(url)) {
        res.status(400).json({message: 'Invalid URL'})
        return
    }
    
    try {
        // checking if original url is already present
        const urlDoc = await Url.findOne({ url })
        if(urlDoc) {
            const shortUrl = `${clientUrl}/${urlDoc.shortUrlId}`
            res.status(200).json({shortUrl: shortUrl, clicks: urlDoc.clicks})
            console.log('Url already present', shortUrl)
            return
        }
    
        // creating short url using nanoid
        const shortUrlId = await generateUniqueId()

        const newUrlDoc = new Url({
            url,
            shortUrlId,
            date: new Date()
        })
        await newUrlDoc.save()
        
        const shortUrl = `${clientUrl}/${shortUrlId}`
        res.status(200).json({shortUrl: shortUrl, clicks: 0})    
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
})  


module.exports = router
