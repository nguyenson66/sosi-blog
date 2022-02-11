const Post = require('../Models/Post')
const Shorten = require('../Models/Shorten')


// add view when someone visits
exports.addView = async (req,res,next) => {
    let id = req.params.id.split('.')
    id = id[id.length-1]

    try {
        let post = await Post.findById(id)
        post.views += 1
        req.body.post = post
        post.save()
        next()
    } catch (error) {
        res.json({status : 400})
    }
}

//[GET] /
exports.home = async (req,res) => {

    try {
        const trendingPost = await Post.find({}).select('_id background title value').sort({views : 'desc'}).limit(10)
        const nroPost = await Post.find({category : 'ngoc rong online lau'}).select('_id background title value').sort({views : 'desc'}).limit(10)
        const nsoPost = await Post.find({category : 'ninja school online lau'}).select('_id background title value').sort({views : 'desc'}).limit(10)
        const monneyPost = await Post.find({category : 'kiem tien online'}).select('_id background title value').sort({views : 'desc'}).limit(10)
        
        // res.json([trendingPost, gamePost, newPost, monneyPost])

        res.render('home',{
            trendingPost,
            nroPost,
            nsoPost,
            monneyPost
        })
    } catch (error) {
        console.log(error)
    }
}

//[GET] /shorten
exports.shorten = async (req,res) => {
    res.json('shortend')
}

//[GET] /:category?order=&by=
exports.category = async (req,res) => {
    const list_category = ['ngoc rong online lau','ninja school online lau','thu thuat','ung dung','game','kiem tien online']
    let order = 'asc'
    let by = 'title'
    let posts = []
    let category = req.params.category.split('-')

    category = category.join(' ')

    if(list_category.includes(category)){
        
        if(req.query.order !== undefined) 
            order = req.query.order
        
        if(req.query.by !== undefined)
            by = req.query.by
    
        if(by == 'views'){
            posts = await Post.find({category}).select('_id background title value').sort({views : order})
        }
        else if(by == 'title'){
            posts = await Post.find({category}).select('_id background title value').sort({title : order})
        }
        else {
            posts = await Post.find({category}).select('_id background title value').sort({created_at : order})
        }
    
        // res.json(posts)
        res.render('listPost', {
            title : category.toUpperCase(),
            posts
        })
    }
    else {
        res.status(404).json('404 not found')
    }
}

//[GET] /post/:id
exports.post = async (req,res) => {
    const post = req.body.post
    let similarPost = []

    try {

        similarPost = await Post.find({category : post.category})
            .select('_id background title value')
            .sort({views : 'desc'})
            .limit(5)
        
    } catch (error) {
        console.log(error)
    }

    // res.json({
    //     post,
    //     similarPost
    // })

    res.render('post', {
        title : post.title.toUpperCase(),
        post,
        similarPost
    })
}

//[GET] /shorten
exports.shorten = (req,res) => {

}

//[GET] /shorten/:id
exports.shortenID = async (req, res) => {
    res.render('shortenID',{
        id : req.params.id
    })
}