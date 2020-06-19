const router = require('express').Router();
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://api.news-search.gq', 'https://www.api.news-search.gq'],
  optionsSuccessStatus: 200,
  credentials: true,
};

router.use(cors(corsOptions));

module.exports = router;
