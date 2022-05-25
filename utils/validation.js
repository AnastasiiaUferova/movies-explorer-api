const { celebrate, Joi } = require('celebrate');
const linkPettern = require('./constants');

module.exports.validateChangeUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    owner: Joi.string().length(24).hex().required(),
    country: Joi.string().min(2).max(30),
    director: Joi.string().min(2).max(30),
    duration: Joi.number(),
    year: Joi.string().min(2).max(30),
    description: Joi.string().min(2).max(30),
    image: Joi.string().required().pattern(linkPettern),
    trailerLink: Joi.string().required().pattern(linkPettern),
    thumbnail: Joi.string().required().pattern(linkPettern),
    nameRU: Joi.string().min(2).max(30),
    nameEN: Joi.string().min(2).max(30),
    movieId: Joi.number(),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
