const userController = require('../controllers').user;

module.exports = (app) => {
    app.get('/api', (req, res) => status(200).send({
        message: 'API'
    }));

    app.post('/api/createUser', userController.create)
};