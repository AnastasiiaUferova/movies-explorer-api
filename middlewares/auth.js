const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../errors/unauthorized-401');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization is required.');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
  } catch (err) {
    throw new UnauthorizedError('Authorization is required.');
  }

  req.user = payload;

  return next();
};
