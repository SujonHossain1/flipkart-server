const Product = require('../../models/Product');
const Category = require('../../models/Category');

exports.initialData = async (req, res, next) => {
    try {
        const products = await Product.find({}).select('-__v');
        const categories = await Category.find({}).select('-__v');

        res.status(200).send({
            products,
            categories,
        });
    } catch (error) {
        next({
            status: 400,
            message: error.message,
        });
    }
};
