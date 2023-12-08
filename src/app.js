require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./db');
const websiteCheckRouter = require('../routes/websiteCheck');
const errorHandler = require('../middleware/errorHandler');
const cacheMiddleware = require('../middleware/cache');
const rateLimiter = require('../middleware/rateLimit');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to the database
connectToDatabase();

// Use Express router
app.use('/api', rateLimiter);
app.use('/api', websiteCheckRouter);
app.use('/api/check-website', cacheMiddleware);

// Use centralized error-handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
