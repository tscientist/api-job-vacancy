const Candidature = require('../models').Candidature;
const Job = require('../models').Job;


module.exports = {
    /**
     * TODO: error de job not found
     * @param req
     * @param res
     */
    create(req, res) {
        Job.findOne({
            where: {
                id: req.params.jobId
            }
        })
            .then(function (job) {
                if (job.userId != req.session.userId) {
                    return Candidature
                        .create({
                            jobId: job.id,
                            adminId: job.userId,
                            userId: req.session.userId,
                        })
                        .then(candidature => res.status(201).send(candidature))
                        .catch(err => res.status(400).send(err));
                }
            })
        res.redirect('/' + req.params.jobId)
    },
    allCandidatures(req, res) {
        Candidature.findAll({
            where: {
                jobId: req.params.jobId
            }
        })
            .then((candidature) => {
                return res.status(200).json(candidature)
            })
            .catch((err) => {
                return res.status(400).json(err)
            });
    },
    showCandidature(req, res) {
        Candidature.findOne({
            where: {
                candidatureId: req.params.candidatureId
            }
        })
            .then((candidature) => {
                if (candidature.adminId == req.session.userId) {
                    return res.status(200).json(candidature)
                }
                return res.redirect('/' + candidature.jobId)
            })
            .catch((err) => {
                return res.status(400).json(err)
            });
    }
}