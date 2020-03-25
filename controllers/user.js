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
                request.session.id = dbUser.id;

                response.redirect('/api/profile/'+ dbUser.id);
            })
        }
    },

    profile (request, response){
        console.log(request.session.email)
        db.User.findOne({
            where: {
                email: request.session.email
            }
        }).then(function (dbUser) {
            if (request.params.id == dbUser.id){
                console.log(request.params.id);
                response.send('Welcome back, ' + dbUser.name + '!');
            }else{
                res.json({status:"denied"});
            }
        }).catch(
            err => response.status(400).send(err)
        );
    },

    logout (req,res) {
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.send('Logout');
            // res.redirect('/jobs');
        });
    }
}


