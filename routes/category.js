const router = require('express').Router();
const { createCategory, getCategories } = require('../controllers/category');
const { adminIsAuth } = require('../middlewares/auth');

router.get('/', getCategories);
router.post('/', adminIsAuth, createCategory);

module.exports = router;
