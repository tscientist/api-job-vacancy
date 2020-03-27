const Comment = require('../models').Comment;
const Candidature = require('../models').Candidature;

module.exports = {
    /**
     * TODO error candidature not found
     * @param req
     * @param res
     */
    create(req, res) {
        Candidature.findOne({
            where: {
                id: req.params.candidatureId
            }
        })
            .then((candidature) => {
                if (candidature.adminId == req.session.userId) {
                    return Comment
                        .create({
                            candidatureId: req.params.candidatureId,
                            comment: req.body.comment,
                        })
                        .then(candidatureComment => res.status(201).send(candidatureComment))
                        .catch(err => res.status(400).send(err));
                }
            })
        res.redirect('/' + req.params.candidatureId)
    },
    allComments(req, res) {
        Candidature.findOne({
            where: {
                id: req.params.candidatureId
            }
        })
            .then((candidature) => {
                if (candidature.adminId != req.session.userId) return res.redirect('/' + candidature.jobId)
            })

        Comment.findAll({
            where: {
                candidatureId: req.params.candidatureId
            }
        })
            .then((comment) => {
                return res.status(200).json(comment)
            })
            .catch((err) => {
                return res.status(400).json(err)
            });
    }
}