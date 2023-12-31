const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value),
      message: 'Некорректный формат URL-адреса',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value),
      message: 'Некорректный формат URL-адреса',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value),
      message: 'Некорректный формат URL-адреса',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
