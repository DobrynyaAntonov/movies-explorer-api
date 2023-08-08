const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Превышено ограничение запросов. Пожалуйста, попробуйте позже.',
});

module.exports = limiter;
