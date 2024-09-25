const AppError = require('../utils/appError');

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const key = Object.keys(err.keyValue)[0];
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate <${key}> field value: ${value}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.statusCode = err.statusCode || 500;
  error.status = err.status || 'error';
  error.message = err.message;

  if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (err.code === 11000) error = handleDuplicateFieldsDB(error);

  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message || 'Something went wrong!',
    });
    // Unexpected programming errors
  } else {
    console.log('ERROR', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }

  next();
};
