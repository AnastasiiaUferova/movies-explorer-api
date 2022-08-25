const { Movie } = require('../models/movie');
const BadRequestError = require('../errors/bad-request-400');
const NotFoundError = require('../errors/not-found-404');
const ForbiddenError = require('../errors/forbidden-403');

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN,
    thumbnail, movieId,
  } = req.body;
  Movie.create({
    owner: req.user._id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Incorrect data was passed when adding a movie.'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .orFail(() => new NotFoundError('A non-existent movie _id was passed.'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError("You cannot delete other people's movies."));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Movie was removed from the saved.' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Incorrect data was passed when deleting a movie.'));
      }
      return next(err);
    });
};
