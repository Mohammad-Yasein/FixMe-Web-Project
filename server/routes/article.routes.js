const ArticleController = require('../controllers/article.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.post('/api/articles', ArticleController.addArticle);
  app.get('/api/articles', ArticleController.getAllArticles);
  app.get('/api/articles/:id', ArticleController.getArticleById);
  app.put('/api/articles/:id', ArticleController.addComment);
};
