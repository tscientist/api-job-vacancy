const jobController = require('../controllers').job;
const candidatureController = require('../controllers').candidature;
const commentController = require('../controllers').comment;
const middlewares = require("../middlewares")

module.exports = (app) => {

    app.get('/', jobController.index);

    app.post('/admin/create', middlewares.isAuthenticated, jobController.create)

    app.get('/job/:jobId', jobController.showJob)

    app.get('/job/:position', jobController.findJob)

    app.get('/:jobId/apply', middlewares.isAuthenticated, candidatureController.create)

    app.get('/job/:jobId/delete', middlewares.isAuthenticated, jobController.delete)

    app.get('/:jobId/applications', middlewares.isAuthenticated, candidatureController.allCandidatures)

    app.get('/candidature/:candidatureId', middlewares.isAuthenticated, candidatureController.showCandidature)

    app.post('/:candidatureId/comment', middlewares.isAuthenticated, commentController.create)

    app.get('/:candidatureId/comments', middlewares.isAuthenticated, commentController.allComments)

    app.get('/:candidatureId/delete', middlewares.isAuthenticated, candidatureController.delete)
};

