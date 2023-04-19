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
    const {userId: id} = req.params;
    const user = await User.findOne({
        where: {
            id: id
        },
        attributes: ['id', 'name', 'email', 'role']
    });
    if(!user)
        throw new NotFoundError(`Users with id:${id} not found!`);
    res.status(StatusCodes.OK).json(user);
}

const showCurrentUser = async(req, res) => {
    res.status(StatusCodes.OK).json({user: req.user});
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