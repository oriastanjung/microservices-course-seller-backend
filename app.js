require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const mediaRouter = require('./routes/media');
const paymentsRouter = require('./routes/payments');
const ordersRouter = require('./routes/orders');
const verifyToken = require('./middlewares/verifyToken');
const app = express();

app.use(logger('dev'));
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({ extended: false , limit : "50mb"}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/media', mediaRouter);
app.use('/courses', verifyToken ,coursesRouter);
app.use('/orders', ordersRouter);
app.use('/payments', paymentsRouter);

module.exports = app;
