const jobController = require('../controllers').job;
const candidatureController = require('../controllers').candidature;
const commentController = require('../controllers').comment;
const userController = require('../controllers').user;
const middlewares = require("../middlewares")

module.exports = (app) => {

    app.get('/', jobController.index);

    app.post('/admin/create', middlewares.isAuthenticated, jobController.create)

    app.get('/job/:jobId', jobController.showJob)

    app.get('/position/:position', jobController.findJob)

    app.get('/users/:name', middlewares.isAuthenticated, userController.findUser)

    app.get('/:jobId/candidatures', middlewares.isAuthenticated, candidatureController.allCandidatures)

    app.get('/candidature/:candidatureId', middlewares.isAuthenticated, candidatureController.showCandidature)

    app.get('/job/:jobId/delete', middlewares.isAuthenticated, jobController.delete)

    app.post('/:candidatureId/comment', middlewares.isAuthenticated, commentController.create)

    app.get('/:candidatureId/comments', middlewares.isAuthenticated, commentController.allComments)

};

