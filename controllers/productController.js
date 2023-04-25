const { CustomError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    const products = await Product.findAll();
    res.status(StatusCodes.OK).json({
        'nbHits': products.length,
        products: products
    });
}

const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.productId
        }
    });
    if(!product)
        throw new NotFoundError('Couldn`t find product with id' + req.params.productId);
    res.status(StatusCodes.OK).json(product);
}

const createProduct = async (req, res) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    if (!product)
        throw new CustomError('Prduct couldn`t be created!');
    res.status(StatusCodes.CREATED).json(product);
}

const updateProduct = async (req, res) => {
    req.body.userId = req.user.id;
    const { productId } =  req.params;
    const response = await Product.update(req.body, {
        where: {
            id: productId
        },
        returning: true
    });
    const updatedProduct = response[1][0];
    if(!response[0])
        throw new NotFoundError('Product not found: ' + productId);
    res.status(StatusCodes.OK).json(updatedProduct);
}

const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findOne({
        where: {
            id: productId
        }
    });
    if(!product)
        throw new NotFoundError(`Product ${productId} not found!`);
    const confirm = await product.destroy();
    res.status(StatusCodes.OK).json({msg: 'Product deleted!', details: confirm});
}

const uploadImage = async (req, res) => {
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