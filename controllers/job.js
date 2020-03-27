const Job = require('../models').Job;

module.exports = {
    /**
     * TODO error de permissao not admin
     * @param req
     * @param res
     * @returns {Promise<T>}
     */
    create(req, res) {
        if (req.session.admin === 1) {
            return Job
                .create({
                    position: req.body.position,
                    description: req.body.description,
                    userId: req.session.userId,
                    salary: req.body.salary
                })
                .then(job => res.status(201).send(job))
                .catch(err => res.status(400).send(err));
        }
        res.redirect('/profile/' + req.session.userId);
    },
    index(req, res) {
        Job.findAll()
            .then((job) => {
                return res.status(200).json(job)
            })
            .catch((err) => {
                return res.status(400).json(err)
            });
    },
    showJob(req, res) {
        Job.findOne({
            where: {
                id: req.params.jobId
            }
        })
            .then((job) => {
                return res.status(200).json(job)
            })
            .catch((err) => {
                return res.status(400).json(err)
            });
    },
    update(req, res) {
        Job.findOne({
            where: {
                id: req.params.jobId
            }
        })
            .then(function (job) {
                job.update()
            })
    },
    delete(req, res) {
        Job.findOne({
            where: {
                id: req.params.jobId
            }
        })
            .then(function (job) {
                job.destroy()
            })
            .catch((err) => {
                return res.status(400).json(err)
            });
    },
}
