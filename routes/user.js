const userController = require('../controllers').user;
const candidatureController = require('../controllers').candidature;
const jobController = require('../controllers').job;
const middlewares = require("../middlewares")

module.exports = (app) => {

    app.post('/createUser', userController.create)

    app.post('/login', userController.login);

    app.get('/profile', middlewares.isAuthenticated, userController.profile);

    app.get('/users/:name', middlewares.isAuthenticated, userController.findUser)

    app.get('/logout', middlewares.isAuthenticated, userController.logout);

    app.get('/:jobId/apply', middlewares.isAuthenticated, candidatureController.create)

    app.get('/:candidatureId/delete', middlewares.isAuthenticated, candidatureController.delete)

    app.post('/profile/update', middlewares.isAuthenticated, userController.update);

    app.get('/profile/delete', middlewares.isAuthenticated, userController.delete);

};