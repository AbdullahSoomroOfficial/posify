"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const response_util_1 = require("../utils/response.util");
const product_service_1 = require("./product.service");
const error_util_1 = require("../utils/error.util");
exports.productController = {
    createProduct: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = request.body;
            const newProduct = yield product_service_1.productService.createProduct(data);
            response
                .status(201)
                .json((0, response_util_1.createResponse)(true, newProduct, "Product created successfully", null, null, null));
        }
        catch (error) {
            next(error);
        }
    }),
    getProducts: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = request.query;
            const products = yield product_service_1.productService.getProducts(query);
            response
                .status(200)
                .json((0, response_util_1.createResponse)(true, products, "Product(s) fetched successfully", null, null, null));
        }
        catch (error) {
            next(error);
        }
    }),
    getProductById: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const product = yield product_service_1.productService.getProductById(id);
            if (!product) {
                throw new error_util_1.NotFoundError("Product not found");
            }
            response
                .status(200)
                .json((0, response_util_1.createResponse)(true, product, "Product fetched successfully", null, null, null));
        }
        catch (error) {
            next(error);
        }
    }),
    updateProductById: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const data = request.body;
            const updatedProduct = yield product_service_1.productService.updateProductById(id, data);
            if (!updatedProduct) {
                throw new error_util_1.NotFoundError("Product not found");
            }
            response
                .status(200)
                .json((0, response_util_1.createResponse)(true, updatedProduct, "Product updated successfully", null, null, null));
        }
        catch (error) {
            next(error);
        }
    }),
    deleteProductById: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const deletedProduct = yield product_service_1.productService.deleteProductById(id);
            if (!deletedProduct) {
                throw new error_util_1.NotFoundError("Product not found");
            }
            response
                .status(200)
                .json((0, response_util_1.createResponse)(true, deletedProduct, "Product deleted successfully", null, null, null));
        }
        catch (error) {
            next(error);
        }
    }),
};
