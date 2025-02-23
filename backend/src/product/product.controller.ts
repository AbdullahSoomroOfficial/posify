import { Request, Response, NextFunction } from "express-serve-static-core";
import { createResponse } from "src/utils/response.util";
import { productService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-prodcut.dto";
import { NotFoundError } from "src/utils/error.util";

export const productController = {
  createProduct: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = request.body as CreateProductDto;
      const newProduct = await productService.createProduct(data);
      response
        .status(201)
        .json(
          createResponse(
            true,
            newProduct,
            "Product created successfully",
            null,
            null,
            null
          )
        );
    } catch (error) {
      next(error);
    }
  },

  getProducts: async (_: Request, response: Response, next: NextFunction) => {
    try {
      const products = await productService.getProducts();
      response
        .status(200)
        .json(createResponse(true, products, null, null, null, null));
    } catch (error) {
      next(error);
    }
  },

  getProductById: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const product = await productService.getProductById(id);
      if (product) {
        response
          .status(200)
          .json(createResponse(true, product, null, null, null, null));
      } else {
        throw new NotFoundError("Product not found");
      }
    } catch (error) {
      next(error);
    }
  },

  updateProductById: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const data = request.body as UpdateProductDto;
      const updatedProduct = await productService.updateProductById(id, data);
      if (updatedProduct) {
        response
          .status(200)
          .json(createResponse(true, updatedProduct, null, null, null, null));
      } else {
        throw new NotFoundError("Product not found");
      }
    } catch (error) {
      next(error);
    }
  },

  deleteProductById: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const deletedProduct = await productService.deleteProductById(id);
      if (deletedProduct) {
        response
          .status(200)
          .json(createResponse(true, deletedProduct, null, null, null, null));
      } else {
        throw new NotFoundError("Product not found");
      }
    } catch (error) {
      next(error);
    }
  },
};
