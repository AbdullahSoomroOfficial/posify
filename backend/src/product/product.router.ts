import express from "express";
import { productController } from "./product.controller";
import { validate } from "../utils/validate.util";
import { createProductDto } from "./dto/create-product.dto";
import { updateProductDto } from "./dto/update-prodcut.dto";

const productRouter = express.Router();

// POST - /api/products
productRouter.post(
  "/",
  validate(createProductDto),
  productController.createProduct
);

// GET - /api/products
productRouter.get("/", productController.getProducts);

// GET - /api/products/:id
productRouter.get("/:id", productController.getProductById);

// PUT - /api/products/:id
productRouter.put(
  "/:id",
  validate(updateProductDto),
  productController.updateProductById
);

// DELETE - /api/products/:id
productRouter.delete("/:id", productController.deleteProductById);

export { productRouter };
