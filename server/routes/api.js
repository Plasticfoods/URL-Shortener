const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })
const validateUrl = require('../utils/validateUrl')
const generateUniqueId = require('../utils/generateUniqueId')
const Url = require('../models/Url')
const express = require('express')
const router = express.Router()


// create short urls
router.post('/short-url', async (req, res) => {
    const { fullUrl } = req.body
    const base = process.env.BASE_URL

    // checking if the url is valid or not
    if(!validateUrl(fullUrl)) {
        res.status(400).json({msg: 'Invalid url'})
        return
    }
    
    try {
        // checking if original url is already present
        const urlObject = await Url.findOne({originalUrl: fullUrl})
        if(urlObject) {
            const shortUrl = `${base}/${urlObject.urlId}`
            res.status(200).json({shortUrl: shortUrl, clicks: urlObject.clicks})
            console.log('Url already present', base)
            return
        }
    
        // creating short url using nanoid
        const urlId = await generateUniqueId()
        console.log(urlId)
        const newUrl = new Url({
            originalUrl: fullUrl,
            urlId,
            date: new Date()
        })
        await newUrl.save()
        console.log('New short url created', base)
        const shortUrl = `${base}/${urlId}`
        res.status(200).json({shortUrl: shortUrl, clicks: 1})    
    }
    catch(err) {
        console.log(err)
        res.status(500).json('Server Error')
    }
})  


module.exports = router
