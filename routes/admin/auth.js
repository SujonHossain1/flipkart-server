const router = require('express').Router();

const { signUp, login } = require('../../controllers/admin/user');
const { registrationValidator } = require('../../validators/user');

router.post('/sign-up', registrationValidator, signUp);
router.post('/login', login);

module.exports = router;
