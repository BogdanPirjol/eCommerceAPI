const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const jsonwebtoken = require('jsonwebtoken');

const login = (req, res) => {
    res.send('login fucntionality');
}

const logout = (req, res) => {
    res.send('logout fucntionality');
}

const register = async (req, res) => {
    const {name, email, password} = req.body;
    const user = await User.create({name, email, password});
    const token = jsonwebtoken.sign({user: user.name, email: user.email, userId: user.id}, process.env.JWT_SECRET, {expiresIn: '2h'});
    res.status(StatusCodes.CREATED).json({"user": user.dataValues, token: token});
}

module.exports = {
    login,
    logout,
    register
}