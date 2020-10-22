const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

console.log(JWT_SECRET);

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new UnauthorizedError({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};

module.exports = auth;
