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
exports.stockController = void 0;
const response_util_1 = require("../utils/response.util");
const stock_service_1 = require("./stock.service");
const product_service_1 = require("../product/product.service");
const error_util_1 = require("../utils/error.util");
exports.stockController = {
    createStock: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = request.body;
            /**
             * Check if the product exists for given product id
             */
            const product = yield product_service_1.productService.getProductById(data.productId);
            if (!product) {
                throw new error_util_1.NotFoundError("Product not found");
            }
            const newStock = yield stock_service_1.stockService.createStock(data);
            response
                .status(201)
                .json((0, response_util_1.createResponse)(true, newStock, "Stock created successfully", null, null, null));
        }
        catch (error) {
            next(error);
        }
    }),
    getStocks: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = request.query;
            const stocks = yield stock_service_1.stockService.getStocks(query);
            response
                .status(200)
                .json((0, response_util_1.createResponse)(true, stocks, "Stocks fetched successfully", null, null, null));
        }
        catch (error) {
            next(error);
        }
    }),
    getStockById: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const stock = yield stock_service_1.stockService.getStockById(id);
            if (stock) {
                response
                    .status(200)
                    .json((0, response_util_1.createResponse)(true, stock, null, null, null, null));
            }
            else {
                throw new error_util_1.NotFoundError("Stock not found");
            }
        }
        catch (error) {
            next(error);
        }
    }),
    updateStockById: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const data = request.body;
            const updatedStock = yield stock_service_1.stockService.updateStockById(id, data);
            if (updatedStock) {
                response
                    .status(200)
                    .json((0, response_util_1.createResponse)(true, updatedStock, "Stock updated successfully", null, null, null));
            }
            else {
                throw new error_util_1.NotFoundError("Stock not found");
            }
        }
        catch (error) {
            next(error);
        }
    }),
    deleteStockById: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const deletedStock = yield stock_service_1.stockService.deleteStockById(id);
            if (deletedStock) {
                response
                    .status(204)
                    .json((0, response_util_1.createResponse)(true, deletedStock, null, null, null, null));
            }
            else {
                throw new error_util_1.NotFoundError("Stock not found");
            }
        }
        catch (error) {
            next(error);
        }
    }),
};
