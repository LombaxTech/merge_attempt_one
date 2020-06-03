const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcrypt')
const User = require('../models/user');

exports.signup = async (req, res) => {
    try {
        let { email, name, password, role } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10)
        let user = new User({
            email,
            name,
            password: hashedPassword,
            role
        });
        user = await user.save();
        res.json(user);
    } catch (error) {
        res.send(`error of: ${error}`);
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'user not found' });

        if (!(await bcrypt.compare(password, user.password))) {
            return res.json({ error: "email and password dont match" });
        }

        const token = jwt.sign({ _id: user._id }, 'mySecretKey');
        res.cookie('testCookie', token, { expire: new Date() + 9999 });
        return res.json({
            token,
            user: { _id: user._id, name: user.name, email: user.email, role: user.role }
        })
    } catch (error) {
        return res.json({ error })
    }
}

exports.signout = (req, res) => {
    res.clearCookie('testCookie');
    return res.json({ message: 'successfully signed out' });
}

// makes it so you need token 
exports.requireSignin = expressJwt({
    secret: 'mySecretKey',
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
    let auth = req.profile && req.auth && req.auth._id == req.profile._id;
    if (!auth) return res.status(403).json({ error: `access denied` });
    next();
}

exports.userById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) return res.status(400).json({ error: `no user` });
        req.profile = user;
        next();
    } catch (error) {
        return res.status(400).json({ error: `error of ${error}` });
    }
}

exports.isTutor = (req, res, next) => {
    if (req.profile.role === 0) return res.status(403).json({ error: 'tutors only' });
    next();
}