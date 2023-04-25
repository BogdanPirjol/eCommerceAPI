const router = require('express').Router();
const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview } = require('../controllers/reviewController');

router.route('/').get(getAllReviews).post(createReview);
router.route('/:reviewId').get(getSingleReview).patch(updateReview).delete(deleteReview);

module.exports = router;