const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hackazon');

const ProductsShema = mongoose.Schema({
  id: { type: Number, unique: true },
  image: String,
  name: String,
  category: { type: [[String], String] },
  overallReview: Number,
  reviewNumber: Number,
  price: String,
  isPrime: Boolean,
  hasReview: Boolean,
});

const ProductModel = mongoose.model('Products', ProductsShema);

// findAll retrieves all stories
function findProduct(id) {
  return ProductModel.find(id).then((n) => {
    const cate = n[0].category;
    return ProductModel.find({ category: cate });
  });
}

function insertOne(story, callback) {
  ProductModel.create(story, callback);
}

exports.findProduct = findProduct;
exports.insertOne = insertOne;
