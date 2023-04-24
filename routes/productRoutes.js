const router = require('express').Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage } = require('../controllers/productController');

//public routes
router.route('/').get(getAllProducts)
router.route('/:productId').get(getSingleProduct)


//restricted routes: require authentications & authorization
router.use(authenticateUser, authorizePermissions('admin'));
router.route('/').post(createProduct);
router.route('/:productId').delete(deleteProduct).patch(updateProduct);
router.route('/uploadImage').post(uploadImage);

module.exports = router;