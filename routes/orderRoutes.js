const router = require('express').Router();
const {
    getAllOrders,
    getSingeOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
} = require('../controllers/orderController');
const { authenticateUser } = require('../middleware/authentication');

router.use(authenticateUser);

router.route('/').get(getAllOrders).post(createOrder);
router.route('/showMyOrders');
router.route('/:orderId').get(getSingeOrder).post(updateOrder);

module.exports = router;