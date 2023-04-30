const { UUID, UUIDV4, INTEGER, FLOAT, ARRAY, STRING } = require('sequelize');
const sequelize = require('../db/connectDB')();

const Order = sequelize.define('Order', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    tax: {
        type: INTEGER,
        allowNull: false
    },
    shippingFee: {
        type: INTEGER,
        allowNull: false
    }, 
    subtotal: {
        type: FLOAT,
        allowNull: false
    },
    total: {
        type: FLOAT,
        allowNull: false
    },
    cartItems: {
        type: ARRAY[STRING]
    },
    status: {
        type: STRING
    },
    clientSecret: {
        type: STRING,
        allowNull: false
    }, 
    paymentId: {
        type: STRING,
        allowNull: false
    }
});

module.exports = Order;