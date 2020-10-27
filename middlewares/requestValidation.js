const { celebrate, Joi } = require('celebrate');
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
    about: Joi.string().required().min(2).max(100),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    link: Joi.string().required().custom((value, helpers) => {
      if (!isURL(value)) return helpers.error('Невалидная ссылка');
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
    avatar: Joi.string().required().custom((value, helpers) => {
      if (!isURL(value)) return helpers.error('Невалидная ссылка');
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
