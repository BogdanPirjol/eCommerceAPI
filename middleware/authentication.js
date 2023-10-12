const { UnauthenticatedError, BadRequest, UnauthorizedError } = require('../errors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;
    if(!token)
        throw new UnauthenticatedError('Couldn`t authenticate user! (Expected user token cookie)');
    try{
        const userData = isTokenValid({token});
        const {name, id, role} = userData;
        req.user = {name, id, role};
        next();
    }catch(err){
        throw new UnauthenticatedError(`Couldn't authenticate user! (${err})`);
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role))
            throw new UnauthorizedError('Unauthorized to acces requested resource!');
        next();
    }
}

module.exports = {
    authenticateUser,
    authorizePermissions
};