const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const eventRouter = require('./routes/eventRoutes');
const errorHandler = require('./controllers/errorController');

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(cors({
  origin:"http://localhost:3000",
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.options('*', cors());

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
