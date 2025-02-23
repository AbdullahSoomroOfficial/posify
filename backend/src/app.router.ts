import express from "express";
import { productRouter } from "./product/product.router";
import { stockRouter } from "./stock/stock.router";
import { orderRouter } from "./order/order.router";

const appRouter = express.Router();

appRouter.use("/products", productRouter);
appRouter.use("/stocks", stockRouter);
appRouter.use("/orders", orderRouter);

export { appRouter };
