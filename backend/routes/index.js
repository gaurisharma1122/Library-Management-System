const { Router } = require('express');
const router = Router();
const UserRouter = require('./user');
const BookRouter = require('./book');

router.use('/user', UserRouter);
router.use('/book', BookRouter);

module.exports = router;