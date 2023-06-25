const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose')

const postDeliveryRouter = require('./routes/postDelivery');
const getDeliveryRouter = require('./routes/getDeliveryByDeliveryId');
const getDeliveriesRouter = require('./routes/getDeliveries');
const putDeliveryRouter = require('./routes/putDeliveryByDeliveryId');
const deleteDeliveryRouter = require('./routes/deleteDeliveryByDeliveryId');
const getDelivererRouter = require('./routes/deleteDeliveryByDelivererId');
const deleteDelivererRouter = require('./routes/deleteDeliveryByDelivererId');
const putDelivererRouter = require('./routes/deleteDeliveryByDelivererId');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/deliveries', postDeliveryRouter, getDeliveryRouter, getDeliveriesRouter, putDeliveryRouter, deleteDeliveryRouter);
app.use('/deliverer', getDelivererRouter, deleteDelivererRouter, putDelivererRouter);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'cesilicious'
    })
  .then(() => console.log('Connexion à MongoDB Deliveries réussie !'))
  .catch(() => console.log('Connexion à MongoDB Deliveries échouée !'));

module.exports = app;