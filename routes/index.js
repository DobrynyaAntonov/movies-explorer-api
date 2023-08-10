const router = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFound } = require('../middlewares/error');
const { apiLogger } = require('../middlewares/logger');

router.use(apiLogger);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.post('/signout', (req, res) => {
  res.clearCookie('jwt', { sameSite: 'None', secure: true }).send({ message: 'Кука успешно удалена' });
});

router.use('/*', (req, res, next) => {
  next(new NotFound('Маршрут не найден'));
});
module.exports = router;
