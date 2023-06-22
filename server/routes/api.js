const validateUrl = require('../utils/validateUrl')
const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })
const Url = require('../models/Url')
const express = require('express')
const router = express.Router()
const base = process.env.BASE_URL


router.post('/short-url', (req, res) => {
    const { fullUrl } = req.body
    console.log('base url'+', '+base+', '+fullUrl+', '+process.env.PORT)
    res.send(base)
})  

module.exports = router
