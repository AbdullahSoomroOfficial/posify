import express from "express";
import { stockController } from "@controllers";
import { validate } from "@middlewares";
import {
  createStockZodSchema,
  updateStockZodSchema,
} from "src/schemas/stock.schema";

const stockRouter = express.Router();

// POST - /api/stocks
stockRouter.post(
  "/",
  validate(createStockZodSchema),
  stockController.createStock
);

// GET - /api/stocks
stockRouter.get("/", stockController.getStocks);

// GET - /api/stocks/:id
stockRouter.get("/:id", stockController.getStockById);

// PUT - /api/stocks/:id
stockRouter.put(
  "/:id",
  validate(updateStockZodSchema),
  stockController.updateStockById
);

// DELETE - /api/stocks/:id
stockRouter.delete("/:id", stockController.deleteStockById);

export { stockRouter };
