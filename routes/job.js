const jobController = require('../controllers').job;
const candidatureController = require('../controllers').candidature;
const commentController = require('../controllers').comment;

module.exports = (app) => {

    app.get('/', jobController.index);

    app.post('/admin/create', jobController.create)

    app.get('/:jobId', jobController.showJob)

    app.get('/:jobId/apply', candidatureController.create)

    app.get('/:jobId/candidatures', candidatureController.allCandidatures)

    app.get('/:candidatureId', candidatureController.showCandidature)

    app.post('/:candidatureId/comment', commentController.create)

    app.get('/:candidatureId/comments', commentController.allComments)

};

