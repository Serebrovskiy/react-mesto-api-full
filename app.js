const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const path = require('path');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const app = express();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateUser } = require('./middlewares/requestValidation');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

// app.use(cors({
//   origin: 'http://localhost:3000',
// }));

app.use(cors());

// const allowedCors = [
//   'https://aleks.students.nomoreparties.space',
//   'https://www.aleks.students.nomoreparties.space',
//   'http://aleks.students.nomoreparties.space',
//   'http://www.aleks.students.nomoreparties.space',
//   'localhost:3000',
// ];

// eslint-disable-next-line prefer-arrow-callback
// app.use(function (req, res, next) {
//   const { origin } = req.headers;

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   next();
// });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/crash-test', () => { // краш-тест сервера
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateUser, login);
app.post('/signup', createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use(() => {
  throw new NotFoundError({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
