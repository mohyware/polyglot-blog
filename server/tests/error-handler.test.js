const request = require('supertest');
const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { errorHandler, handleError, isTrustedError } = require('../src/middlewares/error-handler');
const ApiError = require('../src/utils/api-error');
const logger = require('../src/utils/logger');

jest.mock('../src/utils/logger');

describe('Error Handler Middleware with Supertest', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());

        // Add routes that will trigger different types of errors
        app.get('/validation-error', (req, res, next) => {
            const validationError = {
                name: 'ValidationError',
                errors: { title: { message: 'Title is required' } },
            };
            next(validationError);
        });

        app.get('/cast-error', (req, res, next) => {
            const castError = {
                name: 'CastError',
                value: 'invalid_id',
            };
            next(castError);
        });

        app.get('/duplicate-key-error', (req, res, next) => {
            const duplicateKeyError = {
                code: 11000,
                keyValue: { email: 'duplicate@example.com' },
            };
            next(duplicateKeyError);
        });

        app.get('/api-error', (req, res, next) => {
            const apiError = new ApiError('Unauthorized Access', StatusCodes.UNAUTHORIZED, 'Unauthorized Access', true);
            next(apiError);
        });

        app.get('/unexpected-error', (req, res, next) => {
            const unexpectedError = new Error('Something went wrong');
            next(unexpectedError);
        });

        // Error handling middleware
        app.use(errorHandler);
    });

    it('should return a 400 status code for ValidationError', async () => {
        const response = await request(app).get('/validation-error');

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual({
            error: 'Validation Error',
            message: 'Title is required',
            isOperational: true,
        });
    });

    it('should return a 400 status code for CastError (Invalid ObjectId format)', async () => {
        const response = await request(app).get('/cast-error');

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toEqual({
            error: 'Invalid ID Format',
            message: 'Invalid ID: invalid_id',
            isOperational: true,
        });
    });

    it('should return a 409 status code for MongoDB Duplicate Key Error', async () => {
        const response = await request(app).get('/duplicate-key-error');

        expect(response.status).toBe(StatusCodes.CONFLICT);
        expect(response.body).toEqual({
            error: 'Duplicate Key Error',
            message: 'Duplicate value for email',
            isOperational: true,
        });
    });

    it('should return the correct error response for an ApiError', async () => {
        const response = await request(app).get('/api-error');

        expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        expect(response.body).toEqual({
            error: 'Unauthorized Access',
            message: 'Unauthorized Access',
            isOperational: true,
        });
    });

    it('should return a 500 status code for unexpected errors', async () => {
        const response = await request(app).get('/unexpected-error');

        expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toEqual({
            error: 'Internal Server Error',
            message: 'Something went wrong',
            isOperational: false,
        });
    });

    it('should log uncaught exceptions and non-operational errors', async () => {
        const mockError = new Error('Critical Failure');
        mockError.isOperational = false;

        await handleError(mockError);

        expect(logger.fatal).toHaveBeenCalledWith('Uncaught Exception: Critical Failure', { stack: mockError.stack });
    });
});
