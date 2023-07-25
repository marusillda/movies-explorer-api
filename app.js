const cors = require('cors');
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const { PORT, DB_URL } = require('./config');

const app = express();
app.use(express.json());
app.use(cors());

app.use(helmet());
app.use(requestLogger); // подключаем логгер запросов
app.use(rateLimiter);

app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());

app.use(errorHandler);

// подключаемся к серверу mongo
mongoose.connect(DB_URL);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
