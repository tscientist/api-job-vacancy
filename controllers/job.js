const Job = require('../models').Job;

module.exports = {

    index(req, res) {
        Job.findAll()
            .then((job) => {
                return res.status(200).json(job)
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    },
    create(req, res) {
        if (req.session.admin != 1){
            return res.status(401).json({
                error: "You don't have permission to access the page you're trying to access"
            })
        }

        return Job
                .create({
                    position: req.body.position,
                    description: req.body.description,
                    userId: req.session.userId,
                    salary: req.body.salary,
                    workload: req.body.workload,
                    benefits: req.body.benefits,
                    companyAddress: req.body.companyAddress,
                })
                .then(job => res.status(201).send(job))
                .catch(err => res.status(400).send(err))
    },
    showJob(req, res) {
        Job.findOne({
            where: {
                id: req.params.jobId
            }
            })
            .then((job) => {
            if (job == null)   return res.status(404).json({
                "error": "Job not foud"
            })
                return res.status(200).json(job)
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    },

    findJob(req, res) {
        Job.findOne({
            where: {
                position: req.params.position
            }
        })
            .then((job) => {
                if (job == null) {
                    return res.status(404).json({
                        "error": "Job not foud"
                    })
                }
                return res.status(200).json(job)
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    },

    delete(req, res) {
        return Job.findOne({
            where: {
                id: req.params.jobId,
                userId: req.session.userId
            }
        })
            .then((job) => {
                if (job == null) {
                    return res.status(400).json({
                        "error": "Something went wrong"
                    })
                }

                job.destroy()

                return res.status(200).json({
                    "message": "Job deleted"
                })
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    }
};
