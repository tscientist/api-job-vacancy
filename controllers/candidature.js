const Candidature = require('../models').Candidature;
const Job = require('../models').Job;


module.exports = {

    create(req, res) {
        return Job.findOne({
            where: {
                id: req.params.jobId
            }
        })
            .then((job) => {
                if (job.userId != req.session.userId) {
                    return Candidature.findOne({
                        where: {
                            userId: req.session.userId
                        }
                    })
                        .then((candidature) => {
                            if (candidature) {
                                return res.status(401).json({
                                    error: "You have already applied for this job"
                                })
                            }

                            return Candidature
                                .create({
                                    jobId: req.params.jobId,
                                    adminId: job.userId,
                                    userId: req.session.userId,
                                })
                                .then(candidature => {
                                    return res.status(201).send(candidature)
                                })
                                .catch(err => res.status(400).send(err));

                        })
                        .catch(err => res.status(400).send(err));
                }
                return res.status(401).json({
                    error: "You cannot apply for your own job"
                })
            })
            .catch(err => res.status(400).send(err));
    },
    allCandidatures(req, res) {
        if (req.session.admin != 1) {
            return res.status(401).json({
                error: "You don't have permission to access the page you're trying to access"
            })
        }
        return Job.findOne({
            where: {
                id: req.params.jobId,
                userId: req.session.userId
            }
        })
            .then((job) => {
                return Candidature.findAll({
                    where: {
                        jobId: req.params.jobId
                    }
                })
                    .then(function (candidature) {
                        return res.status(200).send(candidature)
                    })

            })
            .catch((err) => {
                return res.status(400).json(err)
            });
    },
    showCandidature(req, res) {
        return Candidature.findOne({
            where: {
                id: req.params.candidatureId
            }
        })
            .then((candidature) => {
                if (candidature.adminId != req.session.userId) {
                    return res.redirect('/' + candidature.jobId)
                }
                return res.status(200).json(candidature)
            })
            .catch((err) => {
                return res.status(400).json(err)
            });
    },
    delete(req, res) {
        return Candidature.findOne({
            where: {
                userId: req.session.userId
            }
        })
            .then((candidature) => {
                if (candidature == null) {
                    return res.status(404).json({
                        "error": "Candidature not foud"
                    })
                }

                candidature.destroy()

                return res.status(200).json({
                    "message": "Candidature deleted"
                })
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    },
}