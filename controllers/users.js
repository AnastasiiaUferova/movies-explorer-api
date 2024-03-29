const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models/user');
const BadRequestError = require('../errors/bad-request-400');
const NotFoundError = require('../errors/not-found-404');
const ConflictError = require('../errors/conflict-409');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('User by specified _id not found.'));
      }
      return res.send(data);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send(
        {
          name: user.name, email: user.email, _id: user.id,
        },
      );
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Incorrect data passed during user creation.'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('User with this email already exists.'));
      }
      return next(err);
    });
};

module.exports.changeUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      }
      if (!user) {
        next(new NotFoundError('The user with the specified _id was not found.'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid data passed when updating profile.'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('User with this email already exists.'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res
        .send({ token });
    })
    .catch(next);
};
