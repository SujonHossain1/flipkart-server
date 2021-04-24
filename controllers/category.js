const Category = require('../models/Category');

exports.createCategory = async (req, res, next) => {
    try {
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

function getCategoriesList(categories, parentId = null) {
    const categoriesList = [];
    let category;

    if (parentId === null) {
        category = categories.filter(
            (category) => category.parentId == undefined
        );
    } else {
        category = categories.filter(
            (category) => category.parentId == parentId
        );
    }

    for (const cat of category) {
        categoriesList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: getCategoriesList(categories, cat._id),
        });
    }

    return categoriesList;
}
