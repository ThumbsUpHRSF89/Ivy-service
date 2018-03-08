const data = require('./dummyData.txt');
const mongoose = require('mongoose');
const products = require('./models/products.js');


const seedDb = function seedDb(dt) {
  let data = [];
  dt.forEach((n) => {
    const obj = {
      id: n.id,
      image: n.image_url,
      name: n.name,
      category: n.category,
      overallReview: n.overallReview,
      reviewNumber: n.reviewNumber,
      price: n.price,
      isPrime: n.isPrime,
      hasReview: n.hasReview,
    }; 
    data.push(obj)
  });
  // const testSaved = function testSaved(err) {
  //   if (err) {console.log('can not save data'); return; }
  //   console.log('saved data');
  //   mongoose.disconnect()
  // };
  products.insertData(data)
  .then(() => {
    console.log('Insert Data Success!');
    mongoose.disconnect();
  })
  .catch((e) => {
    console.error(e);
    mongoose.disconnect();
  });
};

seedDb(data.data);


