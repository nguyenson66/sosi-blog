const moment = require('moment')
const Post = require('../Models/Post')
const Shorten = require('../Models/Shorten')

function convertStringToArray(object) {
    return (typeof(object) === 'string')?Array(object) : object
}


/////////// GET method ///////////////
//[GET] /admin/add-post
exports.AddPost = (req,res) => {
    res.render('addPost')
}

//[GET] /admin/list-post
exports.ListPost = async (req,res) => {

    let order = 'asc'
    let by = 'title'
    
    if(req.query.by != undefined){
        by = req.query.by
    }
    if(req.query.order != undefined){
        order = req.query.order
    }

    let listPost = []

    /////// query have condition
    if(req.query.category === undefined)
    {
        if(by == 'views'){
            listPost = await Post.find({}).sort({views : order})
        }
        else if(by == 'title') {
            listPost = await Post.find({}).sort({title : order})
        }
        else {
            listPost = await Post.find({}).sort({created_at : order})
        }
    }
    else
    {
        const category = req.query.category
        if(by == 'views'){
            listPost = await Post.find({category}).sort({views : order})
        }
        else if(by == 'title') {
            listPost = await Post.find({category}).sort({title : order})
        }
        else {
            listPost = await Post.find({category}).sort({created_at : order})
        }
    }

    res.json(listPost)
}


/////////// POST method //////////////
//[POST] /admin/add-post
exports.AddPost_POST = async (req,res) => {
    
    const title = req.body.title
    const background = req.body.background
    const type = convertStringToArray(req.body.type)
    const value = convertStringToArray(req.body.value)
    const category = req.body.category
    const tag = req.body.tag
    const titleLink = convertStringToArray(req.body.titleLink)
    const keyLink = convertStringToArray(req.body.keyLink)
    const valueLink = convertStringToArray(req.body.valueLink)
    const views = 0
    const created_at = moment().utcOffset(420).format('DD/MM/YYYY hh:mm')

    for(let i=0;i<valueLink.length;i++){
        const shorten = new Shorten({
            originalLink : valueLink[i]
        })

        const newLink = await shorten.save()
        
        valueLink[i] = 'http://sositech.xyz/shorten/' + newLink._id
    }

    const post = new Post({
        title,
        background,
        type,
        value,
        category,
        tag,
        titleLink,
        keyLink,
        valueLink,
        views,
        created_at
    })

    post.save()

    res.redirect('/admin/list-post')
}