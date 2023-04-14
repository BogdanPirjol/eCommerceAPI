const sequelize = require('../db/connectDB');
const { DataTypes } = require('sequelize');

const User = sequelize().define('User',
    {
        id: {
            type: DataTypes.UUID,
            default: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2, 50]
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [6, 100]
        }, 
        role: {
            type: DataTypes.STRING,
            default: 'user',
            allowNull: false
        }
    });

module.exports = User;