const signupRouter = require('express').Router();

const { validateCreateUser } = require('../utils/validation');
const { createUser } = require('../controllers/users');

module.exports = signupRouter.post('/signup', validateCreateUser, createUser);
