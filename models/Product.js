const sequelize = require('../db/connectDB')();
const { DataTypes } = require('sequelize');

const Product = sequelize.define('Products', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
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
        type: DataTypes.BOOLEAN
    },
    freeShiping: {
        type: DataTypes.BOOLEAN
    },
    inventory: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    averageRating: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});


module.exports = Product;