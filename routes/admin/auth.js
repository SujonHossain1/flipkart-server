const router = require('express').Router();

const { signUp, login, signOut } = require('../../controllers/admin/user');
const { adminIsAuth } = require('../../middlewares/auth');
const { registrationValidator } = require('../../validators/user');

router.post('/sign-up', registrationValidator, signUp);
router.post('/login', login);
router.post('/sign-out', adminIsAuth, signOut);

module.exports = router;
