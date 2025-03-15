"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const error_util_1 = require("./error.util");
const validate = (schema) => {
    return (request, _, next) => {
        try {
            if (!request.body) {
                throw new error_util_1.ValidationError("Request body is missing", null);
            }
            const result = schema.safeParse(request.body);
            if (result.success) {
                next();
            }
            else {
                throw new error_util_1.ValidationError("Malformed request body", result.error.errors);
            }
        }
        catch (error) {
            next(error);
        }
    };
};
exports.validate = validate;
