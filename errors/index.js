const CustomError = require('./customErrorAPI');
const NotFoundError = require('./notFound');
const UnauthenticatedError = require('./unauthenticated');
const BadRequest = require('./BadRequest');
const UnauthorizedError = require('./unauthorized');

module.exports = {
    CustomError,
    NotFoundError,
    UnauthenticatedError, 
    BadRequest,
    UnauthorizedError
}