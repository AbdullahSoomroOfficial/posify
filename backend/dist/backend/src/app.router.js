"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_router_1 = require("./product/product.router");
const stock_router_1 = require("./stock/stock.router");
const order_router_1 = require("./order/order.router");
const analytics_router_1 = require("./analytics/analytics.router");
const appRouter = express_1.default.Router();
exports.appRouter = appRouter;
appRouter.use("/products", product_router_1.productRouter);
appRouter.use("/stocks", stock_router_1.stockRouter);
appRouter.use("/orders", order_router_1.orderRouter);
appRouter.use("/analytics", analytics_router_1.analyticsRouter);
