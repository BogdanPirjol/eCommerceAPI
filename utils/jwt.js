const jwt = require('jsonwebtoken');

const createToken = ({payload}) => {
    //console.log(payload);
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

const isTokenValid = ({token}) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const attachCookieToResponse = (res, user) => {
    //console.log(tokenUser);
    const oneDay = 1000 * 60 * 60 * 24;;
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.ENVIROMENT === 'production',
        signed: true
    };
    res.cookie('token', createToken({payload: user}), cookieOptions);
}

module.exports = {
    createToken,
    isTokenValid,
    attachCookieToResponse
}