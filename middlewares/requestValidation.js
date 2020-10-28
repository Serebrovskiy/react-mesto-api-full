const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL } = require('validator');

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
  }),
});

module.exports = {
  validateUser,
  validateUserUpdate,
  validateCard,
  validateId,
  validateAvatar,
};
