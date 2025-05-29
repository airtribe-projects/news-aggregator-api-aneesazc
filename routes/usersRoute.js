const express = require('express');
const router = express.Router();
const { validateJWT } = require('../middlewares/auth');
const { registerUser, loginUser, getUserPreferences, updateUserPreferences } = require('../controllers/usersController');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/preferences', validateJWT, getUserPreferences);
router.put('/preferences', validateJWT, updateUserPreferences);


module.exports = router;