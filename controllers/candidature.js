const Candidature = require('../models').Candidature;
const Job = require('../models').Job;
const db = require('../models');

module.exports = {
    create(req, res) {
        db.Job.findOne({
            where: {
                id: req.params.jobId
            }
        })
        .then(function (job) {
            return Candidature
                .create({
                    jobId: job.id,
                    adminId: job.userId,
                    userId: req.session.userId,
                })
                .then(candidature => res.status(201).send(candidature))
                .catch(err => res.status(400).send(err));
        })
        res.redirect('/'+ req.params.jobId)
    },
    allCandidatures(req, res) {
        Candidature.findAll({
            where: {
                jobId : req.params.jobId
            }
        })
            .then((candidature) => {
                return res.status(200).json(candidature)
            })
            .catch((error) => {
                return res.status(400).json(error)
            });
    },
    showCandidature(req, res) {
        Candidature.findOne({
            where: {
                candidatureId : req.params.candidatureId
            }
        })
            .then((candidature) => {
                return res.status(200).json(candidature)
            })
            .catch((error) => {
                return res.status(400).json(error)
            });

    },

    /**
     * TODO: criar função buscar job no banco
     * @param jobId
     */
    getJob(jobId) {
        db.Job.findOne({
            where: {
                id: jobId
            }
        }).then(function (job) {
            return job
        })
        .catch(err => res.status(400).send(err));
    }
}