require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const handleError = require('./middlewares/handleError');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
app.use(cors({ origin: ['http://localhost:3001', 'https://mestofrontrex.nomoredomains.work'], credentials: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
