const { CustomError, NotFoundError, BadRequest } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');
const Review = require('../models/Review');
const path = require('path');
const User = require('../models/User');

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
        },
        include: {
            model: Review,
            required: true,
            include: {
                model: User,
                attributes: ['name']
            }
        }
    });
    if(!product)
        throw new NotFoundError('Couldn`t find product with id' + req.params.productId);
    res.status(StatusCodes.OK).json(product);
}

const createProduct = async (req, res) => {
    req.body.userId = req.user.id;
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
    const image = req.files.img;
    //check for file exsistance
    if(!image)
        throw new BadRequest('No file uploaded!');
    //check for file type (must to be image)
    if(!image.mimetype.startsWith('image'))
        throw new BadRequest('Please upload image');
    //check for image size
    if(image.size > 1024 *1024 *1024)
        throw new BadRequest('Please upload images smaller than 1Mb!');
    const storagePath = path.join(__dirname, '../public/images', image.name);
    await image.mv(storagePath);
    res.status(StatusCodes.CREATED).json({path: 'images/' + image.name});
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage 
}