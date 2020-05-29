const userRouter = require('express').Router();
const { getUser } = require('../controllers/users');


userRouter.get('/me', getUser);


module.exports = userRouter;
