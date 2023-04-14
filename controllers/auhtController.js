const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const login = (req, res) => {
    res.send('login fucntionality');
}

const logout = (req, res) => {
    res.send('logout fucntionality');
}

const register = async (req, res) => {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json(user.dataValues);
}

module.exports = {
    login,
    logout,
    register
}