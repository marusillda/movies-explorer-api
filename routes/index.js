const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateRegistrationData, validateLoginData } = require('../middlewares/validate');
const notFoundPath = require('../middlewares/notFoundPath');

router.post('/signup', validateRegistrationData, createUser);
router.post('/signin', validateLoginData, loginUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use(auth, notFoundPath);

module.exports = router;
