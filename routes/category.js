const router = require('express').Router();
const { createCategory, getCategories } = require('../controllers/category');
const { adminIsAuth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', getCategories);
router.post('/', adminIsAuth, upload.single('image'), createCategory);

module.exports = router;
