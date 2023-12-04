const mongoose = require('mongoose');
const logger = require('./utils/logger');

const connectToDatabase = () => {
  const databaseUrl = process.env.MONGODB_URI;

  mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.on('error', (error) => {
    logger.error(`MongoDB connection error: ${error}`);
  });

  db.once('open', () => {
    logger.info('Connected to the database');
  });
};

module.exports = { connectToDatabase };
