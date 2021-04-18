const { body } = require('express-validator');
const User = require('../models/User');

exports.registrationValidator = [
    body('name').not().isEmpty().withMessage('Name is required').trim(),
    body('email')
        .isEmail()
        .withMessage('Please Provide a valid E-mail')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                return Promise.reject('E-mail already in use');
            }
            return true;
        })
        .normalizeEmail(),

    body('phone')
        .not()
        .isEmpty()
        .withMessage('Phone Number is required')
        .isNumeric()
        .withMessage('Phone must be number')
        .matches(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)
        .withMessage('Phone Number Not Valid'),

    body('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
        .withMessage('Password must be at upper & lower case & digit 6'),

    body('confirmPassword')
        .not()
        .isEmpty()
        .withMessage('Confirm Password is required')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error('Confirm password not match');
            }
            return true;
        }),
];
