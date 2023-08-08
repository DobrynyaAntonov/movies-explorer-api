const router = require('express').Router();

const {
  getMovie, deleteMovie, createMovie,
} = require('../controllers/movie');
const auth = require('../middlewares/auth');

router.get('/', getMovie);

router.post('/', createMovie);

router.delete('/:movieId', auth, deleteMovie);

module.exports = router;
