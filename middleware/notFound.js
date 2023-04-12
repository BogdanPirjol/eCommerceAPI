const {StatusCodes } = require('http-status-codes');

const notFound = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send('Ups! Page doesn`t exist! <a href="/">Back Home</a>');
}

module.exports = notFound;