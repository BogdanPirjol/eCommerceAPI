const { CustomError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    //console.error(err.message, err.original.message);
    if (err instanceof CustomError) {
        res.status(err.statusCode).json(err.message);
    }
    else {
        let errorDetails = {};
        if (err.name.startsWith('Sequelize'))
            errorDetails = {
                message: err.message + ': ' + err.original.message,
                details: err.original.detail,
                parameters: err.original.parameters
            }
        else
            errorDetails = err;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorDetails);
    }
}

module.exports = errorHandlerMiddleware;