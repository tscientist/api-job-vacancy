const User = require('../models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../models');
const { cpf } = require('cpf-cnpj-validator');

module.exports = {
    create(req, res) {
        if  (cpf.isValid(req.body.cpf)) {
            return User
                .create({
                    name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, saltRounds),
                    phoneNumber: req.body.phoneNumber, cpf: req.body.cpf, isAdmin: req.body.isAdmin
                })
                .then(user => res.status(201).send(user))
                .catch(err => res.status(400).send(err));
        }
        return res.status(400).json({
            "error": "Invalid CPF"
        })
    },
    login(req, res) {
        const email = req.body.email
        const password = req.body.password;
        const hash = bcrypt.hashSync(password, 10);
        const dcryptPassword = bcrypt.compareSync(password, hash); // this one was incorrect

        if (email && password) {
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(function (dbUser) {
                if (!dbUser || !dbUser.validPassword(password)) {
                    return res.json({
                        "data":"Incorrect email or password."
                    });
                }

                req.session.loggedin = true;
                req.session.email = email;
                req.session.userId = dbUser.id;
                req.session.admin = dbUser.isAdmin;

                res.redirect('/profile/'+ dbUser.id);
            })
        }
    },

    profile (req, res){
        if (req.params.id === req.session.userId) {
            res.status(201).send(user);
        } else {
            res.status(400).json({
                "error":"denied"
            });
        }
    },

    logout (req,res) {
        req.session.destroy()
            .then(res.redirect('/'))
            .catch(err => res.status(400).send(err));
    }
}


