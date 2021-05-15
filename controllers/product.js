const { validationResult } = require('express-validator');
const { removeFile } = require('../helpers/removeFile');
const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req).formatWith((err) => err.msg);
        if (!errors.isEmpty()) {
            removeFile(req.file.filename);
            return res.status(400).send(errors.mapped());
        }

        const product = await Product.create({
            ...req.body,
            image: req.filename,
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.createProductWithImages = async (req, res, next) => {
    try {
        const errors = validationResult(req).formatWith((err) => err.msg);
        if (!errors.isEmpty()) {
            req.files?.map((image) => {
                removeFile(image.filename);
            });
            return res
                .status(400)
                .send(errors.mapped({ error: errors.errors[0]?.msg }));
        }

        const images = req.files?.map((file) => file.filename);

        const product = await Product.create({
            ...req.body,
            createdBy: req.admin._id,
            images: images,
        });

        res.status(201).send({
            message: 'Product created Successfully!',
            product: product,
        });
    } catch (err) {
        req.files?.map((image) => {
            removeFile(image.filename);
        });
        next(err);
    }
};
