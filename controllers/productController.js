const Product = require('../models/Product');

const getAllProducts = (req, res) => {
    res.send('All Products');
}

const getSingleProduct = (req, res) => {
    res.send('Single Product');
}

const createProduct = (req, res) => {
    res.send('Create Product');
}

const updateProduct = (req, res) => {
    res.send('Update Product');
}

const deleteProduct = (req, res) => {
    res.send('Product deleted');
}

const uploadImage = (req, res) => {
    res.send('Image uploaded');
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}