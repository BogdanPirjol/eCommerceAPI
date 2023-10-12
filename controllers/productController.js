const { CustomError, NotFoundError, BadRequest } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const Review = require("../models/Review");
const path = require("path");
const User = require("../models/User");
const multer = require("multer");
const upload = multer({ dest: "./public" });

const getAllProducts = async (req, res) => {
  const products = await Product.findAll({
    include: {
      model: Review,
      //required: true,
      include: {
        model: User,
        attributes: ["name"],
      },
    },
  });
  res.status(StatusCodes.OK).json({
    nbHits: products.length,
    products: products,
  });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.productId,
    },
    include: [
      {
        model: Review,
        //required: true,
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  });
  if (!product)
    throw new NotFoundError(
      "Couldn`t find product with id: " + req.params.productId
    );
  res.status(StatusCodes.OK).json(product);
};

const createProduct = async (req, res) => {
  req.body.userId = req.user.id;

  const {
    id,
    featured,
    freeShiping,
    inventory,
    name,
    image,
    company,
    category,
    price,
    description,
    colors,
  } = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({product: {
    id,
    featured,
    freeShiping,
    inventory,
    name,
    image,
    company,
    category,
    price,
    description,
    colors
  }});
};

const updateProduct = async (req, res) => {
  req.body.userId = req.user.id;
  const { productId } = req.params;
  const response = await Product.update(req.body, {
    where: {
      id: productId,
    },
    returning: true,
  });
  const updatedProduct = response[1][0];
  if (!response[0]) throw new NotFoundError("Product not found: " + productId);
  res.status(StatusCodes.OK).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({
    where: {
      id: productId,
    },
  });
  if (!product) throw new NotFoundError(`Product ${productId} not found!`);
  const confirm = await product.destroy();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Product deleted!"});
};

const uploadImage = async (req, res) => {
  const image = req.files.img;

  //check for file exsistance
  if (!image)
    throw new BadRequest(
      "No image was found! (input type name should be image)"
    );
  //check for file type (must to be image)
  if (!image.mimetype.startsWith("image"))
    throw new BadRequest("Please upload image");
  //check for image size
  if (image.size > 1024 * 1024 * 10)
    throw new BadRequest("Please upload images smaller than 10Mb!");
  const storagePath = path.join(__dirname, "../public/images", image.name);
  await image.mv(storagePath);
  res.status(StatusCodes.CREATED).json({ path: "images/" + image.name });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
