const {
  HTTP_STATUS_UNAUTHORIZED,
} = require('node:http2').constants;
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = '421b5fa29e2f3344c4' } = process.env;

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(createError(HTTP_STATUS_UNAUTHORIZED, 'Пользователь не авторизован'));
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return next(createError(HTTP_STATUS_UNAUTHORIZED, 'Пользователь не авторизован'));
  }
};

module.exports = auth;
