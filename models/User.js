const sequelize = require('../db/connectDB');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const User = sequelize().define('User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
            }, 
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [6, 100]
        }, 
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        }
    }, {
        hooks: {
            beforeCreate: async (user, options) => {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(user.password, salt);
                user.password = hashedPassword;
            }
        }
    });

User.prototype.checkPassword = async function(passowrd){
    const isMatch = await bcrypt.compare(passowrd, this.dataValues.password);
    return isMatch;
}

module.exports = User;