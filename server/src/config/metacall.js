const { metacall_load_from_file } = require('metacall');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/api-error');
const path = require('path')
const logger = require('../utils/logger');

const loadPython = async () => {
    try {
        metacall_load_from_file('py', [path.resolve('./src/python/huggingface.py')]);
        logger.info('✅ Python services loaded via Metacall');
    } catch (error) {
        throw new ApiError(
            'Failed to Load Python Services',
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message,
            true
        );
    }
};

module.exports = loadPython;
