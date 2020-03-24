const userController = require('../controllers').user;
// const session = require('express-session');
const User = require('../models').User;


module.exports = (app) => {
    app.post('/api/createUser', userController.create)

    // app.post('/api/authenticate', userController.authenticate)

    app.post('/api/auth', userController.authenticate);

    app.get('/api/profile', function(request, response) {
        console.log(request.);
        if (request.name) {
            response.send('Welcome back, ' + request.session.username + '!');
        } else {
            response.send('Please login to view this page!');
        }
        response.end();
    });
};