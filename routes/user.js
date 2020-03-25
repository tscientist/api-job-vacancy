const userController = require('../controllers').user;
// const session = require('express-session');
const User = require('../models').User;


module.exports = (app) => {
    app.post('/api/createUser', userController.create)

    app.post('/api/login', userController.login);

    app.get('/api/profile/:id', userController.profile);
};