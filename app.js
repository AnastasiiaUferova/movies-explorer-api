require('dotenv').config();
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');
const router = require('./routes/index');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-404');
const { errorHandler } = require('./middlewares/errorHandler');
const apiLimiter = require('./middlewares/rateLimit');

const { PORT = 3000, URL } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use(requestLogger);

app.use(apiLimiter);

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors);

mongoose.connect(URL);

app.use(signupRouter);
app.use(signinRouter);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
