const validateUrl = require('../utils/validateUrl')
const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })
const Url = require('../models/Url')
const express = require('express')
const { nanoid } = require('nanoid')
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

    // checking if short url is already present
    const urlObject = await Url.findOne({originalUrl: fullUrl})
    if(urlObject) {
        const shortUrl = `${base}/${urlObject.urlId}`
        res.status(200).json({msg: shortUrl, clicks: urlObject.clicks})
        console.log('Url already present')
        return
    }

    // creating short url using nanoid
    const urlId = nanoid(6)
    const newUrl = new Url({
        originalUrl: fullUrl,
        urlId,
    })
    await newUrl.save()
    console.log('Short Url created')
    const shortUrl = `${base}/${urlId}`
    res.status(200).json({msg: shortUrl, clicks: 1})
})  

module.exports = router
