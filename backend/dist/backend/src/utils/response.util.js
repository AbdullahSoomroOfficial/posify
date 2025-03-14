"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = void 0;
const createResponse = (success, data, successMessage, errorMessage, errorType, cause) => {
    return {
        success,
        data,
        successMessage,
        errorMessage,
        error: { errorType, cause },
    };
};
exports.createResponse = createResponse;
