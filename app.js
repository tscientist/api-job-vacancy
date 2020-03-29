const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 86400000 }
}))

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