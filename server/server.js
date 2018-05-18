const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dataController = require('../db/models/products.js');
require('dotenv').config();

const port = process.env.PORT || 8001;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/product/:id', async (req, res) => {
  const id = req.params;
  const data = await dataController.findProduct(id);
  res.status(201);
  res.send(data);
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
