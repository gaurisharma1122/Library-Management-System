const { Router } = require('express');
const { userAuth, isAdminAuth } = require('../middlewares/user');
const { AddBooks } = require('../controllers/book');
const router = Router();

router.post('/addBook', userAuth, isAdminAuth, AddBooks);

module.exports = router;