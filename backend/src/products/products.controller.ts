import { Request, Response } from "express-serve-static-core";
import { createResponse } from "src/utils/response.util";
import { productService } from "./products.service";

export const productController = {
  createProduct: async (request: Request, response: Response) => {
    const data = request.body as CreateProductDto;
    const newProduct = await productService.createProduct({
      ...data,
      status: "active",
    } as IProduct);
    response
      .status(201)
      .json(
        createResponse(true, newProduct, "Product created", null, null, null)
      );
  },

  getProducts: async (request: Request, response: Response) => {
    const products = await productService.getProducts();
    response
      .status(200)
      .json(createResponse(true, products, null, null, null, null));
  },

  getProductById: async (request: Request, response: Response) => {
    const { id } = request.params;
    const product = await productService.getProductById(new Types.ObjectId(id));
    if (product) {
      response.status(200).json(createResponse(product));
    } else {
      response.status(404).json(createResponse(null, "Product not found"));
    }
  },

  updateProductById: async (request: Request, response: Response) => {
    const { id } = request.params;
    const data = request.body as UpdateProductDto;
    const updatedProduct = await productService.updateProductById(
      new Types.ObjectId(id),
      data
    );
    if (updatedProduct) {
      response.status(200).json(createResponse(updatedProduct));
    } else {
      response.status(404).json(createResponse(null, "Product not found"));
    }
  },

  deleteProductById: async (request: Request, response: Response) => {
    const { id } = request.params;
    const deletedProduct = await productService.deleteProductById(id);
    console.log("deletedProduct", deletedProduct);
    if (deletedProduct) {
      response.status(200).send(createResponse(deletedProduct));
    } else {
      response.status(404).json(createResponse(null, "Product not found"));
    }
  },
};
