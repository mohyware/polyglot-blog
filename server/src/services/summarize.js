const ApiError = require('../utils/api-error');
const { StatusCodes } = require('http-status-codes');
const { metacall } = require('metacall');

const summarize = async (data, service = 'gemini') => {
    const services = ['gemini', 'huggingface', 'claude', 'deepseek', 'openai', 'eden'];
    if (!services.includes(service)) {
        throw new ApiError(
            'Model was not found',
            StatusCodes.NOT_FOUND
        );
    }
    try {
        const response = await metacall(`get_${service}_response`, data);
        return response;
    } catch (error) {
        throw new ApiError(
            'Failed to call Models API',
            StatusCodes.BAD_GATEWAY,
            error.message,
            true
        );
    }
}

module.exports = { summarize }; 