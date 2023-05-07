const { UUID, UUIDV4, INTEGER, FLOAT, ARRAY, STRING, DataTypes } = require('sequelize');
const User = require('./User');
const sequelize = require('../db/connectDB')();

const Order = sequelize.define('Order', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    tax: {
        type: INTEGER,
        defaultValue: 0
    },
    shippingFee: {
        type: INTEGER,
        defaultValue: 0
    },
    subtotal: {
        type: FLOAT,
        defaultValue: 0
    },
    total: {
        type: FLOAT,
        defaultValue: 0
    },
    status: {
        type: STRING,
        defaultValue: 'pending'
    },
    clientSecret: {
        type: STRING,
        defaultValue: 'null'
    },
    paymentId: {
        type: STRING,
        defaultValue: 'null'
    }
});

User.hasMany(Order, {
    foreignKey: {
        name: 'userId',
        type: UUID,
        allowNull: false
    }
});

Order.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        type: UUID,
        allowNull: false
    }
});

module.exports = Order;