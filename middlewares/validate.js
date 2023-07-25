const { celebrate, Joi } = require('celebrate');

const linkRegexp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

const validateRegistrationData = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(6),
    }),
  },
);

const validateLoginData = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  },
);

const validateProfileData = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  },
);

const validateCreateMovieData = celebrate(
  {
    body: Joi.object().keys({
      country: Joi.string()
        .required(),
      director: Joi.string()
        .required(),
      duration: Joi.number()
        .required(),
      year: Joi.string()
        .required(),
      description: Joi.string()
        .required(),
      image: Joi.string()
        .pattern(linkRegexp)
        .required(),
      trailerLink: Joi.string()
        .pattern(linkRegexp)
        .required(),
      thumbnail: Joi.string()
        .pattern(linkRegexp)
        .required(),
      movieId: Joi.number()
        .required(),
      nameRU: Joi.string()
        .required(),
      nameEN: Joi.string()
        .required(),
    }),
  },
);

const validateMovieIdParam = celebrate(
  {
    params: Joi.object().keys({
      movieId: Joi.string()
        .length(24)
        .hex()
        .required(),
    }),
  },
);

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateProfileData,
  validateCreateMovieData,
  validateMovieIdParam,
};
