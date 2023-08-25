const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const {
  validateSignUp, validateSignIn,
} = require('../utils/validation');
const {
  login, createUser,
} = require('../controllers/users');
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);
router.use(auth);
router.use(usersRouter);
router.use(cardsRouter);

router.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
