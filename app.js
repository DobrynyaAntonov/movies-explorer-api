require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { errorHandler } = require('./middlewares/error');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(cors({
  origin: ['https://diplom.dobrynya.nomoreparties.co', 'http://localhost:3000'],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => console.log('ok'));
