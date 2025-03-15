"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const validate_util_1 = require("../utils/validate.util");
const dto_1 = require("../../../shared/dto");
const dto_2 = require("../../../shared/dto");
const orderRouter = express_1.default.Router();
exports.orderRouter = orderRouter;
/* POST - /order */
orderRouter.post("/", (0, validate_util_1.validate)(dto_1.createOrderDto), order_controller_1.orderController.createOrder);
/* GET - /order */
orderRouter.get("/", order_controller_1.orderController.getOrders);
/* GET - /order/{id} */
orderRouter.get("/:id", order_controller_1.orderController.getOrderById);
/* PUT - /order/{id} */
orderRouter.put("/:id", (0, validate_util_1.validate)(dto_2.updateOrderDto), order_controller_1.orderController.updateOrderById);
/* DELETE - /order/{id} */
orderRouter.delete("/:id", order_controller_1.orderController.deleteOrderById);
