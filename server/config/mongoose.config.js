const mongoose = require('mongoose');

module.exports = database => {
  mongoose
    .connect('mongodb://localhost/' + database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log('ESTABLISHED A CONNECTION TO THE DATABASE ' + database.toUpperCase() + ' ...'))
    .catch(error => console.log('SOMETHING WENT WRONG WHEN CONNECTING TO THE DATABASE!', error));
};
