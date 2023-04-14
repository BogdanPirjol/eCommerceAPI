const { CustomError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.message, err.statusCode);
    if(err instanceof CustomError){
        res.status(err.statusCode).json(err.message);
    }
    else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

module.exports = errorHandlerMiddleware;