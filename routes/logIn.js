const jwt = require('jsonwebtoken');
const passport = require('passport');

// Create a token for the user to authenticate
module.exports = (req, res, next) => {

    passport.authenticate('local', { session: false }, (err, user, info) => {

        if (err) return next(err);
        if (!user)
            return res.status(400).json({ message: info.message });

        req.login(user, { session: false }, err => {
            if (err) return next(err);
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({ user, token });
        });
        
    })(req, res, next);
};