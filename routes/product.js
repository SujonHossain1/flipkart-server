const router = require('express').Router();
const {
    createProduct,
    createProductWithImages,
    getProducts,
} = require('../controllers/product');
const upload = require('../middlewares/upload');
const productValidator = require('../validators/product');

router.get('/', getProducts);

router.post(
    '/add-product',
    upload.single('image'),
    productValidator,
    createProduct
);
router.post(
    '/add-product-images',
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'gallery', maxCount: 4 },
    ]),
    productValidator,
    createProductWithImages
);

module.exports = router;
