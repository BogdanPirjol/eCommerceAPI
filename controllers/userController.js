

const getAllUsers = async(req, res) => {
    res.send('getAllUsers');
}

const getSingleUser = async(req, res) => {
    res.send('getSingleUser');
}

const showCurrentUser = async(req, res) => {
    res.send('showCurrentUser');
}

const updateUser = async(req, res) => {
    res.send('updateUser');
}

const updateUsersPassword = async(req, res) => {
    res.send('updateUsersPassword');
}

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUsersPassword,
    showCurrentUser
}