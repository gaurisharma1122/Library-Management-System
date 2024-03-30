const { Router } = require('express');
const router = Router();
const { UserSignup, UserSignin } = require('../controllers/user');

router.post('/signup', UserSignup);
router.post('/signin', UserSignin);

module.exports = router;