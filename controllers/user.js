const User = require('../models').User;
const Candidature = require('../models').Candidature;
const Job = require('../models').Job;
const Sessions = require('../models').Sessions;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {cpf} = require('cpf-cnpj-validator');
const {cnpj} = require('cpf-cnpj-validator');

module.exports = {
    create(req, res) {
        if (cpf.isValid(req.body.document) || cnpj.isValid(req.body.document)) {
            return User
                .create({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, saltRounds),
                    phoneNumber: req.body.phoneNumber,
                    document: req.body.document,
                    isAdmin: req.body.isAdmin,
                    address: req.body.address,
                    description: req.body.description
                })
                .then(user => res.status(201).send(user))
                .catch(err => res.status(400).send(err));
        }
        return res.status(400).json({
            "error": "Invalid document"
        })
    },
    login(req, res) {
        if (req.body.email && req.body.password) {
            User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(function (user) {
                if (!user || !user.validPassword(req.body.password)) {
                    return res.json({
                        "error": "Incorrect email or password."
                    });
                }

                Sessions.create({
                    token: bcrypt.hashSync(user.email + user.id + new Date().getTime().toString(), saltRounds),
                    userId: user.id
                })
                    .then(session => {
                        return res.status(200).json({token: session.token});
                    })
            })
                .catch(() => res.status(400).json({
                        "error": "Incorrect email or password"
                    })
                );
        }
    },
    profile(req, res) {
        return User.findOne({
            where: {
                id: req.session.userId
            }
        })
            .then(user => {
                res.status(200).send(user)
            })
            .catch(err => res.status(400).send(err));

    },
    findUser(req, res) {
        User.findOne({
            where: {
                name: req.params.name
            }
        })
            .then((user) => {
                if (user == null) return res.status(404).json({
                    "error": "User not found"
                })
                return res.status(200).json({
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    description: user.description
                })
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    },
    update(req, res) {
        if (!req.session.userId) return res.redirect('/')

        User.findOne({
            where: {
                id: req.session.userId
            }
        })
            .then(user => {
                allowedParams = [
                    "name",
                    "password",
                    "phoneNumber",
                    "address",
                    "description"
                ];

                for (param in req.body) {
                    if (allowedParams.includes(param)) {
                        if (param == "password") {
                            user[param] = bcrypt.hashSync(req.body[param], saltRounds)
                        } else {
                            user[param] = req.body[param]
                        }
                    }
                }
                user.save()
                return res.redirect('/profile')
            });

        return res.status(406)
    },
    delete(req, res) {
        return User.findOne({
            where: {
                id: req.session.userId
            }
        })
            .then((user) => {
                if (user == null) {
                    return res.status(404).json({
                        "error": "User not found"
                    })
                }
                user.destroy()
                return res.status(200).json({
                    "message": "User deleted"
                })
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    },

    logout(req, res) {
        Sessions.destroy({
            where: {
                userId: req.session.userId
            }
        });

        req.session.destroy();

        return res.status(401).json({
            error: "You have been logged out"
        })
    }
};



