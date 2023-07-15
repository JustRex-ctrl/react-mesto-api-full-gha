const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/NotAuthError');
const { setSecretKey } = require('./secretKey');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') next();
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, setSecretKey());
  } catch (err) {
    next(new NotAuthError('Токен некорректен'));
  }
  req.user = payload;
  next();
};
