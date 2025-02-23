import express from "express";
import { productController } from "@controllers";
import { validate } from "./../middlewares/validate.middleware";
import {
  createProductZodSchema,
  updateProductZodSchema,
} from "src/schemas/product.schema";

const productRouter = express.Router();

// POST - /api/products
productRouter.post(
  "/",
  validate(createProductZodSchema),
  productController.createProduct
);

// GET - /api/products
productRouter.get("/", productController.getProducts);

// GET - /api/products/:id
productRouter.get("/:id", productController.getProductById);

// PUT - /api/products/:id
productRouter.put(
  "/:id",
  validate(updateProductZodSchema),
  productController.updateProductById
);

// DELETE - /api/products/:id
productRouter.delete("/:id", productController.deleteProductById);

export { productRouter };
