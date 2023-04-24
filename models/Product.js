const sequelize = require('../db/connectDB')();
const { DataTypes } = require('sequelize');

const Product = sequelize.define('Porducts', {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT
    },
    description: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    company: {
        type: DataTypes.STRING
    },
    colors: {
        type: DataTypes.ARRAY
    },
    featured: {
        type: DataTypes.BOOLEAN
    },
    freeShiping: {
        type: DataTypes.BOOLEAN
    },
    inventory: {
        type: DataTypes.NUMBER
    },
    averageRating: {
        type: DataTypes.FLOAT
    }
});


module.exports = Product;