const User = require('../models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../models');

module.exports = {
    create(req, res) {
        return User
            .create({
                name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, saltRounds),
                phoneNumber: req.body.phoneNumber, cpf: req.body.cpf, isAdmin: req.body.isAdmin
            })
            .then(user => res.status(201).send(user))
            .catch(err => res.status(400).send(err));
    },
    login(request, response) {
        const email = request.body.email
        const password = request.body.password;
        const hash = bcrypt.hashSync(password, 10);
        const dcryptPassword = bcrypt.compareSync(password, hash); // this one was incorrect

        if (email && password) {
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(function (dbUser) {
                if (!dbUser || !dbUser.validPassword(password)) {
                    return response.json({
                        "data":"Incorrect email or password."
                    });
                }

                request.session.loggedin = true;
                request.session.email = email;
                request.session.userId = dbUser.id;
                request.session.admin = dbUser.isAdmin;

                response.redirect('/profile/'+ dbUser.id);
            })
        }
    },

    profile (request, response){
        if (request.params.id == request.session.userId) {
            console.log(request.params.id);
            response.send('Welcome back, ' + request.session.email + '!');
        } else {
            response.json({status:"denied"});
        }
    },

    logout (req,res) {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            // res.send('Logout');
            res.redirect('/');
        });
    }
}


