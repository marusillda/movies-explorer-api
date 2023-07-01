const {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_FORBIDDEN,
} = require('node:http2').constants;
const createError = require('http-errors');
const movieModel = require('../models/movie');
const asyncHandler = require('../middlewares/asyncHandler');

const getMovies = asyncHandler(async (req, res) => {
  const movies = await movieModel.find({}).sort('-createdAt');
  res.send(movies);
});

const deleteMovie = asyncHandler(async (req, res, next) => {
  const movie = await movieModel
    .findById(req.params.movieId)
    .orFail(() => next(createError(HTTP_STATUS_NOT_FOUND, 'Фильм не  найден')));
  if (movie.owner._id.toString() !== req.user._id) {
    return next(createError(HTTP_STATUS_FORBIDDEN, 'Нет прав на удаление фильма'));
  }
  await movieModel.deleteOne(movie);
  return res.send({});
});

const createMovie = asyncHandler(async (req, res) => {
  const newMovie = {
    ...req.body,
    owner: req.user._id,
  };
  const createdMovie = await movieModel.create(newMovie);
  res.status(HTTP_STATUS_CREATED).send(createdMovie);
});

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
