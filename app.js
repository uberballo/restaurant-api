const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const restaurantRouter = require('./controllers/restaurants')

app.use(cors());
app.use(bodyParser.json());

app.use(restaurantRouter)

module.exports = app;
