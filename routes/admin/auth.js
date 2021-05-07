const router = require('express').Router();

const { signUp, login, signOut } = require('../../controllers/admin/user');
const { registrationValidator } = require('../../validators/user');

router.post('/sign-up', registrationValidator, signUp);
router.post('/login', login);
router.post('/sign-out', signOut);

module.exports = router;
