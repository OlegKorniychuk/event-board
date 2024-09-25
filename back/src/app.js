const express = require('express');
const eventRouter = require('./routes/eventRoutes');
const errorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: "success",
    data: {
      message: "Test",
    },
  });
});

app.use('/api/events/', eventRouter);

app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

module.exports = app;
