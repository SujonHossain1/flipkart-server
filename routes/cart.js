const router = require('express').Router();
const { addItemToCart } = require('../controllers/cart');
const { userIsAuth } = require('../middlewares/auth');

router.post('/add-to-cart', userIsAuth, addItemToCart);

module.exports = router;
