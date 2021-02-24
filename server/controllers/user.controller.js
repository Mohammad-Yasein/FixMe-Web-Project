const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

module.exports.register = (request, response) => {
  User.create(request.body)
    .then(user => {
      const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

      response
        .cookie('token', userToken, { httpOnly: true })
        .json({
          message: 'SUCCESSFULLY REGISTERED!',
          userId: user._id,
          username: `${user.firstName} ${user.lastName}`,
        });
    })
    .catch(error => response.status(400).json(error));
};

module.exports.login = async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email: email });

  if (user == null) return response.sendStatus(400);

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) return response.sendStatus(400);

  const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

  response.cookie('token', userToken, { httpOnly: true }).json({
    message: 'SUCCESSFULLY LOGGED!',
    userId: user._id,
    username: `${user.firstName} ${user.lastName}`,
  });
};

module.exports.logout = (request, response) => {
  response.clearCookie('token');
  response.sendStatus(200);
};

module.exports.getUserById = (request, response) => {
  User.findOne({ _id: request.params.id })
    .then(user => response.json(user))
    .catch(error => response.status(400).json(error));
};

module.exports.updateUser = (request, response) => {
  User.findOneAndUpdate({ _id: request.params.id }, request.body, { runValidators: true })
    .then(user => response.json(user))
    .catch(error => response.status(400).json(error));
};
