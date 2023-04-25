const router = require('express').Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview } = require('../controllers/reviewController');


//public routes
router.route('/').get(getAllReviews);
router.route('/:reviewId').get(getSingleReview);

//protected routes
router.use(authenticateUser, authorizePermissions('user'));
router.route('/').post(createReview);
router.route('/:reviewId').patch(updateReview).delete(deleteReview);

module.exports = router;