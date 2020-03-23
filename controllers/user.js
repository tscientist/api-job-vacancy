const User = require('../models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    create(req, res) {
        return User
            .create({
                name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, saltRounds),
                phoneNumber: req.body.phoneNumber, cpf: req.body.cpf, isAdmin: req.body.isAdmin
            })
            .then(user => res.status(201).send(user))
            .catch(err => res.status(400).send(err));
    }
}