const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser } = require('../controllers/users');


userRouter.get('/me', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
}), getUser);


module.exports = userRouter;
