const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
        });
        res.status(201).send({
            message: 'Registration successfully.',
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('-password -__v');

        const isMatchPassword = bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(400).send({ message: 'Invalid Credentials' });
        }
        const token = user.getToken();

        res.status(200).send({
            message: 'Login Successful',
            data: user,
            token,
        });
    } catch (err) {
        console.log(err);
    }
};
