const { check } = require('express-validator');
const Product = require('../models/Product');

const productValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Product name is required.')
        .trim(),
    check('price')
        .not()
        .isEmpty()
        .withMessage('Product price is required.')
        .isNumeric()
        .withMessage('Product price must be numeric.'),

    check('description')
        .not()
        .isEmpty()
        .withMessage('Product description is required.'),
];

module.exports = productValidator;
