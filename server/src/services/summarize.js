const ApiError = require('../utils/api-error');
const { StatusCodes } = require('http-status-codes');
const { metacall } = require('metacall');

const summarize = async (data) => {
    try {
        const response = await metacall('get_model_response', data);
        return response;
    } catch (error) {
        throw new ApiError(
            'Failed to Call Hugging Face API',
            StatusCodes.BAD_GATEWAY,
            error.message,
            true
        );
    }
}

module.exports = { summarize }; 