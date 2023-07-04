require('dotenv').config();

const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = '421b5fa29e2f3344c4',
} = process.env;

module.exports = { PORT, JWT_SECRET, DB_URL };
