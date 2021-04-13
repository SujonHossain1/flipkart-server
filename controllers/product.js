const { validationResult } = require('express-validator');
const { removeFile } = require('../helpers/removeFile');
const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req).formatWith((err) => err.msg);
        if (!errors.isEmpty()) {
            console.log(req.file);
            console.log(req.files);
            removeFile(req.file.filename);
            return res.status(400).send(errors.mapped());
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.createProductWithImages = (req, res, next) => {
    try {
        const errors = validationResult(req).formatWith((err) => err.msg);
        if (!errors.isEmpty()) {
            req.files.image?.map((image) => {
                removeFile(image.filename);
            });
            req.files.gallery?.map((image) => {
                removeFile(image.filename);
            });
            return res.status(400).send(errors.mapped());
        }

        res.send(req.body);
    } catch (err) {
        next(err);
    }
};
