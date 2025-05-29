const express = require('express');
const router = express.Router();
const { validateJWT } = require('../middlewares/auth');
const { getNews } = require('../controllers/newsController');

router.get('/', validateJWT, getNews);

module.exports = router;