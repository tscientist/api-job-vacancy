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
    },
    authenticate(req, res) {
        console.log(
            User.findOne({
            where: {email: req.body.email}
        }));
        User.findOne({
            where: {email: req.body.email}
        })
        .then(result => {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                const token = jwt.sign({id: result._id}, req.app.get('secretKey'), {expiresIn: '1h'});
                return res.json({status:"success", message: "user found!!!", data:{user: result, token:token}});
            }
        }).catch(err => {
            return err;
        })
    }
}
