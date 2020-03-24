const userController = require('../controllers').user;

module.exports = (app) => {
    app.post('/api/createUser', userController.create)

    app.post('/api/authenticate', userController.authenticate)

};