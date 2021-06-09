const { validationResult } = require('express-validator');
const { removeFile } = require('../helpers/removeFile');
const Category = require('../models/Category');
const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (err) {
        next(err);
    }
};

/**** Get Product By Slug **** */
exports.getProductsBySlug = async (req, res, next) => {
    const { slug } = req.params;
    try {
        const category = await Category.findOne({ slug: slug }).select('_id');
        console.log(category);
        if (!category) {
            next({
                status: 404,
                message: 'products not for this ' + slug,
            });
        }

        const products = await Product.find({ category: category._id });

        // if (products.length === 0) {
        //     next({
        //         status: 404,
        //         message: 'products not for this ' + slug,
        //     });
        // }

        res.status(200).send({
            products,
            productByPrice: {
                under5k: products.filter((product) => product.price <= 5000),
                under10k: products.filter(
                    (product) => product.price > 5000 && product.price <= 10000
                ),
                under20k: products.filter(
                    (product) => product.price > 10000 && product.price <= 20000
                ),
                under30k: products.filter(
                    (product) => product.price > 20000 && product.price <= 30000
                ),
            },
        });
    } catch (err) {
        next({
            status: 404,
            message: 'products not for this ' + slug,
        });
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
