const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Shorten = new Schema({
    originalLink : String,
},{
    versionKey : false
})

module.exports = mongoose.model('Shorten', Shorten)