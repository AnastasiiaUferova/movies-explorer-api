const signinRouter = require('express').Router();

const { validateLogin } = require('../utils/validation');
const { login } = require('../controllers/users');

module.exports = signinRouter.post('/signin', validateLogin, login);
