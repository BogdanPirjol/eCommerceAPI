const sequelize = require('../db/connectDB')();
const { DataTypes } = require('sequelize');
const User = require('./User');
const Product = require('./Product');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1,
            max: 10
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    comment: {
        type: DataTypes.STRING(5000)
    }
});

User.hasMany(Review, {
    foreignKey: {
        name: 'userId',
        type: DataTypes.UUID,
        allowNull: false
    }
});

Product.hasMany(Review, {
    foreignKey: {
        name: 'productId',
        type: DataTypes.UUID,
        allowNull: false
    }
});

Review.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        type: DataTypes.UUID,
        allowNull: false
    }
});

Review.belongsTo(Product, {
    foreignKey: {
        name: 'productId',
        type: DataTypes.UUID,
        allowNull: false
    }
});

module.exports = Review;