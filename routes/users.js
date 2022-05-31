const router = require('express').Router();

const { validateChangeUserInfo } = require('../utils/validation');
const {
  changeUserInfo, getCurrentUser,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', validateChangeUserInfo, changeUserInfo);

module.exports = router;
