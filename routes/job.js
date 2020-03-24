const Job = require('../controllers').Job;

module.exports = (app) => {
    // app.post('/api/:userId/jobUser', Job.create)
    app.get('/api/jobsList', Job.getAll);
    // app.get('/:jobId', jobsController.getById);
    // app.put('/:userId/:jobId', jobsController.updateById);
    // router.delete('/:jobId', jobsController.deleteById);
};

