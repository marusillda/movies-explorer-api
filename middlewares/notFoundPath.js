const {
  HTTP_STATUS_NOT_FOUND,
} = require('node:http2').constants;
const createError = require('http-errors');
const {
  PATH_NOT_FOUND,
} = require('../errorMessages');

const notFoundPath = (req, res, next) => {
  next(createError(HTTP_STATUS_NOT_FOUND, PATH_NOT_FOUND));
};

module.exports = notFoundPath;
