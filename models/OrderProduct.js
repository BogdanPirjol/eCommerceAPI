const Product = require('../models/Product');
const Order = require('../models/Order');
const sequelize = require('../db/connectDB')();
const { DataTypes } = require('sequelize');

const OrderProduct = sequelize.define('OrderProduct', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.UUID,
        references: {
            model: Product,
            key: 'id'
        }
    }, 
    orderId: {
        type: DataTypes.UUID,
        references: {
            model: Order,
            key: 'id'
        }
    }
});

Product.belongsToMany(Order, {through: OrderProduct, foreignKey: 'productId'});
Order.belongsToMany(Product, {through: OrderProduct, foreignKey: 'orderId'});

module.exports = OrderProduct;