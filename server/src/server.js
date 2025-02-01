require('dotenv').config();
const connectDB = require('./config/database');
const loadPython = require('./config/metacall');
const app = require('./app');
const logger = require('./utils/logger');
const { handleError } = require('./middlewares/error-handler');

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', reason);
    throw reason;
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    handleError(error);
    process.exit(1);
});

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await loadPython();
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`));
    } catch (error) {
        logger.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();