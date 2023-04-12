const notFound = (req, res) => {
    res.send('Ups! Page doesn`t exist! <a href="/">Back Home</a>');
}

module.exports = notFound;