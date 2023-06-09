const CustomError = require('./customErrorAPI');
const { StatusCodes } = require('http-status-codes');

class UnauthorizedError extends CustomError {
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthorizedError;