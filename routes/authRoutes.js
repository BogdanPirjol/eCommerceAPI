const router = require('express').Router();
const authControllers = require('../controllers/authController');

router.post('/login', authControllers.login);
router.post('/register', authControllers.register);
router.get('/logout', authControllers.logout);

module.exports = router;