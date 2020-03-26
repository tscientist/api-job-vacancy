const jobController = require('../controllers').job;

module.exports = (app) => {

    app.get('/', jobController.index);

    app.post('/admin/create', jobController.create)

};

