const userRouter = require('express').Router();
const { getUser } = require('../controllers/users');
const { logout } = require('../controllers/users');

userRouter.get('/me', getUser);
userRouter.post('/', logout);

module.exports = userRouter;
