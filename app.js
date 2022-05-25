const bodyParser = require('body-parser');
require('dotenv').config();
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-404');
const { validateCreateUser, validateLogin } = require('./utils/validation');
const { errorHandler } = require('./middlewares/errorHandler');
const apiLimiter = require('./middlewares/rateLimit');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

app.use(cors);

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

mongoose.connect('mongodb://0.0.0.0:27017/moviesdb');

app.use(requestLogger);

app.use(apiLimiter);

app.post('/signup', validateCreateUser, createUser);

app.post('/signin', validateLogin, login);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
