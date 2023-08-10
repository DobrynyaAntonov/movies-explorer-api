const router = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');
const { getUserById, updateProfile } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, getUserById);

router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = router;
