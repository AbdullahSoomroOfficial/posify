"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const app_router_1 = require("./app.router");
const response_util_1 = require("./utils/response.util");
const error_util_1 = require("./utils/error.util");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_1 = require("../docs");
const mongodb_1 = require("mongodb");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
/* Routes */
app.use("/api", app_router_1.appRouter);
/* Swagger api docs */
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.swaggerSpec));
/* Serve static assets */
app.use(express_1.default.static(path_1.default.join(process.cwd(), "../frontend/dist")));
/* Serve react app */
app.get("*", (_, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "../frontend/dist", "index.html"));
});
/* Custom error handler */
app.use((error, _, response, __) => {
    if (error instanceof mongodb_1.MongoServerError && error.code === 11000) {
        /* Duplicate key error */
        // Extract the first duplicate field and its corresponding value.
        const duplicateField = Object.keys(error.keyValue)[0];
        const duplicateValue = error.keyValue[duplicateField];
        // Determine the resource name based on error details.
        let resource = "Resource";
        const errmsg = error.errmsg || "";
        if (errmsg.includes("posify.products")) {
            resource = "Product";
        }
        // Build a friendly error message.
        const message = `${resource} with ${duplicateField} "${duplicateValue}" already exists`;
        response
            .status(409)
            .json((0, response_util_1.createResponse)(false, null, null, message, "ConflictError", (error === null || error === void 0 ? void 0 : error.cause) || null));
    }
    else if (error instanceof error_util_1.AuthenticationError) {
        /* Clear the cookie if authentication fails */
        response.clearCookie("AUTH_TOKEN");
        response
            .status(error.statusCode)
            .json((0, response_util_1.createResponse)(false, null, null, error.message, error.name, null));
    }
    else if (error instanceof error_util_1.ValidationError) {
        const formattedErrors = error.format();
        response
            .status(error.statusCode)
            .json((0, response_util_1.createResponse)(false, null, null, error.message, error.name, formattedErrors));
    }
    else if (error instanceof error_util_1.ConflictError ||
        error instanceof error_util_1.CustomError ||
        error instanceof error_util_1.NotFoundError ||
        error instanceof error_util_1.BadRequestError) {
        response
            .status(error.statusCode)
            .json((0, response_util_1.createResponse)(false, null, null, error.message, error.name, null));
    }
    else {
        response
            .status(500)
            .json((0, response_util_1.createResponse)(false, null, null, "Internal server error", error.name, null));
    }
});
