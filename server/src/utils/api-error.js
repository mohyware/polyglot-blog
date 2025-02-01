class BaseError extends Error {
    constructor(name, httpCode, description, isOperational) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}
module.exports = class APIError extends BaseError {
    constructor(name, httpCode = 500, description = 'internal server error', isOperational = true) {
        super(name, httpCode, description, isOperational);
    }
}
