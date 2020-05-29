require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use(helmet());


app.use(cookieParser());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен, приложение слушает порт: ${PORT}`);
});
