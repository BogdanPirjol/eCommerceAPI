const sequelize = require('../db/connectDB')();
const { DataTypes, UUID } = require('sequelize');
const User = require('./User');

const Product = sequelize.define('Products', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1, 100]
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(5000)
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    colors: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    freeShiping: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    inventory: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    reviewCounter: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    averageRating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }
});

User.hasMany(Product, {
    foreignKey: {
        name: 'userId',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Product.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        type: DataTypes.UUID,
        allowNull: false
    }
});

module.exports = Product;