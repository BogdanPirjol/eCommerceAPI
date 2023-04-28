const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { attachCookieToResponse } = require('../utils');
const { BadRequest, UnauthenticatedError } = require('../errors');
const createToken = require('../utils/createUserToken');

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
    const userToken = createToken(user);
    attachCookieToResponse(res, userToken);
    res.status(StatusCodes.OK).json({user: userToken});
}

const logout = (req, res) => {
    //1st method
    //using res.clearCookie()
    //but cookie options are mandatory
    
    //2nd method
    //seting an descreptive message (optional: used just in dev)
    //setting expires options to current date (expecting browser to remove mentioned cookie)
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({msg: 'user logged out!'});
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password)
        throw new BadRequest('Please provide name, email and password!');

    //check if is first account
    if(User.checkFirstUser())
        req.body.role = 'admin'

    const user = await User.create(req.body);
    const userToken = createToken(user);
    attachCookieToResponse(res, userToken);
    res.status(StatusCodes.CREATED).json({ "user": userToken});
}

module.exports = {
    login,
    logout,
    register
}  