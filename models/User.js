const sequelize = require('../db/connectDB');
const { DataTypes, UUIDV4 } = require('sequelize');

const User = sequelize.define('User',
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
            //valid regex
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

module.exports = User;