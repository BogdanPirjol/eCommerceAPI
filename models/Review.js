const sequelize = require("../db/connectDB")();
const { DataTypes } = require("sequelize");
const User = require("./User");
const Product = require("./Product");

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 10,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    comment: {
      type: DataTypes.STRING(5000),
    },
    //composite primary key
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    //end of composite primary key
  },
  {
    hooks: {
      async afterCreate(review) {
        const product = await review.getProduct();
        this.setAverageReview(product);
      },
      async afterUpdate(review) {
        const product = await review.getProduct();
        this.setAverageReview(product);
      },
      async afterDestroy(review) {
        const product = await review.getProduct();
        this.setAverageReview(product);
      },
    },
  }
);

Review.setAverageReview = async (product) => {
  const res = await product.getReviews();
  let totalRating = 0;
  res.forEach((item) => {
    totalRating += item.rating;
  });
  product.averageRating = Math.ceil(totalRating / res.length);
  product.reviewCounter = res.length;
  product.save();
};

User.hasMany(Review, {
  foreignKey: {
    name: "userId",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Product.hasMany(Review, {
  foreignKey: {
    name: "productId",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Review.belongsTo(User, {
  foreignKey: {
    name: "userId",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Review.belongsTo(Product, {
  foreignKey: {
    name: "productId",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Review;

//we have to ensure than an user can post maximum one review per product
//there are two aproaces: by defining a composite primary key OR by create that logic in the controller
//actual implementantion: method I
