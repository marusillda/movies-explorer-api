const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_CONFLICT,
} = require('node:http2').constants;
const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    // https://expressjs.com/en/guide/error-handling.html section: #The default error handler
    return next();
  }

  const isMongooseValidationError = err instanceof mongoose.Error.ValidationError;
  const isHttpBadRequestError = err.status === HTTP_STATUS_BAD_REQUEST;
  const isMongoError = err instanceof mongoose.mongo.MongoError;

  if (isMongooseValidationError || isHttpBadRequestError) {
    return res.status(HTTP_STATUS_BAD_REQUEST).json({
      message: err.message,
    });
  }

  if (isMongoError) {
    return res.status(HTTP_STATUS_CONFLICT).json({
      message: err.message,
    });
  }

  return res.status(err.status).json({
    message: err.status === HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : err.message,
  });
};

module.exports = errorHandler;
