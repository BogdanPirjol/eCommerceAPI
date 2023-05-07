const router = require('express').Router();
const {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
} = require('../controllers/orderController');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

router.use(authenticateUser);

router.route('/').get(authorizePermissions('admin') ,getAllOrders).post(createOrder);
router.route('/showMyOrders').get(getCurrentUserOrders);
router.route('/:orderId').get(getSingleOrder).post(updateOrder);

module.exports = router;