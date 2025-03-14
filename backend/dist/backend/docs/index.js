"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const order_api_doc_1 = __importDefault(require("./order.api-doc"));
const product_api_doc_1 = __importDefault(require("./product.api-doc"));
const stock_api_doc_1 = __importDefault(require("./stock.api-doc"));
const swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "POSify API Docs",
        version: "1.0.0",
        description: "API documentation for POSify",
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}/api`,
            description: "Development server",
        },
    ],
    components: {
        schemas: Object.assign(Object.assign(Object.assign({}, product_api_doc_1.default.schemas), stock_api_doc_1.default.schemas), order_api_doc_1.default.schemas),
    },
    paths: Object.assign(Object.assign(Object.assign({}, product_api_doc_1.default.paths), stock_api_doc_1.default.paths), order_api_doc_1.default.paths),
};
exports.swaggerSpec = swaggerSpec;
