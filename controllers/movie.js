const Movie = require('../models/movie');
const { NotFound, PasswordError } = require('../middlewares/error');

const getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).json(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Передан несуществующий _id фильма');
      }
      if (movie.owner.toString() !== userId) {
        throw new PasswordError('У вас нет прав для удаления этого фильма');
      }

      return Movie.findByIdAndRemove(movieId);
    })
    .then((deletedMovie) => {
      if (!deletedMovie) {
        throw new NotFound('Фильм не найден');
      }
      res.status(200).send({ message: 'Фильм успешно удален' });
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movies) => res.status(201).send(movies))
    .catch(next);
};

module.exports = {
  getMovie,
  deleteMovie,
  createMovie,
};
