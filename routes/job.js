const jobController = require('../controllers').job;
const candidatureController = require('../controllers').candidature;

module.exports = (app) => {

    app.get('/', jobController.index);

    app.post('/admin/create', jobController.create)

    app.get('/:jobId', jobController.showJob)

    app.post('/:jobId/apply', candidatureController.create)

    app.get('/:jobId/candidatures', candidatureController.allCandidatures)

};

