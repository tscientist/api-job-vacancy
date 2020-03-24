const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
var session = require('express-session');

// Set up the express app
const app = express();
// Log requests to the console.

app.use(logger('dev'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
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

require('./routes')(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;