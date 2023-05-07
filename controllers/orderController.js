const { StatusCodes } = require('http-status-codes');
const Order = require('../models/Order');
const Product = require('../models/Product');
const OrderProduct = require('../models/OrderProduct');
const { BadRequest } = require('../errors');
const NotFound = require('../errors/notFound');
const stripe = require('stripe')('sk_test_51Mv1NQBkeolJlHlyoRWR84DNgMJlnErnWVV815de3LZDsCOi5dAEtv9BV09jxOAnYhNWY44IoQXv891HxFSQgiD400Qin9N9gX')

const fakePay = async (amount) => {
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'ron',
        payment_method: 'pm_card_visa'
    });
    //console.log('amount: ', paymentIntent);
    return paymentIntent;
}

const getAllOrders = async (req, res) => {
    const orders = await Order.findAll();
    res.status(StatusCodes.OK).json(orders);
}

const getSingleOrder = async (req, res) => {
    const { orderId } = req.params;
    if(orderId)
        throw new BadRequest('Please provide an order id');
    
}

const getCurrentUserOrders = async (req, res) => {
    res.send('Orders belong to user' + req.user.name);
}

const createOrder = async (req, res) => {
    const { tax, shippingFee, items } = req.body;
    const { id: userId } = req.user;

    if(!items || items.length < 1)
        throw new BadRequest('The cart can`t be empty!');
    
    if(!tax || !shippingFee)
        throw new BadRequest('Please provide tax and shipping fee!');

    const order = await Order.create({
        userId
    }); //dummy order for retreiving orderId used for joining tables

    let subtotal = 0;
    let total = 0;
    for(const cartItem of items){
        const dbItem = await Product.findOne({
            where: {
                id: cartItem.product
            }
        });
        if(!dbItem)
            throw new NotFound(`Product with id ${cartItem.product} not found!`);
        
        await OrderProduct.create({
            productId: dbItem.id,
            orderId: order.id,
            quantity: cartItem.amount
        });

        subtotal += cartItem.price * cartItem.amount;
    }
    total = subtotal + tax + shippingFee;

    //create payment intent
    const paymentIntent = await fakePay(total);

    //update order instance with all values
    order.set({
        tax,
        shippingFee,
        subtotal,
        total,
        status: 'submited',
        clientSecret: paymentIntent.client_secret,
        paymentId: paymentIntent.id
    });

    const saved = await order.save();
    res.status(StatusCodes.CREATED).json(saved);
}

const updateOrder = async (req, res) => {
    res.send(`Order with id ${req.params.orderId} was updated.`);
}

module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
}