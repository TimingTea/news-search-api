const Article = require('../models/article');
const NotFoundError = require('../errors/not-found');
const ForbiddenError = require('../errors/forbidden');

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send(article))
    .catch(next);
};

const getArticle = (req, res, next) => {
  Article.find({})
    .then((article) => res.send(article))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(new NotFoundError(`Карточки с таким id  ${req.params.articleId} не существует`))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError('Доступ запрещен, нельзя удалить карточку другого пользователя');
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
