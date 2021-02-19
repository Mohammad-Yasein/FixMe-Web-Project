const jwt = require('jsonwebtoken');

module.exports.authenticate = (request, response, next) => {
  jwt.verify(request.cookies.token, process.env.SECRET_KEY, (error, payload) => {
    error ? response.status(401).json({ verified: false }) : next();
  });
};
