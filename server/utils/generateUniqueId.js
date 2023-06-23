const {nanoid} = require('nanoid')
const Url = require('../models/Url')

module.exports = async () => {
    // const urlId = nanoid(6);
    let urlId = nanoid(6)
    while(true) {
        const urlObject = await Url.findOne({urlId})
        if(!urlObject) break;
        urlId = nanoid(6)
    }
    return urlId
}