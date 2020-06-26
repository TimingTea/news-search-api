const Article = require('../models/article');
const NotFoundError = require('../errors/not-found');
const ForbiddenError = require('../errors/forbidden');

const createArticle = (req, res, next) => {
  Article.create({
    keyword: escape(req.body.keyword),
    title: escape(req.body.title),
    text: escape(req.body.text),
    date: escape(req.body.date),
    source: escape(req.body.source),
    link: req.body.link,
    image: req.body.image,
    owner: req.user._id,
  })
    .then((article) => {
      res.status(201).send({
        status: '201',
        data: {
          id: article._id,
          keyword: article.keyword,
          title: article.title,
          text: article.text,
          date: article.date,
          source: article.source,
          link: article.link,
          image: article.image,
        },
      });
    })
    .catch((err) => next(new NotFoundError(err.message)));
};

const getArticle = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ status: '200', data: articles }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(new NotFoundError(`Статьи с таким id  ${req.params.articleId} не существует`))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError('Доступ запрещен, нельзя удалить статью другого пользователя');
      }
      return Article.deleteOne(article)
        .then(() => res.send({ data: article }));
    })
    .catch(next);
};

module.exports = {
  createArticle,
  getArticle,
  deleteArticle,
};
