const { check } = require('express-validator');
const Product = require('../models/Product');

const productValidator = [
	check('title').not().isEmpty().withMessage('Product Title is required.'),
	check('price')
		.not()
		.isEmpty()
		.withMessage('Product price is required.')
		.isNumeric()
		.withMessage('Product price must be numeric.'),

	check('stock')
		.not()
		.isEmpty()
		.withMessage('Product stock quantity is required.'),

	check('description')
		.not()
		.isEmpty()
		.withMessage('Product description is required.'),
];

module.exports = productValidator;
