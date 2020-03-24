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
    authenticate(request, response) {
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
                if (!dbUser) {
                    return done(null, false, {
                        message: "Incorrect email."
                    });
                } else if (!dbUser.validPassword(password)) {
                    return done(null, false, {
                        message: "Incorrect password."
                    });
                }
                return response.redirect('/api/profile').send(dbUser);
                // return response.redi(201).send(dbUser);

            })
        }
    }

        //     'SELECT * FROM users WHERE email = ? AND password = ?', [email, dcryptPassword], function(error, results, fields) {
        //         if (results.length > 0) {
        //             request.session.loggedin = true;
        //             request.session.email = email;
        //             response.redirect('/api/profile');
        //         } else {
        //             response.send('Incorrect email and/or Password!');
        //         }
        //         response.end();
        //     });
        // } else {
        //     response.send('Please enter email and Password!');
        //     response.end();
        // }
    }


