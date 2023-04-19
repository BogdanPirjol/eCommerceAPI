const User = require('../models/User');
const { NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async(req, res) => {
    const users = await User.findAll({
        where: {
            role: 'user'
        },
        attributes: ['id', 'name', 'email', 'role']
    });
    if(!users){
        throw new NotFoundError('users not found');
    }
    res.status(StatusCodes.OK).json({nbHits: users.length, users});
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