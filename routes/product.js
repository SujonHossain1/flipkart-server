const router = require('express').Router();
const {
    createProduct,
    createProductWithImages,
    getProducts,
} = require('../controllers/product');
const { adminIsAuth } = require('../middlewares/auth');
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
    adminIsAuth,
    upload.array('images'),
    productValidator,
    createProductWithImages
);

module.exports = router;
