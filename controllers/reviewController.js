const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { BadRequest } = require('../errors');


const createReview = async (req, res) => {
    const { id: userId } = req.user;
    if(!req.body.productId)
        throw new BadRequest('Please provide productId!');
    req.body.userId = userId;
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json(review);
}

const getAllReviews = async (req, res) => {
    const reviews = await Review.findAll({
        include: [ Product, {
            model: User,
            attributes: {
                exclude: ['password']
            }
        }]
    });
    res.status(StatusCodes.OK).json({
        entries: reviews.length,
        reviews
    });
}

const getSingleReview = async (req, res) => {
    res.send('getSingleReview');
}

const updateReview = async (req, res) => {
    res.send('updateReview');
}

const deleteReview = async (req, res) => {
    res.send('deleteReview');
}

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}