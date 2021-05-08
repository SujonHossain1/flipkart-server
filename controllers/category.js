const getCategoriesList = require('../helpers/category');
const Category = require('../models/Category');

exports.createCategory = async (req, res, next) => {
    try {
        console.log(req.body);
        const { name, slug, parentId } = req.body;
        let categoryObj = { name, slug };

        if (req.file) {
            categoryObj.image = process.env.API + 'public/' + req.file.filename;
        }

        if (parentId) {
            categoryObj.parentId = parentId;
        }

        const category = await Category.create(categoryObj);
        res.status(201).send({
            message: 'Category created successfully',
            category: category,
        });
    } catch (err) {
        next({
            status: 400,
            message: err.message,
        });
    }
};

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        const categoryList = getCategoriesList(categories);

        res.status(200).send({ categories: categoryList });
    } catch (err) {
        next({
            status: 404,
            message: err.message,
        });
    }
};
