const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ppp');

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
    const targetCategory1 = n[0].category[0];
    const targetCategory2 = n[0].category[1];
    return ProductModel.find({ category: { $in: [targetCategory1, targetCategory2] } });
  });
}

// function insertOne(story, callback) {
//   ProductModel.create(story, callback);
// }
function insertData(products) {
  return ProductModel.insertMany(products);
}
exports.findProduct = findProduct;
// exports.insertOne = insertOne;
exports.insertData = insertData;