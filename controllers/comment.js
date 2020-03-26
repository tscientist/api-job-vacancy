const Comment = require('../models').Comment;
const db = require('../models');

module.exports = {
    create(req, res) {
        db.Candidature.findOne({
            where: {
                id: req.params.candidatureId
            }
        })
            .then(function (candidature) {
                return Comment
                    .create({
                        candidatureId: req.params.candidatureId,
                        comment: req.body.comment,
                    })
                    .then(candidatureComment => res.status(201).send(candidatureComment))
                    .catch(err => res.status(400).send(err));
            })
        res.redirect('/'+ req.params.candidatureId)
    },


    allComments(req, res) {
        Comment.findAll({
            where: {
                candidatureId : req.params.candidatureId
            }
        })
        .then((comment) => {
            return res.status(200).json(comment)
        })
        .catch((error) => {
            return res.status(400).json(error)
        });
    },
}