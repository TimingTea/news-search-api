const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser, logout } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const articleRouter = require('./articles');
const userRouter = require('./users');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const router = express.Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
}), login);


router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
}), createUser);


router.use(auth);
router.use(errors());
router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.use(requestLogger);
router.use(errorLogger);
router.use('/logout', logout);

router.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

module.exports = router;
