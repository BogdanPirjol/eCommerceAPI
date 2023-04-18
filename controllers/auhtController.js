const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { attachCookieToResponse } = require('../utils');
const { BadRequest, UnauthenticatedError } = require('../errors');

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new BadRequest('please provide email and password!');
    }
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    if(!user)
        throw new BadRequest('user does not exists!');
    const isPasswordValid = await user.checkPassword(password);
    if(!isPasswordValid)
        throw new UnauthenticatedError('wrong password');
    const payload = {
        name: user.name,
        id: user.id,
        role: user.role
    };
    attachCookieToResponse(res, payload);
    res.status(StatusCodes.OK).json(payload);
}

const logout = (req, res) => {
    
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const payload = {
        user: user.name,
        userId: user.id,
        role: user.role
    };
    attachCookieToResponse(res, payload);
    res.status(StatusCodes.CREATED).json({ "user": payload});
}

module.exports = {
    login,
    logout,
    register
}  