const CustomError = require('./customErrorAPI');
const NotFoundError = require('./notFound');
const UnauthenticatedError = require('./unauthenticated');
const BadRequest = require('./BadRequest');

module.exports = {
    CustomError,
    NotFoundError,
    UnauthenticatedError, 
    BadRequest
}