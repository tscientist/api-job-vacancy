const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const session = require('express-session');

// Set up the express app
const app = express();
// Log requests to the console.

app.use(logger('dev'));
app.use(session({
    cookie: { maxAge: (600000*2),
        secure: false
    },
    secret: 'keyboard cat'
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Models
const models = require('./models');

//Sync db
models.sequelize.sync().then(function () {
    console.log('Database connected')
}).catch(function (err) {
    console.log(err, "Something went wrong with the db connection")
});

require('./routes/user')(app);
require('./routes/job')(app);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;