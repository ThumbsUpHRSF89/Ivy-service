const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hackazon');

const ProductsShema = mongoose.Schema({
  id: { type: Number, unique: true },
  image: String,
  name: String,
  category: Array,
  overallReview: Number,
  reviewNumber: Number,
  price: String,
  isPrime: Boolean,
  hasReview: Boolean,
});

const ProductModel = mongoose.model('Products', ProductsShema);


function findProduct(id) {
  return ProductModel.find(id).then((n) => {
    const targetCategory1 = n[0].category[1];
    const targetCategory2 = n[0].category[3];
    return ProductModel.find({ category: { $in: [targetCategory1] } });
  });
}

function insertOne(story, callback) {
  ProductModel.create(story, callback);
}

exports.findProduct = findProduct;
exports.insertOne = insertOne;
