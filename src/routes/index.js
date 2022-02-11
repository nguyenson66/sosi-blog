const client = require('./client')
const admin = require('./admin')

function routes(app) {
    app.use('/admin', admin)
    app.use('', client)

    app.use(function(req, res, next) {
        res.status(404);
      
        // respond with html page
        if (req.accepts('html')) {
          // res.render('404', { url: req.url });
          res.json('not found')
          return;
        }
      
        // respond with json
        if (req.accepts('json')) {
          res.json({ error: 'Not found' });
          return;
        }
      
        // default to plain-text. send()
        res.type('txt').send('Not found');
      });
}

module.exports = routes