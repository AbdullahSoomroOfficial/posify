import express from "express";
import { productController } from "./product.controller";
import { validate } from "../utils/validate.util";
import { createProductDto } from "../../../shared/dto";
import { updateProductDto } from "../../../shared/dto";

const productRouter = express.Router();

/* POST - /products */
productRouter.post(
  "/",
  validate(createProductDto),
  productController.createProduct
);

/* GET - /products */
productRouter.get("/", productController.getProducts);

/* GET - /products/{id} */
productRouter.get("/:id", productController.getProductById);

/* PUT - /products/{id} */
productRouter.put(
  "/:id",
  validate(updateProductDto),
  productController.updateProductById
);

/* DELETE - /products/{id} */
productRouter.delete("/:id", productController.deleteProductById);

export { productRouter };
