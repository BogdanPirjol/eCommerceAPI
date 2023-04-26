const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { BadRequest } = require('../errors');
const checkPermissions = require('../utils/checkPermissions');
const NotFound = require('../errors/notFound');


const createReview = async (req, res) => {
    const { id: userId } = req.user;
    if (!req.body.productId)
        throw new BadRequest('Please provide productId!');
    req.body.userId = userId;
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json(review);
}

const getAllReviews = async (req, res) => {
    //method I: return reviews associated infos like user and product 
    /* const reviews = await Review.findAll({
        include: [ Product, {
            model: User,
            attributes: {
                exclude: ['password']
            }
        }]
    }); */

    //method II: return just reviews infos
    const reviews = await Review.findAll();
    res.status(StatusCodes.OK).json({
        count: reviews.length,
        reviews
    });
}

const getSingleReview = async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findOne({
        where: {
            id: reviewId
        }
    });
    if (!review)
        throw new BadRequest(`Review with id ${reviewId} does not exist!`);
    res.status(StatusCodes.OK).json(review);
}

const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const {
        rating,
        title,
        comment
    } = req.body
    if (!rating || !title || !comment)
        throw new BadRequest('Please provide rating, comment and title');
    const review = await Review.findOne({
        where: {
            id: reviewId
        }
    });
    if (!review)
        throw new NotFound(`Review with id ${reviewId} does not exists`);
    //check permissions
    checkPermissions(req.user, review.userId);
    review.rating = rating;
    review.comment = comment;
    review.title = title;
    await review.save();
    res.status(StatusCodes.OK).json(review);
}

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const { id: userId } = req.user;
    const review = await Review.findOne({
        where: {
            id: reviewId
        }
    });
    checkPermissions(req.user, review.userId);
    if (!review)
        throw new BadRequest(`Review with id ${reviewId} does not exist!`);
    await review.destroy();
    res.status(StatusCodes.OK).json({ message: 'Review deleted' });
}

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}