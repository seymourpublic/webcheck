const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(`Error: ${err.message}`);
  logger.error(err.stack);

  // Handle specific error types and send appropriate response
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Validation Error', details: err.errors });
  }

  // Handle other errors with a generic response
  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
