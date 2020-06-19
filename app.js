require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/index');
const limiter = require('./config/limiter');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors({ origin: ['http://localhost:8080', 'https://api.news-search.gq', 'https://www.api.news-search.gq'], credentials: true }));

mongoose.connect('mongodb://localhost:27017/news-search', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());
app.use(router);
app.use(limiter);

app.listen(PORT, () => {
  console.log(`backend Сервер запущен, приложение слушает порт: ${PORT}`);
});
