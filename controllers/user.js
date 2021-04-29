const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res, next) => {
    try {
        const errors = validationResult(req).formatWith((err) => err.msg);
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: errors.errors[0]?.msg });
        }

        await User.create(req.body);
        res.status(201).send({
            message: 'Registration successfully.',
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, role: 'user' }).select('-__v');

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = user.getToken();

        const { name, phone } = user;

        res.status(200).send({
            message: 'Login Successful',
            user: { name, email: user.email, phone },
            token,
        });
    } catch (err) {
        console.log(err);
    }
};
