import express from "express";
import { productRouter } from "./products/products.routes";
import { stockRouter } from "./stocks/stocks.routes";
import { saleRouter } from "./orders/orders.routes";

const appRouter = express.Router();

appRouter.use("/products", productRouter);
appRouter.use("/stocks", stockRouter);
appRouter.use("/sales", saleRouter);

export { appRouter };
