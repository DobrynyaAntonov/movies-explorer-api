const { logger } = require('./logger');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 500;
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = message;
  }
}
class UniqueError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = message;
  }
}

class PasswordError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = message;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  let error;
  console.log(err);
  if (err.statusCode === 404) {
    error = new NotFound('Пользователь или старница не найдены');
  } else if (err.name === 'CastError') {
    error = new ValidationError('Переданы некорректные данные');
  } else if (err.name === 'JsonWebTokenError') {
    error = new AuthError('У Вас нет прав для доступа к этой странице');
  } else if (err.message.includes('Validation failed')) {
    error = new ValidationError('Переданы некорректные данные');
  } else if (err.statusCode === 403) {
    error = new PasswordError('У вас нет прав для удаления этого фильма');
  } else if (err.statusCode === 401) {
    error = new AuthError('Вы ввели неправильный логин или пароль');
  } else if (err.code === 11000) {
    error = new UniqueError('Пользователь с таким email уже существует');
  } else {
    error = new ServerError('Внутренняя ошибка сервера');
  }

  logger('error.log', { error: error.message, date: new Date() });

  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = {
  errorHandler, NotFound, ServerError, ValidationError, PasswordError, AuthError,
};
