const userRouter = require('express').Router();

const { signUp, login } = require('../controllers/user');
const { registrationValidator } = require('../validators/user');

userRouter.post('/sign-up', registrationValidator, signUp);
userRouter.post('/login', login);

module.exports = userRouter;
