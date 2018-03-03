const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hackazon');

const PhonesShema = mongoose.Schema({
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

const PhoneModel = mongoose.model('Phones', PhonesShema);

// findAll retrieves all stories
function findProduct(id) {
  return PhoneModel.find(id).then((n) => {
    const cate = n[0].category;
    return PhoneModel.find({ category: cate });
  });
}

function insertOne(story, callback) {
  PhoneModel.create(story, callback);
}

exports.findProduct = findProduct;
exports.insertOne = insertOne;
