const router = require('express').Router();

const movieRouter = require('./movies');
const userRouter = require('./users');

router.use(movieRouter);
router.use(userRouter);

module.exports = router;
