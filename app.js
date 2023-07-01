const cors = require('cors');
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/errorHandler');

// Слушаем 3000 порт
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

app.use(requestLogger); // подключаем логгер запросов
app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());

app.use(errorHandler);

// подключаемся к серверу mongo
mongoose.connect(DB_URL);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
