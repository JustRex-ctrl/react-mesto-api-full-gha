const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/NotAuthError');
// const { setSecretKey } = require('./secretKey');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') next();
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new NotAuthError('Токен некорректен'));
  }
  req.user = payload;
  next();
};
