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
                        .then(candidatureComment => {
                            return res.status(201).send(candidatureComment)
                        })
                        .catch(err => res.status(400).send(err));
                }
                return res.redirect('/candidature/' + req.params.candidatureId)
            })
            .catch(err => {
                return res.status(400).json(err)
            });
    },
    allComments(req, res) {
        Candidature.findOne({
            where: {
                id: req.params.candidatureId
            }
        })
            .then((candidature) => {
                if (candidature.adminId == req.session.userId) {
                    return Comment.findAll({
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
                return res.redirect('/candidature/' + candidature.jobId)

            })
            .catch(err => {
                return res.status(400).json(err)
            })

    }
}