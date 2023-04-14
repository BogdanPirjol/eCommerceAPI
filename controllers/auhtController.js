const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { createToken } = require('../utils');

const login = (req, res) => {
    res.send('login fucntionality');
}

const logout = (req, res) => {
    res.send('logout fucntionality');
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const payload = {
        user: user.name,
        userId: user.id,
        role: user.role
    };
    const token = createToken({payload: payload, expiresIn: '2h'});
    res.status(StatusCodes.CREATED).json({ "user": user.dataValues, token: token });
}

module.exports = {
    login,
    logout,
    register
}