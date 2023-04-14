const jwt = require('jsonwebtoken');

const createToken = ({payload, expiresIn}) => {
    console.log(payload);
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiresIn});
}

const isTokenValid = ({token}) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    createToken,
    isTokenValid
}