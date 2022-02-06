const router = require('express').Router()
const AdminController = require('../app/Controllers/AdminController')


//////// GET method //////////
router.get('/add-post', AdminController.AddPost)
router.get('/list-post', AdminController.ListPost)

/////// POST method /////////
router.post('/add-post', AdminController.AddPost_POST)

module.exports = router