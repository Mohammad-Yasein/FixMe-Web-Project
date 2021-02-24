const Article = require('../models/article.model');

module.exports.addArticle = (request, response) => {
  Article.create(request.body)
    .then(article => response.json(article))
    .catch(error => response.status(400).json(error));
};

module.exports.getAllArticles = (request, response) => {
  Article.find({})
    .then(articles => response.json(articles))
    .catch(error => response.status(400).json(error));
};

module.exports.getArticleById = (request, response) => {
  Article.findOne({ _id: request.params.id })
    .then(article => response.json(article))
    .catch(error => response.status(400).json(error));
};

module.exports.addComment = async (request, response) => {
  const article = await Article.findOne({ _id: request.params.id });

  if (article == null) {
    return response.sendStatus(400);
  }

  article.comments.push(request.body);
  article.save().then(article => response.json(article));
};

