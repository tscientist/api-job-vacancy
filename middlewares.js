const Sessions = require('./models').Sessions;
const User = require('./models').User;

module.exports = {
    isAuthenticated: function (req, res, next) {
        if (!req.headers.token) {
            return res.status(401).json({
                error: "Please Log in/Register to view this page"
            });
        }
        return Sessions.findOne({
            where: {
                token: req.headers.token
            }
        })
            .then(authenticated => {
                if (authenticated) {
                    req.session.userId = authenticated.userId

                    return User.findOne({
                        where: {
                            id: req.session.userId
                        }
                    }).then(user => {
                        if (user == null){
                            return res.status(401).json({
                                error: "Please Log in/Register to view this page"
                            })
                        }
                        req.session.admin = user.isAdmin
                        return next()
                    })
                }
                return res.status(401).json({
                    error: "Please Log in/Register to view this page"
                })
            })
            .catch(err => res.status(401).json(err))

    }
};