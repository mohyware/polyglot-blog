const express = require('express');
const postRoutes = require('./routes/post');
const { errorHandler } = require('./middlewares/error-handler');
const ApiError = require('./utils/api-error');
const { StatusCodes } = require('http-status-codes');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(express.json());

// CORS
const cors = require('cors');
app.use(cors());

// Log incoming requests
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});

// Routes
app.use('/api/posts', (req, res, next) => {
    res.on('finish', () => {
        logger.info(`Response: ${res.statusCode} for ${req.method} ${req.originalUrl}`);
    });
    next();
}, postRoutes);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// 404 Not Found Handler
app.use('*', (req, res, next) => {
    const error = new ApiError('Not Found', StatusCodes.NOT_FOUND, `Cannot ${req.method} ${req.originalUrl}`, true);
    next(error);
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;