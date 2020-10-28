const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
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

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateUser, login);
app.post('/signup', validateUser, createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.status === 500 ? 'Ошибка сервера' : err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
