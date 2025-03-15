"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.NotFoundError = exports.ValidationError = exports.ConflictError = exports.AuthenticationError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}
exports.CustomError = CustomError;
class AuthenticationError extends CustomError {
    constructor(message) {
        super(message, 401);
    }
}
exports.AuthenticationError = AuthenticationError;
class ConflictError extends CustomError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
class ValidationError extends CustomError {
    constructor(message, errors) {
        super(message, 400);
        this.errors = errors;
    }
    format() {
        if (this.errors === null)
            return null;
        // Aggregate errors for each path
        const aggregatedErrors = this.errors.reduce((acc, err) => {
            const path = err.path.join("."); // Get the path for the field
            if (!acc[path]) {
                acc[path] = [];
            }
            acc[path].push(err.message); // Add all error messages for the same path
            return acc;
        }, {});
        // Transform the aggregated errors into a more user-friendly format
        const formattedErrors = Object.entries(aggregatedErrors).map(([path, messages]) => ({
            path,
            messages, // Combine all messages for the same path
        }));
        return formattedErrors;
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
