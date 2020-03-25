const userController = require('../controllers').user;

module.exports = (app) => {
    app.post('/createUser', userController.create)

    app.post('/login', userController.login);

    app.get('/profile/:id', userController.profile);

    app.get('/logout', userController.logout);
};