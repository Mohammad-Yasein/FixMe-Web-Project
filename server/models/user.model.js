const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'FIRST NAME IS REQUIRED!'],
      minLength: [2, 'FIRST NAME MUST BE AT LEAST TWO CHARACTERS LONG!'],
    },
    lastName: {
      type: String,
      required: [true, 'LAST NAME IS REQUIRED!'],
      minLength: [2, 'LAST NAME MUST BE AT LEAST TWO CHARACTERS LONG!'],
    },
    email: {
      type: String,
      required: [true, 'EMAIL IS REQUIRED!'],
      index: true,
      unique: true,
      validate: {
        validator: value => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(value),
        message: 'INVALID EMAIL FORMAT!',
      },
    },
    password: {
      type: String,
      required: [true, 'PASSWORD IS REQUIRED!'],
      minLength: [8, 'PASSWORD MUST BE AT LEAST EIGHT CHARACTERS LONG!'],
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: 'EMAIL ADDRESS IS IN USE!' });

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function (error, salt) {
    if (error) return next(error);
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) return next(error);
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
