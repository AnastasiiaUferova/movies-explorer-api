const router = require('express').Router();
const { validateDeleteMovie, validateCreateMovie } = require('../utils/validation');
const {
  deleteMovie, createMovie, getAllMovies,
} = require('../controllers/movies');

router.get('/movies', getAllMovies);

router.post('/movies', validateCreateMovie, createMovie);

router.delete('/movies/:_id', validateDeleteMovie, deleteMovie);

module.exports = router;
