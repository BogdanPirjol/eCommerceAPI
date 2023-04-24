const User = require('../models/User');
const { NotFoundError, BadRequest, UnauthorizedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
    const users = await User.findAll({
        where: {
            role: 'user'
        },
        attributes: ['id', 'name', 'email', 'role']
    });
    if (!users) {
        throw new NotFoundError('users not found');
    }
    res.status(StatusCodes.OK).json({ nbHits: users.length, users });
}

const getSingleUser = async (req, res) => {
    const { userId: id } = req.params;
    const user = await User.findOne({
        where: {
            id: id
        },
        attributes: ['id', 'name', 'email', 'role']
    });
    if (!user)
        throw new NotFoundError(`Users with id:${id} not found!`);
    res.status(StatusCodes.OK).json(user);
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
}

const updateUser = async (req, res) => {
    const { name, email } = req.body;
    if(!name || !email){
        throw new BadRequest('Please provide user and email!');
    }
    const {id: userId} = req.user;
    //method I: find user, modifiy fields and call .save() on sequqlize instance
    const user = await User.findOne({
        where: {
            id: userId
        }
    });
    user.name = name;
    user.email = email;
    const response = await user.save();
    if(!response){
        throw new NotFoundError(`User ${userId} not found!`);
    }
    res.status(StatusCodes.OK).json({user: {
        name: response.name,
        email: response.email,
        role: response.role,
        id: response.id
    }});
}

const updateUsersPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new BadRequest('Both old password and new password required!');
    }
    const { id: userId } = req.user;
    const user = await User.findOne({
        where: {
            id: userId
        }
    });
    if (!user) {
        throw new NotFoundError(`Coudn't find user with id ${userId}`);
    }
    const isPasswordMatch = await user.checkPassword(oldPassword);
    if (!isPasswordMatch) {
        throw new UnauthorizedError('Old password doesn`t match with users password!');
    }
    const result = await user.update({
        password: newPassword
    }, {
        where: {
            id: userId
        }
    });

    res.json(result);
}

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUsersPassword,
    showCurrentUser
}