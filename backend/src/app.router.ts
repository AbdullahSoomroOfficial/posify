import express from "express";
import { productRouter } from "./product/product.router";
import { stockRouter } from "./stock/stock.router";
import { orderRouter } from "./order/order.router";
import { analyticsRouter } from "./analytics/analytics.router";

const appRouter = express.Router();

appRouter.use("/products", productRouter);
appRouter.use("/stocks", stockRouter);
appRouter.use("/orders", orderRouter);
appRouter.use("/analytics", analyticsRouter);

export { appRouter };
