const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { validateCreateMovieData, validateMovieIdParam } = require('../middlewares/validate');

router.get('/', getMovies);

router.post('/', validateCreateMovieData, createMovie);

router.delete('/:movieId', validateMovieIdParam, deleteMovie);

module.exports = router;
