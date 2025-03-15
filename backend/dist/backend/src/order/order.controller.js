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
exports.orderController = void 0;
const response_util_1 = require("../utils/response.util");
const order_service_1 = require("./order.service");
const error_util_1 = require("../utils/error.util");
exports.orderController = {
    createOrder: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = request.body;
            const newOrder = yield order_service_1.orderService.createOrder(data);
            response
                .status(201)
                .json((0, response_util_1.createResponse)(true, newOrder, "Order created successfully", null, null, null));
        }
        catch (error) {
            next(error);
        }
    }),
    getOrders: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = request.query;
            const orders = yield order_service_1.orderService.getOrders(query);
            response
                .status(200)
                .json((0, response_util_1.createResponse)(true, orders, null, null, null, null));
        }
        catch (error) {
            next(error);
        }
    }),
    getOrderById: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const stock = yield order_service_1.orderService.getOrderById(id);
            if (stock) {
                response
                    .status(200)
                    .json((0, response_util_1.createResponse)(true, stock, null, null, null, null));
            }
            else {
                throw new error_util_1.NotFoundError("Order not found");
            }
        }
        catch (error) {
            next(error);
        }
    }),
    updateOrderById: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const data = request.body;
            const updatedOrder = yield order_service_1.orderService.updateOrderById(id, data);
            response
                .status(200)
                .json((0, response_util_1.createResponse)(true, updatedOrder, "Order updated successfully", null, null, null));
        }
        catch (error) {
            next(error);
        }
    }),
    deleteOrderById: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const deletedSale = yield order_service_1.orderService.deleteOrderById(id);
            if (deletedSale) {
                response.status(204).send();
            }
            else {
                throw new error_util_1.NotFoundError("Order not found");
            }
        }
        catch (error) {
            next(error);
        }
    }),
};
