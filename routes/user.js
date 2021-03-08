const passport = require('passport');

module.exports = [
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user);
    },
];