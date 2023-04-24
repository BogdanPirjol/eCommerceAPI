const { CustomError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');

const getAllProducts = (req, res) => {
    res.send('All Products');
}

const getSingleProduct = (req, res) => {
    res.send('Single Product');
}

const createProduct = async (req, res) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    if(!product)
        throw new CustomError('Prduct couldn`t be created!');
    res.status(StatusCodes.CREATED).json(product);
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