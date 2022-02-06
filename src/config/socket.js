const Shorten = require('../app/Models/Shorten')

function socket(io) {

    io.on('connection', socket => {

        // on request shorten link
        socket.on('shorten', (shortenID) => {
            let timeDown = 9

            countTimeDown()

            async function countTimeDown() {
                if(timeDown >= 0){
                    timeDown -= 1
                    setTimeout(countTimeDown,1000)
                }
                else{
                    try {
                        const shorten = await Shorten.findById(shortenID)
                        const originalLink = shorten.originalLink

                        io.emit('shorten-status', originalLink)
                    } catch (error) {
                        console.log(error.message)
                        const status = 400
                        io.emit('shorten-status', status)
                    }
                }
            }
        })



        socket.on('disconnect' , () => {
    
        })
    })

}

module.exports = socket