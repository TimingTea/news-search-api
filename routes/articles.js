const articleRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createArticle,
  getArticle,
  deleteArticle,
} = require('../controllers/articles');

articleRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
}), createArticle);

articleRouter.get('/', getArticle);

articleRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = articleRouter;
