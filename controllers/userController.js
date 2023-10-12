const User = require('../models/User');
const { NotFoundError, BadRequest, UnauthorizedError, CustomError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { attachCookieToResponse } = require('../utils/jwt');

const getAllUsers = async (req, res) => {
    const users = await User.findAll({
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
    const currentUser = await User.findOne({
        where: {
            id: req.user.id
        },
        attributes: ["name", "email", "id", "role"]
    });
    if(!currentUser)
        throw new NotFoundError('Ups! Requested user doesn`t exists!');
    res.json({user: currentUser});
}

const  updateUser = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new BadRequest('Please provide user and email!');
    }
    const { id: userId } = req.user;

    //method I: find user, modifiy fields and call .save() on sequqlize instance
    /* const user = await User.findOne({
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
    //end of first method*/

    //method II: using sequelize.update() method

    const updateData = await User.update({
        name: name,
        email: email
    }, {
        where: {
            id: userId
        },
        returning: true
    });
    if(!updateData){
        throw new CustomError('Couldn`t update user ' + userId);
    }
    const user = updateData[1][0];

    //end of second method

    attachCookieToResponse(res, {
        name: user.name,
        id: user.id,
        role: user.role
    });

    res.status(StatusCodes.OK).json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });

    //NOTICE: in where clause, is searching just for userId. That means data in user session differ from data in DB
    //Should search for name, email and id, and update for new values
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
        throw new BadRequest('Old password doesn`t match with users password!');
    }
    const {name, email, id, role} = await user.update({
        password: newPassword
    }, {
        where: {
            id: userId
        }
    });

    res.json({name, email, id, role});
}

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUsersPassword,
    showCurrentUser
}