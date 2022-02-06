const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    title : String,
    background : String,
    type : [String],
    value : [String],
    category : String,
    tag : String,
    titleLink : [String],
    keyLink : [String],
    valueLink : [String],
    views : {type : Number, default : 0},
    created_at : String
}, {versionKey : false})

// title=&avatar=&select+type=text&value=&
//tag=&category=thu+thuat&titleLink=&keyLink=&valueLink=

module.exports = mongoose.model('Post', Post)