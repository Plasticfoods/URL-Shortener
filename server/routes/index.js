const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })
const express = require('express')
const router = express.Router()
const urlController = require('../controllers/url') 


// create short url
router.post('/', urlController.createShortUrl)

// find and redirect to original url
router.get('/:shortUrlId', urlController.redirectToOriginalUrl)

// delete single url
router.delete('/', urlController.deleteUrl)

router.get('/', (req, res) => {
    res.json({message: 'Success'})
})

module.exports = router