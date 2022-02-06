const express = require('express')
const router = express.Router()
const ClientController = require('../app/Controllers/ClientController')


/// get method ///
router.get('/shorten', ClientController.shorten)
router.get('/:category', ClientController.category)
router.get('/shorten/:id', ClientController.shortenID)
router.get('/post/:id', ClientController.addView,ClientController.post)
router.get('/',ClientController.home)


module.exports = router