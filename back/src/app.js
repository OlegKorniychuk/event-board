const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const eventRouter = require('./routes/eventRoutes');
const errorHandler = require('./controllers/errorController');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../../front/build')));

app.use(express.json());

app.use('/api/events/', eventRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../front/build', 'index.html'));
})

app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

module.exports = app;
