const router = require('express').Router();
const { createCategory, getCategories } = require('../controllers/category');
const { adminIsAuth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', getCategories);
router.post('/', adminIsAuth, upload.single('categoryImage'), createCategory);

module.exports = router;
