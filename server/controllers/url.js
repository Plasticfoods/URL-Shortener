const Url = require('../models/Url')
const validateUrl = require('../utils/validateUrl')
const generateUniqueId = require('../utils/generateUniqueId')

async function createShortUrl(req, res) {
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
}


async function redirectToOriginalUrl(req, res) {
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
}


async function deleteUrl(req, res) {
    const { url } = req.body
    console.log(url)
    try {
        const deletedUrl = await Url.deleteOne({url})
        if(deletedUrl.deletedCount == 0) {
            res.status(400).json({message: 'No such url found'})
            return
        }
        res.status(200).json({message: `Url ${url} deleted`})
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

module.exports = {
    createShortUrl,
    redirectToOriginalUrl,
    deleteUrl
}