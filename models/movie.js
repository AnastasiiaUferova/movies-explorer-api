const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    required: true,
  },
  duration: {
    type: Number,
    minlength: 2,
    required: true,
  },
  year: {
    type: String,
    minlength: 2,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [validator.isURL, 'A valid link is required.'],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [validator.isURL, 'A valid link is required.'],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [validator.isURL, 'A valid link is required.'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    minlength: 2,
    required: true,
  },
  nameEN: {
    type: String,
    minlength: 2,
    required: true,
  },
});

exports.Movie = mongoose.model('movie', movieSchema);
