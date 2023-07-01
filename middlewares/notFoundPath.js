const {
  HTTP_STATUS_NOT_FOUND,
} = require('node:http2').constants;
const createError = require('http-errors');

const notFoundPath = (req, res, next) => {
  next(createError(HTTP_STATUS_NOT_FOUND, 'Запрошенный путь не найден'));
};

module.exports = notFoundPath;
