const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dataController = require('../db/models/products.js');

const port = process.env.PORT || 8001;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));
app.use('/:id', express.static(path.join(__dirname, '../public')));

app.get('/product/:id', async (req, res) => {
  const id = req.params;
  let data = await dataController.findProduct(id);
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, HEAD");
  res.status(201);
  res.send(data);
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
