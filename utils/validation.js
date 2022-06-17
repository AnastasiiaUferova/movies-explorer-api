const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const linkValidator = Joi.string().required().custom((value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Некорректная ссылка');
});

module.exports.validateChangeUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
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
    country: Joi.string().min(2),
    director: Joi.string().min(2),
    duration: Joi.number(),
    year: Joi.string().min(2),
    description: Joi.string().min(2),
    image: linkValidator,
    trailerLink: linkValidator,
    thumbnail: linkValidator,
    nameRU: Joi.string().min(2),
    nameEN: Joi.string().min(2),
    movieId: Joi.number(),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
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
