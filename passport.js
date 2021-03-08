const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

// Handle username & password sign in
passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
    },
    async (username, password, done) => {
        const user = await User.findOne({ username, password }).catch(done);
        if (!user)
            return done(null, false, { message: 'Incorrect email or password.' });

        return done(null, user);
    }
));

// Handle jwt authentication
passport.use(new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
        const user = await User.findById(jwtPayload.id).catch(done);
        return done(null, user);
    }
));