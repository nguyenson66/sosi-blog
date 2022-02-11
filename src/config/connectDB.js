const mongoose = require('mongoose')

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_LOCAL)
        console.log('connect db successfully')
    } catch (error) {
        console.log('connect db fail')
        console.log(error)        
    }
}