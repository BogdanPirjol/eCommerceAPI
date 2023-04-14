const authRouter = require('express').Router();
const authControllers = require('../controllers/auhtController');

authRouter.post('/login', authControllers.login);
authRouter.post('/register', authControllers.register);
authRouter.get('/logout', authControllers.logout);

module.exports = authRouter;