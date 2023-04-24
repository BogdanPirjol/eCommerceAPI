const router = require('express').Router();
const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage } = require('../controllers/productController');

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:productId').get(getSingleProduct).delete(deleteProduct).patch(updateProduct);
router.route('/uploadImage').post(uploadImage);

module.exports = router;