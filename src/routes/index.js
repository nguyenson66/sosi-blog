const client = require('./client')
const admin = require('./admin')

function routes(app) {
    app.use('/admin', admin)
    app.use('', client)
}

module.exports = routes