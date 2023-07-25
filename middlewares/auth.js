const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const {
  HTTP_STATUS_UNAUTHORIZED,
} = require('node:http2').constants;
const {
  USER_NOT_AUTHORIZED,
} = require('../errorMessages');
const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(createError(HTTP_STATUS_UNAUTHORIZED, USER_NOT_AUTHORIZED));
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return next(createError(HTTP_STATUS_UNAUTHORIZED, USER_NOT_AUTHORIZED));
  }
};

module.exports = auth;
