const jobController = require('../controllers').job;

module.exports = (app) => {

    // app.get('/jobsList', jobController.getAll);

    app.post('/admin/create', jobController.create)

};

