const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')
const routes = require('./routes')
const db = require('./config/connectDB')
require('dotenv').config()
const socket = require('./config/socket')

///// config use json, url, public folder and views ejs
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(cookieParser());

// view ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname+'//views'))


// socket
socket(io)

// connect to database
db.connectDB()


/// all routes project
routes(app)


server.listen(80, () => console.log('server is running'))