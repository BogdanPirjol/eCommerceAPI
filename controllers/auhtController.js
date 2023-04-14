

const login = (req, res) => {
    res.send('login fucntionality');
}

const logout = (req, res) => {
    res.send('logout fucntionality');
}

const register = (req, res) => {
    res.send('register fucntionality');
}

module.exports = {
    login,
    logout,
    register
}