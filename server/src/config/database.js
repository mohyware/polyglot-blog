const mongoose = require('mongoose');
const ApiError = require('../utils/api-error');
const { StatusCodes } = require('http-status-codes');
const logger = require('../utils/logger');

const connectDB = async (MONGODB_URI) => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        logger.info(`✅ Database Connected: ${conn.connection.host}`);
    } catch (error) {
        throw new ApiError(
            'Database Connection Failed',
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message,
            true
        );
    }
};

module.exports = connectDB;