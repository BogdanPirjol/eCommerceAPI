const { createToken, isTokenValid, attachCookieToResponse } = require('./jwt');
const checkPermissions = require('./checkPermissions');

module.exports = {
    createToken,
    isTokenValid,
    attachCookieToResponse,
    checkPermissions
}