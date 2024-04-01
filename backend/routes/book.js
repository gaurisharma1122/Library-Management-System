const { Router } = require('express');
const { userAuth, isAdminAuth } = require('../middlewares/user');
const { AddBooks, GetAllBooks, UpdateBooks, DeleteBooks, IssueBooks, PublishBooks } = require('../controllers/book');
const router = Router();

router.get('/getAllBooks', GetAllBooks);
router.post('/addBooks', userAuth, isAdminAuth, AddBooks);
router.put('/updateBooks', userAuth, isAdminAuth, UpdateBooks);
router.delete('/deleteBooks', userAuth, isAdminAuth, DeleteBooks);
router.post('/publishBook', userAuth, isAdminAuth, PublishBooks);
router.post('/issueBook', userAuth, IssueBooks);

module.exports = router;